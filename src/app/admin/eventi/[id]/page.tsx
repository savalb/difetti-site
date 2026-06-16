'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface EventoData {
  id: string;
  slug: string;
  titolo: string;
  sotto_occhiello: string | null;
  data: string;
  ora: string | null;
  luogo: string;
  indirizzo: string | null;
  descrizione: string;
  descrizione_estesa: string | null;
  immagine_copertina: string | null;
  galleria_immagini: string[] | null;
  video_url: string | null;
  promozione_titolo: string | null;
  promozione_desc: string | null;
  promozione_link: string | null;
  stato: 'futuro' | 'passato';
  whatsapp_custom_text: string | null;
}

const emptyEvento: EventoData = {
  id: '',
  slug: '',
  titolo: '',
  sotto_occhiello: '',
  data: '',
  ora: '',
  luogo: '',
  indirizzo: '',
  descrizione: '',
  descrizione_estesa: '',
  immagine_copertina: '',
  galleria_immagini: [],
  video_url: '',
  promozione_titolo: '',
  promozione_desc: '',
  promozione_link: '',
  stato: 'futuro',
  whatsapp_custom_text: '',
};

export default function EventoEditorPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [evento, setEvento] = useState<EventoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [galleriaInput, setGalleriaInput] = useState('');

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

  useEffect(() => {
    const loadEvento = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch('/api/admin/eventi', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }

        const data = await res.json();
        const found = data.eventi?.find((e: any) => e.id === id);

        if (found) {
          setEvento({
            ...emptyEvento,
            ...found,
            galleria_immagini: found.galleria_immagini || [],
          });
          setGalleriaInput((found.galleria_immagini || []).join('\n'));
        } else {
          setToast({ msg: 'Evento non trovato.', type: 'error' });
          setTimeout(() => router.push('/admin/eventi'), 2000);
        }
      } catch (err) {
        console.error(err);
        setToast({ msg: 'Errore nel caricamento.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadEvento();
  }, [id, getToken, router]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const update = (field: keyof EventoData, value: any) => {
    if (!evento) return;
    setEvento({ ...evento, [field]: value });
    setDirty(true);
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token || !evento) return;

    // Parse the gallery array from textarea input (one per line)
    const galleryArray = galleriaInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Genera slug in base al titolo se vuoto o se è quello temporaneo
    let finalSlug = evento.slug;
    if (!finalSlug || finalSlug.startsWith('nuovo-evento-')) {
      finalSlug = evento.titolo
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const payload = {
      ...evento,
      slug: finalSlug,
      galleria_immagini: galleryArray,
    };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/eventi', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setToast({ msg: data.error || 'Errore nel salvataggio.', type: 'error' });
        return;
      }

      setEvento(payload);
      setDirty(false);
      setToast({ msg: 'Evento salvato con successo!', type: 'success' });
    } catch {
      setToast({ msg: 'Errore di connessione.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Sei sicuro di voler eliminare questo evento? Questa operazione è irreversibile.')) {
      return;
    }

    const token = getToken();
    if (!token || !evento) return;

    try {
      const res = await fetch(`/api/admin/eventi?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        setToast({ msg: data.error || 'Errore durante l\'eliminazione.', type: 'error' });
        return;
      }

      setToast({ msg: 'Evento eliminato con successo!', type: 'success' });
      setTimeout(() => router.push('/admin/eventi'), 1500);
    } catch {
      setToast({ msg: 'Errore di connessione.', type: 'error' });
    }
  };

  if (loading || !evento) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner" />
          Caricamento editor…
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <button
            className="admin-btn-ghost"
            onClick={() => router.push('/admin/eventi')}
            style={{ marginRight: '8px' }}
          >
            ← Indietro
          </button>
          <h2>{evento.titolo || 'Nuovo Evento'}</h2>
          <span>Editor Evento</span>
        </div>
        <div className="admin-header-actions" style={{ display: 'flex', gap: '8px' }}>
          <a
            href={`/eventi/${evento.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-ghost"
          >
            👁 Vedi sul Sito
          </a>
          <button
            className="admin-btn-primary"
            onClick={handleSave}
            disabled={saving}
            style={{ background: dirty ? 'var(--amaranto)' : '#757575', color: 'white', border: '1px solid var(--earth)', cursor: 'pointer', boxShadow: '2px 2px 0 var(--earth)' }}
          >
            {saving ? 'Salvataggio...' : dirty ? '💾 Salva Modifiche' : 'Salva'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content admin-editor" style={{ paddingBottom: '100px' }}>
        
        {/* === Sezione Info Base === */}
        <div className="admin-editor-section">
          <h3>Informazioni Base</h3>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Titolo Evento</label>
              <input
                value={evento.titolo}
                onChange={(e) => update('titolo', e.target.value)}
                placeholder="es. Aperitivo in Vigna"
              />
            </div>
            <div className="admin-field">
              <label>Slug (URL unico - es. aperitivo-in-vigna)</label>
              <input
                value={evento.slug}
                onChange={(e) => update('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                placeholder="es. aperitivo-in-vigna"
              />
            </div>
          </div>

          <div className="admin-field-row">
            <div className="admin-field">
              <label>Sotto occhiello / Categoria breve</label>
              <input
                value={evento.sotto_occhiello || ''}
                onChange={(e) => update('sotto_occhiello', e.target.value)}
                placeholder="es. Degustazione & Networking"
              />
            </div>
            <div className="admin-field">
              <label>Stato Evento</label>
              <select
                value={evento.stato}
                onChange={(e) => update('stato', e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid var(--earth)', background: 'var(--cream)' }}
              >
                <option value="futuro">Prossimo Appuntamento (FUTURO)</option>
                <option value="passato">Archivio & Galleria (PASSATO)</option>
              </select>
            </div>
          </div>

          <div className="admin-field-row">
            <div className="admin-field">
              <label>Data dell'Evento (testo libero)</label>
              <input
                value={evento.data}
                onChange={(e) => update('data', e.target.value)}
                placeholder="es. 14 Giugno 2026"
              />
            </div>
            <div className="admin-field">
              <label>Ora dell'Evento (opzionale)</label>
              <input
                value={evento.ora || ''}
                onChange={(e) => update('ora', e.target.value)}
                placeholder="es. 18:30"
              />
            </div>
          </div>

          <div className="admin-field-row">
            <div className="admin-field">
              <label>Luogo dell'Evento</label>
              <input
                value={evento.luogo}
                onChange={(e) => update('luogo', e.target.value)}
                placeholder="es. Montefalcione (AV)"
              />
            </div>
            <div className="admin-field">
              <label>Indirizzo Completo (opzionale)</label>
              <input
                value={evento.indirizzo || ''}
                onChange={(e) => update('indirizzo', e.target.value)}
                placeholder="es. Contrada Macchia, Agriturismo Macchia dei Briganti"
              />
            </div>
          </div>

          <div className="admin-field">
            <label>Breve descrizione (Card / Anteprima)</label>
            <textarea
              value={evento.descrizione}
              onChange={(e) => update('descrizione', e.target.value)}
              rows={3}
              placeholder="Inserisci una breve introduzione dell'evento per le liste..."
            />
          </div>

          <div className="admin-field">
            <label>Descrizione estesa (Corpo della pagina singolo evento - supporta a capo)</label>
            <textarea
              value={evento.descrizione_estesa || ''}
              onChange={(e) => update('descrizione_estesa', e.target.value)}
              rows={8}
              placeholder="Dettaglia cosa succede all'evento, chi parteciperà, i prodotti in assaggio..."
            />
          </div>
        </div>

        {/* === Sezione Media === */}
        <div className="admin-editor-section">
          <h3>Media ed Estetica</h3>
          <div className="admin-field">
            <label>URL Immagine Copertina (principale)</label>
            <input
              value={evento.immagine_copertina || ''}
              onChange={(e) => update('immagine_copertina', e.target.value)}
              placeholder="es. /images/eventi/aperitivo-in-vigna/locandina.png"
            />
          </div>

          <div className="admin-field">
            <label>URL Galleria Immagini (Inserisci un URL per riga)</label>
            <textarea
              value={galleriaInput}
              onChange={(e) => {
                setGalleriaInput(e.target.value);
                setDirty(true);
              }}
              rows={6}
              placeholder="es.&#10;/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.05.jpeg"
            />
          </div>

          <div className="admin-field">
            <label>URL Video dell'Evento (opzionale mp4 caricato o YouTube embed)</label>
            <input
              value={evento.video_url || ''}
              onChange={(e) => update('video_url', e.target.value)}
              placeholder="es. /images/eventi/aperitivo-in-vigna/bozza_video_aperitivo.mp4"
            />
          </div>
        </div>

        {/* === Sezione Marketing & Direct Response === */}
        <div className="admin-editor-section">
          <h3>Marketing & Offerte (HoReCa)</h3>
          <div className="admin-field">
            <label>Titolo Promozione</label>
            <input
              value={evento.promozione_titolo || ''}
              onChange={(e) => update('promozione_titolo', e.target.value)}
              placeholder="es. Offerta Esclusiva Ristoratori"
            />
          </div>
          <div className="admin-field">
            <label>Descrizione Promozione</label>
            <textarea
              value={evento.promozione_desc || ''}
              onChange={(e) => update('promozione_desc', e.target.value)}
              rows={3}
              placeholder="Dettaglia la promo legata all'evento (es. Espositore in legno omaggio per ordini di pasta...)"
            />
          </div>
          <div className="admin-field">
            <label>Link Promozione (opzionale - se diverso da WhatsApp)</label>
            <input
              value={evento.promozione_link || ''}
              onChange={(e) => update('promozione_link', e.target.value)}
              placeholder="es. /vip/espositore-vigna"
            />
          </div>
          <div className="admin-field">
            <label>Testo WhatsApp Personalizzato (CTA)</label>
            <input
              value={evento.whatsapp_custom_text || ''}
              onChange={(e) => update('whatsapp_custom_text', e.target.value)}
              placeholder="es. Vorrei richiedere informazioni per ospitare l'Aperitivo con il Produttore..."
            />
          </div>
        </div>

        {/* === Zona Pericolo === */}
        <div className="admin-editor-section" style={{ borderColor: '#d32f2f', background: 'rgba(211, 47, 47, 0.05)' }}>
          <h3 style={{ color: '#d32f2f' }}>Zona di Pericolo</h3>
          <p style={{ fontSize: '0.85rem', color: '#d32f2f', marginBottom: '1rem' }}>
            Rimuovendo questo evento, verrà cancellato permanentemente dal database di Supabase. Questa operazione non può essere annullata.
          </p>
          <button
            className="admin-btn-ghost"
            onClick={handleDelete}
            style={{ color: '#d32f2f', borderColor: '#d32f2f', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}
          >
            🗑️ Elimina Evento Permanentemente
          </button>
        </div>

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
