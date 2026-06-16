'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

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

// ── Inline styles per upload zone (CSS-in-JS per non sporcare il CSS globale) ──
const uploadZoneStyle = (isDragging: boolean): React.CSSProperties => ({
  border: `2px dashed ${isDragging ? 'var(--amaranto)' : 'var(--earth)'}`,
  borderRadius: '4px',
  padding: '28px 20px',
  textAlign: 'center',
  cursor: 'pointer',
  background: isDragging ? 'rgba(140,0,0,0.04)' : 'var(--cream)',
  transition: 'all 0.2s ease',
  position: 'relative',
});

const uploadProgressStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  background: 'var(--amaranto)',
  transition: 'width 0.3s',
};

// ── Sub-component: Upload Zone ──────────────────────────────────────────────
function UploadZone({
  slug,
  onUploaded,
  multiple = false,
  label,
  token,
}: {
  slug: string;
  onUploaded: (urls: string[]) => void;
  multiple?: boolean;
  label: string;
  token: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return;
    setError(null);
    setUploading(true);
    setUploadTotal(files.length);
    setUploadCount(0);

    const uploaded: string[] = [];

    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slug', slug || 'eventi');

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          uploaded.push(data.url);
        } else {
          setError(data.error || 'Errore caricamento');
        }
      } catch {
        setError('Errore di rete durante il caricamento.');
      }

      setUploadCount((c) => c + 1);
    }

    setUploading(false);
    if (uploaded.length) onUploaded(uploaded);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(Array.from(e.dataTransfer.files));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(e.target.files || []));
    if (inputRef.current) inputRef.current.value = '';
  };

  const progress = uploadTotal > 0 ? (uploadCount / uploadTotal) * 100 : 0;

  return (
    <div
      style={uploadZoneStyle(isDragging)}
      onClick={() => !uploading && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/quicktime"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />

      {uploading ? (
        <div>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--earth)' }}>
            Caricamento {uploadCount}/{uploadTotal}...
          </p>
          {/* Progress bar */}
          <div style={uploadProgressStyle as any} />
          <div style={{ ...uploadProgressStyle, width: `${progress}%` }} />
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📁</div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.95rem', color: 'var(--earth)', fontWeight: 600, marginBottom: '4px' }}>
            {label}
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', color: 'var(--earth-muted)' }}>
            Clicca o trascina qui • JPEG, PNG, WEBP, MP4 • Max 50MB cad.
          </p>
        </div>
      )}

      {error && (
        <p style={{ color: '#d32f2f', fontSize: '0.82rem', marginTop: '8px' }}>{error}</p>
      )}
    </div>
  );
}

