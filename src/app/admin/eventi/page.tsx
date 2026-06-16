'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EventoRow {
  id: string;
  slug: string;
  titolo: string;
  data: string;
  luogo: string;
  stato: 'futuro' | 'passato';
  descrizione: string;
  immagine_copertina?: string;
}

export default function AdminEventiList() {
  const [eventi, setEventi] = useState<EventoRow[]>([]);
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

  const fetchEventi = useCallback(async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/eventi', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }

      const data = await res.json();
      setEventi(data.eventi || []);
    } catch (err) {
      console.error('Errore caricamento eventi:', err);
      setToast({ msg: 'Errore nel caricamento degli eventi.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [getToken, router]);

  useEffect(() => {
    fetchEventi();
  }, [fetchEventi]);

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

  const handleCreateEvent = async () => {
    const token = getToken();
    if (!token) return;

    const tempId = Math.random().toString(36).substring(2, 10);
    const tempSlug = `nuovo-evento-${tempId}`;
    const newEvent = {
      id: tempId,
      slug: tempSlug,
      titolo: 'Nuovo Evento ' + new Date().toLocaleDateString('it-IT'),
      data: new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long' }),
      luogo: 'Da definire',
      descrizione: 'Descrizione provvisoria dell\'evento.',
      stato: 'futuro'
    };

    try {
      const res = await fetch('/api/admin/eventi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      });

      if (!res.ok) {
        const err = await res.json();
        setToast({ msg: err.error || 'Errore nella creazione dell\'evento.', type: 'error' });
        return;
      }

      setToast({ msg: 'Evento creato con successo!', type: 'success' });
      router.push(`/admin/eventi/${tempId}`);
    } catch (err) {
      console.error(err);
      setToast({ msg: 'Errore nella creazione dell\'evento.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner" />
          Caricamento eventi…
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
          <Link href="/admin/vip" className="admin-nav-link" style={{ color: 'rgba(242,239,234,0.6)', textDecoration: 'none' }}>
            Promozioni VIP
          </Link>
          <Link href="/admin/eventi" className="admin-nav-link active" style={{ color: 'var(--cream)', borderBottom: '2px solid var(--cream)', paddingBottom: '0.25rem', textDecoration: 'none', fontWeight: 600 }}>
            Eventi
          </Link>
        </nav>

        <div className="admin-header-actions">
          <span style={{ fontSize: '0.75rem', color: 'rgba(232,227,220,0.35)' }}>
            {eventi.length} eventi
          </span>
          <button className="admin-btn-ghost" onClick={handleLogout}>
            ⏻ Esci
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="admin-page-title">Gestione Eventi</h1>
            <p className="admin-page-subtitle">
              Crea, modifica e archivia gli eventi di Difetti visibili sul sito.
            </p>
          </div>
          <button className="admin-btn-primary" onClick={handleCreateEvent} style={{ padding: '0.75rem 1.5rem', background: 'var(--amaranto)', color: 'var(--cream)', border: '2px solid var(--earth)', cursor: 'pointer', fontWeight: 600, boxShadow: '3px 3px 0 var(--earth)' }}>
            + Aggiungi Evento
          </button>
        </div>

        <div className="admin-partners-grid">
          {eventi.map((e) => (
            <div
              key={e.id}
              className="admin-partner-card"
              onClick={() => router.push(`/admin/eventi/${e.id}`)}
              style={{ position: 'relative' }}
            >
              <div className="admin-partner-card-header">
                <h3>{e.titolo}</h3>
                <span className={`partner-status-badge`} style={{
                  background: e.stato === 'futuro' ? '#2e7d32' : '#757575',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}>
                  {e.stato.toUpperCase()}
                </span>
              </div>
              <div className="partner-prodotto" style={{ color: 'var(--amaranto)', fontWeight: 600 }}>🗓️ {e.data}</div>
              <div className="partner-prodotto">📍 {e.luogo}</div>
              <div className="partner-desc">{e.descrizione}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(20,14,12,0.5)', marginTop: 'auto', paddingTop: '10px' }}>
                Slug: <code>/{e.slug}</code>
              </div>
            </div>
          ))}
        </div>

        {eventi.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: 'rgba(232,227,220,0.3)',
            fontSize: '0.9rem'
          }}>
            Nessun evento registrato nel database. Clicca su "+ Aggiungi Evento" per iniziare.
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
