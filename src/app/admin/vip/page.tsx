'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CampaignRow {
  id: string;
  slug: string;
  titolo: string;
  sottotitolo: string;
  prodotto_nome: string;
  prezzo_originale: number;
  prezzo_scontato: number;
  percentuale_sconto: number;
  descrizione_copy: string;
  evento_nome?: string;
  evento_location?: string;
  evento_data?: string;
  immagine_url?: string;
  attiva: boolean;
}

interface CouponRow {
  id: string;
  campagna_id: string;
  nome: string;
  telefono: string;
  codice_coupon: string;
  stato: 'Valido' | 'Riscattato';
  creato_il: string;
  campagne_marketing?: {
    titolo: string;
    prodotto_nome: string;
  };
}

export default function AdminVipDashboard() {
  const [activeTab, setActiveTab] = useState<'campagna' | 'coupons'>('campagna');
  const [campaigns, setCampaigns] = useState<CampaignRow[]>([]);
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  
  // Modifica campagna attiva
  const [editingCampaign, setEditingCampaign] = useState<Partial<CampaignRow> | null>(null);
  
  const router = useRouter();

  // Verifica Token Admin
  const getToken = useCallback(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return null;
    }
    try {
      const decoded = JSON.parse(atob(token));
      if (decoded.exp < Date.now()) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return null;
      }
    } catch {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
      return null;
    }
    return token;
  }, [router]);

  // Caricamento Dati
  const fetchData = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      
      // Carica campagne
      const resCamp = await fetch('/api/admin/campagne', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resCamp.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      const dataCamp = await resCamp.json();
      setCampaigns(dataCamp.campaigns || []);
      
      // Imposta la campagna attiva nel form di editing
      if (dataCamp.campaigns && dataCamp.campaigns.length > 0) {
        // Cerchiamo la campagna vip se esiste, altrimenti la prima
        const vipCamp = dataCamp.campaigns.find((c: CampaignRow) => c.slug === 'vip') || dataCamp.campaigns[0];
        setEditingCampaign({ ...vipCamp });
      }

      // Carica i coupon
      const resCoupons = await fetch(`/api/admin/coupons?q=${encodeURIComponent(searchQuery)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataCoupons = await resCoupons.json();
      setCoupons(dataCoupons.coupons || []);

    } catch (err) {
      console.error('Errore nel recupero dati:', err);
      setToast({ msg: 'Errore nel caricamento dei dati.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [getToken, router, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]); // Riesegui quando cambia la query di ricerca

  // Gestione Notifiche Toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // Salvataggio Campagna
  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token || !editingCampaign) return;

    try {
      const res = await fetch('/api/admin/campagne', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingCampaign)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Salvataggio fallito');
      }

      setToast({ msg: 'Campagna promozionale aggiornata correttamente!', type: 'success' });
      fetchData();
    } catch (err: any) {
      setToast({ msg: `Errore: ${err.message}`, type: 'error' });
    }
  };

  // Aggiornamento Stato Coupon (Riscattato / Valido)
  const handleToggleRedeem = async (id: string, currentStatus: string) => {
    const token = getToken();
    if (!token) return;

    const newStatus = currentStatus === 'Valido' ? 'Riscattato' : 'Valido';

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, stato: newStatus })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Modifica fallita');
      }

      setToast({ msg: `Stato coupon aggiornato a: ${newStatus}!`, type: 'success' });
      
      // Aggiorna lo stato localmente per evitare ricaricamenti lenti
      setCoupons(prev => prev.map(c => c.id === id ? { ...c, stato: newStatus as any } : c));
    } catch (err: any) {
      setToast({ msg: `Errore: ${err.message}`, type: 'error' });
    }
  };

  // Eliminazione fisica di un coupon
  const handleDeleteCoupon = async (id: string, nome: string) => {
    if (!confirm(`Sei sicuro di voler eliminare definitivamente il coupon di "${nome}"?`)) return;
    
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Eliminazione fallita');
      }

      setToast({ msg: 'Coupon eliminato con successo.', type: 'success' });
      
      // Aggiorna la lista locale rimuovendo il record eliminato
      setCoupons(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      setToast({ msg: `Errore: ${err.message}`, type: 'error' });
    }
  };

  // Esportazione Contatti CSV
  const handleExportCSV = () => {
    if (coupons.length === 0) {
      setToast({ msg: 'Nessun dato da esportare.', type: 'info' });
      return;
    }

    const headers = ['Data Creazione', 'Nome Cliente', 'Telefono', 'Codice Coupon', 'Stato', 'Offerta Prodotto'];
    const rows = coupons.map(c => [
      new Date(c.creato_il).toLocaleString('it-IT'),
      c.nome,
      c.telefono,
      c.codice_coupon,
      c.stato,
      c.campagne_marketing?.prodotto_nome || 'Gin Sintony'
    ]);

    // Costruisce la stringa CSV (gestendo virgole e a capo)
    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(';'))
    ].join('\n');

    // Crea un file blob per il download in locale
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_coupon_vip_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading && campaigns.length === 0) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner" />
          Caricamento promozione VIP…
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <h2>Difetti</h2>
          <span>Content Manager</span>
        </div>
        
        <nav className="admin-nav" style={{ display: 'flex', gap: '1.5rem', marginLeft: '3rem', flex: 1 }}>
          <Link href="/admin" className="admin-nav-link" style={{ color: 'rgba(242,239,234,0.6)', textDecoration: 'none' }}>
            Partner
          </Link>
          <Link href="/admin/punti-vendita" className="admin-nav-link" style={{ color: 'rgba(242,239,234,0.6)', textDecoration: 'none' }}>
            Punti Vendita
          </Link>
          <Link href="/admin/vip" className="admin-nav-link active" style={{ color: 'var(--cream)', borderBottom: '2px solid var(--cream)', paddingBottom: '0.25rem', textDecoration: 'none', fontWeight: 600 }}>
            Promozioni VIP
          </Link>
        </nav>

        <div className="admin-header-actions">
          <span style={{ fontSize: '0.75rem', color: 'rgba(232,227,220,0.35)' }}>
            {coupons.length} coupon generati
          </span>
          <button className="admin-btn-ghost" onClick={handleLogout}>
            ⏻ Esci
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className="admin-page-title">Gestione Offerte VIP & Eventi</h1>
            <p className="admin-page-subtitle">
              Configura la promozione attiva dello stand ed esporta i contatti raccolti dal QR code/NFC.
            </p>
          </div>
          
          {/* Pulsanti TAB */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30, 26, 25, 0.4)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(232,227,220,0.1)' }}>
            <button 
              onClick={() => setActiveTab('campagna')}
              className="admin-btn-ghost" 
              style={{ 
                borderRadius: '6px', 
                background: activeTab === 'campagna' ? 'rgba(232,227,220,0.1)' : 'transparent',
                color: activeTab === 'campagna' ? 'var(--cream)' : 'rgba(242,239,234,0.6)',
                fontWeight: activeTab === 'campagna' ? 600 : 400,
                padding: '8px 16px'
              }}
            >
              ⚙️ Configura Offerta
            </button>
            <button 
              onClick={() => setActiveTab('coupons')}
              className="admin-btn-ghost" 
              style={{ 
                borderRadius: '6px', 
                background: activeTab === 'coupons' ? 'rgba(232,227,220,0.1)' : 'transparent',
                color: activeTab === 'coupons' ? 'var(--cream)' : 'rgba(242,239,234,0.6)',
                fontWeight: activeTab === 'coupons' ? 600 : 400,
                padding: '8px 16px'
              }}
            >
              📊 Coupon Richiesti
            </button>
          </div>
        </div>

        {/* TAB 1: MODULO CONFIGURAZIONE CAMPAGNA */}
        {activeTab === 'campagna' && editingCampaign && (
          <div className="admin-partner-card" style={{ maxWidth: '800px', cursor: 'default', background: '#25201f', padding: '2.5rem', borderRadius: '16px', border: '1px solid rgba(232,227,220,0.1)' }}>
            <h2 style={{ color: 'var(--cream)', marginBottom: '1.5rem', fontFamily: 'var(--font-title)' }}>
              Configurazione Pagina Promo (`/vip`)
            </h2>
            
            <form onSubmit={handleSaveCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Titolo Offerta (Headline) *</label>
                  <input
                    type="text"
                    required
                    value={editingCampaign.titolo || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, titolo: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Sottotitolo (Subheadline)</label>
                  <input
                    type="text"
                    value={editingCampaign.sottotitolo || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, sottotitolo: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Prodotto in Offerta *</label>
                  <input
                    type="text"
                    required
                    value={editingCampaign.prodotto_nome || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, prodotto_nome: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Prezzo Originale (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingCampaign.prezzo_originale || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, prezzo_originale: parseFloat(e.target.value) }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Prezzo Scontato (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingCampaign.prezzo_scontato || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, prezzo_scontato: parseFloat(e.target.value) }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Sconto (%) *</label>
                  <input
                    type="number"
                    required
                    value={editingCampaign.percentuale_sconto || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, percentuale_sconto: parseInt(e.target.value) }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Nome Evento</label>
                  <input
                    type="text"
                    value={editingCampaign.evento_nome || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, evento_nome: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Location Evento</label>
                  <input
                    type="text"
                    value={editingCampaign.evento_location || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, evento_location: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Data Evento</label>
                  <input
                    type="text"
                    value={editingCampaign.evento_data || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, evento_data: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>URL Immagine Prodotto</label>
                  <input
                    type="text"
                    value={editingCampaign.immagine_url || ''}
                    onChange={(e) => setEditingCampaign(prev => ({ ...prev, immagine_url: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--cream)', marginTop: '1.25rem' }}>
                    <input
                      type="checkbox"
                      checked={editingCampaign.attiva || false}
                      onChange={(e) => setEditingCampaign(prev => ({ ...prev, attiva: e.target.checked }))}
                      style={{ transform: 'scale(1.3)', accentColor: 'var(--amaranto)' }}
                    />
                    Campagna Attiva (Visibile al QR)
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Descrizione / Copy Persuasivo *</label>
                <textarea
                  rows={6}
                  required
                  value={editingCampaign.descrizione_copy || ''}
                  onChange={(e) => setEditingCampaign(prev => ({ ...prev, descrizione_copy: e.target.value }))}
                  style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff', resize: 'vertical', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: '1.5' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="submit" className="admin-btn-primary" style={{ padding: '12px 30px' }}>
                  Salva Configurazione Offerta
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: TABELLA DEI LEAD E STATO COUPON */}
        {activeTab === 'coupons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Filtri & Ricerca */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Cerca per Nome, Telefono o Codice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'rgba(30, 26, 25, 0.6)',
                  border: '1px solid rgba(232,227,220,0.2)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  color: '#fff',
                  width: '100%',
                  maxWidth: '350px'
                }}
              />
              
              <button onClick={handleExportCSV} className="admin-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--cream)', color: 'var(--black)' }}>
                📥 Esporta Contatti (CSV)
              </button>
            </div>

            {/* Tabella */}
            <div className="admin-table-wrapper" style={{ overflowX: 'auto', background: 'rgba(30, 26, 25, 0.4)', borderRadius: '12px', border: '1px solid rgba(232,227,220,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(232,227,220,0.1)', color: 'rgba(242,239,234,0.6)' }}>
                    <th style={{ padding: '1rem' }}>Data Registrazione</th>
                    <th style={{ padding: '1rem' }}>Cliente</th>
                    <th style={{ padding: '1rem' }}>Telefono</th>
                    <th style={{ padding: '1rem' }}>Codice Coupon</th>
                    <th style={{ padding: '1rem' }}>Offerta / Campagna</th>
                    <th style={{ padding: '1rem' }}>Stato</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Azione Cassa</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(232,227,220,0.05)', color: 'var(--cream)' }}>
                      <td style={{ padding: '1rem', color: 'rgba(242,239,234,0.6)' }}>
                        {new Date(c.creato_il).toLocaleString('it-IT')}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{c.nome}</td>
                      <td style={{ padding: '1rem' }}>
                        <a href={`tel:${c.telefono}`} style={{ color: '#ef9a9a', textDecoration: 'underline' }}>
                          {c.telefono}
                        </a>
                      </td>
                      <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '0.05em' }}>
                        {c.codice_coupon}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {c.campagne_marketing?.prodotto_nome || 'Gin Sintony'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          background: c.stato === 'Valido' ? 'rgba(129, 199, 132, 0.2)' : 'rgba(232,227,220,0.1)',
                          color: c.stato === 'Valido' ? '#81c784' : 'rgba(242,239,234,0.4)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          {c.stato}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button 
                            className="admin-btn-ghost" 
                            style={{ 
                              color: c.stato === 'Valido' ? '#81c784' : '#e57373',
                              fontWeight: 500
                            }}
                            onClick={() => handleToggleRedeem(c.id, c.stato)}
                          >
                            {c.stato === 'Valido' ? '✓ Segna Riscattato' : '↩ Ripristina Valido'}
                          </button>
                          <button 
                            className="admin-btn-ghost" 
                            style={{ 
                              color: '#ef5350',
                              fontWeight: 500
                            }}
                            onClick={() => handleDeleteCoupon(c.id, c.nome)}
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '4rem', color: 'rgba(242,239,234,0.3)' }}>
                        {searchQuery ? 'Nessun coupon corrisponde alla ricerca.' : 'Nessun coupon generato al momento per questa campagna.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