// ── Sub-component: Gallery Preview ──────────────────────────────────────────
function GalleryPreview({
  urls,
  onRemove,
  onReorder,
}: {
  urls: string[];
  onRemove: (idx: number) => void;
  onReorder: (from: number, to: number) => void;
}) {
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  if (!urls.length) return null;

  const isVideo = (u: string) => u.endsWith('.mp4') || u.endsWith('.mov');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
      {urls.map((url, idx) => (
        <div
          key={`${url}-${idx}`}
          draggable
          onDragStart={() => setDraggingIdx(idx)}
          onDragOver={(e) => { e.preventDefault(); setOverIdx(idx); }}
          onDragEnd={() => {
            if (draggingIdx !== null && overIdx !== null && draggingIdx !== overIdx) {
              onReorder(draggingIdx, overIdx);
            }
            setDraggingIdx(null);
            setOverIdx(null);
          }}
          style={{
            position: 'relative',
            width: '90px',
            height: '90px',
            border: `2px solid ${overIdx === idx && draggingIdx !== idx ? 'var(--amaranto)' : 'var(--earth)'}`,
            background: '#000',
            cursor: 'grab',
            opacity: draggingIdx === idx ? 0.5 : 1,
            flexShrink: 0,
          }}
          title="Trascina per riordinare"
        >
          {isVideo(url) ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.8rem' }}>
              🎬
            </div>
          ) : (
            <Image
              src={url}
              alt={`Gallery ${idx + 1}`}
              fill
              sizes="90px"
              style={{ objectFit: 'cover' }}
            />
          )}
          {/* Remove button */}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
            title="Rimuovi dalla galleria"
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: '#d32f2f',
              color: 'white',
              border: 'none',
              fontSize: '0.7rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              lineHeight: 1,
              zIndex: 10,
            }}
          >
            ✕
          </button>
          {/* Index badge */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            left: '4px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            fontSize: '0.6rem',
            padding: '1px 4px',
            fontFamily: 'var(--font-ui)',
            pointerEvents: 'none',
          }}>
            {idx + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Editor Page ─────────────────────────────────────────────────────────
export default function EventoEditorPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [evento, setEvento] = useState<EventoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [galleria, setGalleria] = useState<string[]>([]);
  const [token, setToken] = useState('');

  const getToken = useCallback(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) { router.push('/admin/login'); return null; }
    try {
      const decoded = JSON.parse(atob(t));
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
    return t;
  }, [router]);

  useEffect(() => {
    const t = getToken();
    if (t) setToken(t);
  }, [getToken]);

  useEffect(() => {
    const loadEvento = async () => {
      const t = getToken();
      if (!t) return;

      try {
        const res = await fetch('/api/admin/eventi', {
          headers: { Authorization: `Bearer ${t}` },
        });

        if (res.status === 401) { router.push('/admin/login'); return; }

        const data = await res.json();
        const found = data.eventi?.find((e: any) => e.id === id);

        if (found) {
          setEvento({ ...emptyEvento, ...found, galleria_immagini: found.galleria_immagini || [] });
          setGalleria(found.galleria_immagini || []);
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

  // ── Gallery helpers ──
  const addToGallery = (urls: string[]) => {
    setGalleria((prev) => [...prev, ...urls]);
    setDirty(true);
  };

  const removeFromGallery = (idx: number) => {
    setGalleria((prev) => prev.filter((_, i) => i !== idx));
    setDirty(true);
  };

  const reorderGallery = (from: number, to: number) => {
    setGalleria((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
    setDirty(true);
  };

  // ── Cover image upload ──
  const [coverUploading, setCoverUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const uploadCoverFile = async (file: File) => {
    if (!file) return;
    setCoverUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('slug', evento?.slug || 'eventi');
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        update('immagine_copertina', data.url);
        setToast({ msg: 'Immagine di copertina caricata!', type: 'success' });
      } else {
        setToast({ msg: data.error || 'Errore caricamento copertina', type: 'error' });
      }
    } catch {
      setToast({ msg: 'Errore di rete.', type: 'error' });
    } finally {
      setCoverUploading(false);
    }
  };

  const handleSave = async () => {
    const t = getToken();
    if (!t || !evento) return;

    // Genera slug da titolo se mancante
    let finalSlug = evento.slug;
    if (!finalSlug || finalSlug.startsWith('nuovo-evento-')) {
      finalSlug = evento.titolo
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const payload = { ...evento, slug: finalSlug, galleria_immagini: galleria };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/eventi', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
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
    if (!confirm('Sei sicuro di voler eliminare questo evento? Questa operazione è irreversibile.')) return;
    const t = getToken();
    if (!t || !evento) return;

    try {
      const res = await fetch(`/api/admin/eventi?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${t}` },
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
              <label>Data dell&apos;Evento (testo libero)</label>
              <input
                value={evento.data}
                onChange={(e) => update('data', e.target.value)}
                placeholder="es. 14 Giugno 2026"
              />
            </div>
            <div className="admin-field">
              <label>Ora dell&apos;Evento (opzionale)</label>
              <input
                value={evento.ora || ''}
                onChange={(e) => update('ora', e.target.value)}
                placeholder="es. 18:30"
              />
            </div>
          </div>

          <div className="admin-field-row">
            <div className="admin-field">
              <label>Luogo dell&apos;Evento</label>
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
          <h3>📷 Media ed Estetica</h3>

          {/* Cover image */}
          <div className="admin-field">
            <label>Immagine di Copertina (Header dell&apos;evento)</label>

            {/* Preview copertina */}
            {evento.immagine_copertina && (
              <div style={{ position: 'relative', width: '100%', height: '160px', marginBottom: '10px', background: '#000', border: '2px solid var(--earth)', overflow: 'hidden' }}>
                <Image
                  src={evento.immagine_copertina}
                  alt="Copertina"
                  fill
                  sizes="(max-width:768px) 100vw, 600px"
                  style={{ objectFit: 'cover' }}
                />
                <button
                  onClick={() => update('immagine_copertina', '')}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700 }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Upload zona copertina */}
            <div
              style={uploadZoneStyle(false)}
              onClick={() => !coverUploading && coverInputRef.current?.click()}
            >
              <input
                ref={coverInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCoverFile(f); }}
              />
              {coverUploading ? (
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--earth)' }}>⏳ Caricamento in corso…</p>
              ) : (
                <>
                  <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>🖼️</div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9rem', color: 'var(--earth)', fontWeight: 600, marginBottom: '2px' }}>
                    {evento.immagine_copertina ? 'Sostituisci copertina dal computer' : 'Carica copertina dal computer'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--earth-muted)' }}>JPEG, PNG, WEBP • Max 50MB</p>
                </>
              )}
            </div>

            {/* Alternativamente, URL manuale */}
            <div style={{ marginTop: '8px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--earth-muted)', fontFamily: 'var(--font-ui)' }}>
                …oppure incolla un URL diretto:
              </label>
              <input
                value={evento.immagine_copertina || ''}
                onChange={(e) => update('immagine_copertina', e.target.value)}
                placeholder="es. /images/eventi/aperitivo-in-vigna/locandina.png"
                style={{ marginTop: '4px' }}
              />
            </div>
          </div>

          {/* Galleria */}
          <div className="admin-field">
            <label>
              Galleria Foto & Video{' '}
              <span style={{ fontWeight: 400, fontSize: '0.8rem', color: 'var(--earth-muted)' }}>
                ({galleria.length} file • trascina le miniature per riordinare)
              </span>
            </label>

            {/* Preview griglia */}
            <GalleryPreview
              urls={galleria}
              onRemove={removeFromGallery}
              onReorder={reorderGallery}
            />

            {/* Upload zona galleria */}
            {token && (
              <div style={{ marginTop: '12px' }}>
                <UploadZone
                  slug={evento.slug}
                  token={token}
                  multiple
                  label="Carica foto e video dal computer (anche più file insieme)"
                  onUploaded={addToGallery}
                />
              </div>
            )}

            {/* URL manuali */}
            <details style={{ marginTop: '12px' }}>
              <summary style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', color: 'var(--earth-muted)', cursor: 'pointer', userSelect: 'none' }}>
                + Aggiungi URL manuale (avanzato)
              </summary>
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    id="manual-url-input"
                    placeholder="/images/eventi/slug/foto.jpg"
                    style={{ flex: 1 }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const v = (e.target as HTMLInputElement).value.trim();
                        if (v) { addToGallery([v]); (e.target as HTMLInputElement).value = ''; }
                      }
                    }}
                  />
                  <button
                    className="admin-btn-ghost"
                    onClick={() => {
                      const inp = document.getElementById('manual-url-input') as HTMLInputElement;
                      if (inp?.value.trim()) { addToGallery([inp.value.trim()]); inp.value = ''; }
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    + Aggiungi
                  </button>
                </div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--earth-muted)', marginTop: '4px' }}>
                  Premi Invio o clicca + Aggiungi per inserire un URL nella galleria
                </p>
              </div>
            </details>
          </div>

          <div className="admin-field">
            <label>URL Video dell&apos;Evento (opzionale mp4 caricato o YouTube embed)</label>
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
              placeholder="Dettaglia la promo legata all'evento..."
            />
          </div>
          <div className="admin-field">
            <label>Link Promozione (lascia vuoto per nascondere il pulsante)</label>
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
