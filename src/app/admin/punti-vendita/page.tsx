'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PuntoVendita {
  id: string;
  nome: string;
  tipologia: 'ristorante' | 'enoteca' | 'pizzeria' | 'bistrot';
  provincia: 'Avellino' | 'Napoli' | 'Salerno' | 'Benevento';
  indirizzo: string;
  telefono?: string;
  whatsapp?: string;
  prodotti: string[];
  dettaglio: string;
  logo_url?: string;
  ordine?: number;
}

const TIPOLOGIE = ['ristorante', 'enoteca', 'pizzeria', 'bistrot'];
const PROVINCE = ['Avellino', 'Napoli', 'Salerno', 'Benevento'];
const PRODOTTI_OPTION = [
  'Pasta Artigianale',
  'Conserve di Pomodoro',
  'Crostate Artigianali',
  'Alici Nettuno',
  'Nocciole Noccioro',
  'Olio Extravergine',
  'Vini Irpini'
];

export default function AdminPuntiVendita() {
  const [punti, setPunti] = useState<PuntoVendita[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  
  // Drawer / Form state
  const [editingPunto, setEditingPunto] = useState<Partial<PuntoVendita> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [selectedProdotti, setSelectedProdotti] = useState<string[]>([]);
  
  const router = useRouter();

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

  const fetchPunti = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/punti-vendita', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setPunti(data.puntiVendita || []);
      if (data.fallback) {
        setToast({ msg: 'Database Supabase non inizializzato. Stai vedendo i dati locali di fallback.', type: 'info' });
      }
    } catch (err) {
      console.error('Errore caricamento punti vendita:', err);
      setToast({ msg: 'Errore nel caricamento dei punti vendita.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [getToken, router]);

  useEffect(() => {
    fetchPunti();
  }, [fetchPunti]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const handleEdit = (p: PuntoVendita) => {
    setEditingPunto({ ...p });
    setSelectedProdotti(p.prodotti || []);
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingPunto({
      id: Math.random().toString(36).substring(2, 10),
      nome: '',
      tipologia: 'ristorante',
      provincia: 'Avellino',
      indirizzo: '',
      telefono: '',
      whatsapp: '',
      prodotti: [],
      dettaglio: '',
      logo_url: '',
      ordine: punti.length + 1
    });
    setSelectedProdotti([]);
    setIsNew(true);
  };

  const handleProductToggle = (prod: string) => {
    setSelectedProdotti(prev =>
      prev.includes(prod) ? prev.filter(p => p !== prod) : [...prev, prod]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token || !editingPunto) return;

    const finalPunto = {
      ...editingPunto,
      prodotti: selectedProdotti
    };

    try {
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/punti-vendita', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(finalPunto)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Salvataggio fallito');
      }

      setToast({ msg: `Punto vendita ${isNew ? 'creato' : 'aggiornato'} correttamente!`, type: 'success' });
      setEditingPunto(null);
      fetchPunti();
    } catch (err: any) {
      setToast({ msg: `Errore: ${err.message}`, type: 'error' });
    }
  };

  const handleDelete = async (id: string, nome: string) => {
    if (!confirm(`Sei sicuro di voler eliminare "${nome}"?`)) return;

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/punti-vendita?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Eliminazione fallita');
      }

      setToast({ msg: 'Punto vendita eliminato con successo.', type: 'success' });
      fetchPunti();
    } catch (err: any) {
      setToast({ msg: `Errore: ${err.message}`, type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner" />
          Caricamento punti vendita…
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
          <Link href="/admin/punti-vendita" className="admin-nav-link active" style={{ color: 'var(--cream)', borderBottom: '2px solid var(--cream)', paddingBottom: '0.25rem', textDecoration: 'none', fontWeight: 600 }}>
            Punti Vendita
          </Link>
        </nav>

        <div className="admin-header-actions">
          <span style={{ fontSize: '0.75rem', color: 'rgba(232,227,220,0.35)' }}>
            {punti.length} punti vendita
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
            <h1 className="admin-page-title">Gestione Punti Vendita</h1>
            <p className="admin-page-subtitle">
              Gestisci l'elenco dei locali commerciali che offrono i prodotti selezionati da Difetti.
            </p>
          </div>
          <button className="admin-btn-primary" onClick={handleCreateNew}>
            + Aggiungi Locale
          </button>
        </div>

        {/* List of Punti Vendita */}
        <div className="admin-table-wrapper" style={{ overflowX: 'auto', background: 'rgba(30, 26, 25, 0.4)', borderRadius: '12px', border: '1px solid rgba(232,227,220,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(232,227,220,0.1)', color: 'rgba(242,239,234,0.6)' }}>
                <th style={{ padding: '1rem' }}>Nome Locale</th>
                <th style={{ padding: '1rem' }}>Tipologia</th>
                <th style={{ padding: '1rem' }}>Provincia</th>
                <th style={{ padding: '1rem' }}>Indirizzo</th>
                <th style={{ padding: '1rem' }}>Telefono</th>
                <th style={{ padding: '1rem' }}>Prodotti Venduti</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {punti.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(232,227,220,0.05)', color: 'var(--cream)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{p.nome}</td>
                  <td style={{ padding: '1rem' }}><span className="partner-zona" style={{ textTransform: 'capitalize' }}>{p.tipologia}</span></td>
                  <td style={{ padding: '1rem' }}>{p.provincia}</td>
                  <td style={{ padding: '1rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.indirizzo}</td>
                  <td style={{ padding: '1rem' }}>{p.telefono || '-'}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {p.prodotti?.map(pr => (
                        <span key={pr} style={{ fontSize: '0.7rem', background: 'rgba(163, 62, 73, 0.2)', color: '#ef9a9a', padding: '2px 6px', borderRadius: '4px' }}>
                          {pr}
                        </span>
                      )) || '-'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button className="admin-btn-ghost" style={{ marginRight: '8px', color: '#81c784' }} onClick={() => handleEdit(p)}>
                      Modifica
                    </button>
                    <button className="admin-btn-ghost" style={{ color: '#e57373' }} onClick={() => handleDelete(p.id, p.nome)}>
                      Elimina
                    </button>
                  </td>
                </tr>
              ))}
              {punti.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '4rem', color: 'rgba(242,239,234,0.3)' }}>
                    Nessun locale inserito. Clicca su "+ Aggiungi Locale" per iniziare.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Drawer / Edit Modal */}
        {editingPunto && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="admin-partner-card" style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#25201f',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(232,227,220,0.15)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              cursor: 'default'
            }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ color: 'var(--cream)', marginBottom: '1.5rem', fontFamily: 'var(--font-title)' }}>
                {isNew ? 'Nuovo Punto Vendita' : `Modifica: ${editingPunto.nome}`}
              </h2>
              
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Nome Locale *</label>
                    <input
                      type="text"
                      required
                      value={editingPunto.nome || ''}
                      onChange={(e) => setEditingPunto(prev => ({ ...prev, nome: e.target.value }))}
                      style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Tipologia *</label>
                      <select
                        value={editingPunto.tipologia || 'ristorante'}
                        onChange={(e) => setEditingPunto(prev => ({ ...prev, tipologia: e.target.value as any }))}
                        style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff', textTransform: 'capitalize' }}
                      >
                        {TIPOLOGIE.map(t => (
                          <option key={t} value={t} style={{ background: '#25201f' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Provincia *</label>
                      <select
                        value={editingPunto.provincia || 'Avellino'}
                        onChange={(e) => setEditingPunto(prev => ({ ...prev, provincia: e.target.value as any }))}
                        style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                      >
                        {PROVINCE.map(p => (
                          <option key={p} value={p} style={{ background: '#25201f' }}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Indirizzo Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Es: Via Colombo 68, Avellino (AV)"
                    value={editingPunto.indirizzo || ''}
                    onChange={(e) => setEditingPunto(prev => ({ ...prev, indirizzo: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Telefono</label>
                    <input
                      type="text"
                      value={editingPunto.telefono || ''}
                      onChange={(e) => setEditingPunto(prev => ({ ...prev, telefono: e.target.value }))}
                      style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>WhatsApp Link</label>
                    <input
                      type="text"
                      placeholder="Es: https://wa.me/39..."
                      value={editingPunto.whatsapp || ''}
                      onChange={(e) => setEditingPunto(prev => ({ ...prev, whatsapp: e.target.value }))}
                      style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Logo URL</label>
                    <input
                      type="text"
                      placeholder="Pasti URL immagine o lascia vuoto per logo generato"
                      value={editingPunto.logo_url || ''}
                      onChange={(e) => setEditingPunto(prev => ({ ...prev, logo_url: e.target.value }))}
                      style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Ordine di visualizzazione</label>
                    <input
                      type="number"
                      value={editingPunto.ordine || 0}
                      onChange={(e) => setEditingPunto(prev => ({ ...prev, ordine: parseInt(e.target.value) || 0 }))}
                      style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Dettaglio / Descrizione locale</label>
                  <textarea
                    rows={2}
                    placeholder="Es: Pizzeria d'autore che ha scelto esclusivamente il pomodoro Difetti..."
                    value={editingPunto.dettaglio || ''}
                    onChange={(e) => setEditingPunto(prev => ({ ...prev, dettaglio: e.target.value }))}
                    style={{ background: 'rgba(30, 26, 25, 0.6)', border: '1px solid rgba(232,227,220,0.2)', padding: '0.75rem', borderRadius: '8px', color: '#fff', resize: 'vertical' }}
                  />
                </div>

                {/* Products Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: 'rgba(242,239,234,0.6)' }}>Prodotti Offerti</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', background: 'rgba(30, 26, 25, 0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(232,227,220,0.1)' }}>
                    {PRODOTTI_OPTION.map(prod => (
                      <label key={prod} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#fff', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedProdotti.includes(prod)}
                          onChange={() => handleProductToggle(prod)}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        {prod}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="admin-btn-ghost" onClick={() => setEditingPunto(null)}>
                    Annulla
                  </button>
                  <button type="submit" className="admin-btn-primary">
                    Salva Modifiche
                  </button>
                </div>
              </form>
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
