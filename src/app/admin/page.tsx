'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

interface PartnerRow {
  slug: string;
  nome: string;
  zona: string;
  prodotto: string;
  descrizione: string;
  claim: string;
  sotto_occhiello?: string;
  main_headline?: string;
  sub_headline?: string;
}

export default function AdminDashboard() {
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
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

  const fetchPartners = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/partners', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setPartners(data.partners || []);
    } catch (err) {
      console.error('Errore caricamento partner:', err);
      setToast({ msg: 'Errore nel caricamento dei partner.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [getToken, router]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

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

  const isComplete = (p: PartnerRow) => {
    return !!(p.sotto_occhiello && p.main_headline && p.sub_headline);
  };

  if (loading) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner" />
          Caricamento partner…
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
          <Link href="/admin" className="admin-nav-link active" style={{ color: 'var(--cream)', borderBottom: '2px solid var(--cream)', paddingBottom: '0.25rem', textDecoration: 'none', fontWeight: 600 }}>
            Partner
          </Link>
          <Link href="/admin/punti-vendita" className="admin-nav-link" style={{ color: 'rgba(242,239,234,0.6)', textDecoration: 'none' }}>
            Punti Vendita
          </Link>
          <Link href="/admin/vip" className="admin-nav-link" style={{ color: 'rgba(242,239,234,0.6)', textDecoration: 'none' }}>
            Promozioni VIP
          </Link>
        </nav>

        <div className="admin-header-actions">
          <span style={{ fontSize: '0.75rem', color: 'rgba(232,227,220,0.35)' }}>
            {partners.length} partner
          </span>
          <button className="admin-btn-ghost" onClick={handleLogout}>
            ⏻ Esci
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content">
        <h1 className="admin-page-title">Gestione Partner</h1>
        <p className="admin-page-subtitle">
          Modifica i contenuti dei partner visibili sul sito web Difetti.
        </p>

        <div className="admin-partners-grid">
          {partners.map((p) => (
            <div
              key={p.slug}
              className="admin-partner-card"
              onClick={() => router.push(`/admin/partner/${p.slug}`)}
            >
              <div className="admin-partner-card-header">
                <h3>{p.nome}</h3>
                <span className="partner-zona">{p.zona}</span>
              </div>
              <div className="partner-prodotto">{p.prodotto}</div>
              <div className="partner-desc">{p.descrizione}</div>
              <div className="partner-status">
                <span className={`dot ${isComplete(p) ? '' : 'incomplete'}`} />
                {isComplete(p) ? 'Copywriting completo' : 'Copywriting da completare'}
              </div>
            </div>
          ))}
        </div>

        {partners.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: 'rgba(232,227,220,0.3)',
            fontSize: '0.9rem'
          }}>
            Nessun partner trovato nel database. Verifica la connessione a Supabase.
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
