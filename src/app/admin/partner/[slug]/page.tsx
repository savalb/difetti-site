'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface PartnerData {
  slug: string;
  nome: string;
  zona: string;
  prodotto: string;
  descrizione: string;
  claim: string;
  storia_paragrafi: string[] | null;
  dettagli: { etichetta: string; valore: string }[] | null;
  immagine_url: string | null;
  sotto_occhiello: string | null;
  main_headline: string | null;
  sub_headline: string | null;
  introduzione_shock: any | null;
  meccanismo_unico: any | null;
  obiezioni: any[] | null;
  prodotti_showcase: any[] | null;
  cta_finale: string | null;
}

const emptyPartner: PartnerData = {
  slug: '',
  nome: '',
  zona: '',
  prodotto: '',
  descrizione: '',
  claim: '',
  storia_paragrafi: [''],
  dettagli: [{ etichetta: '', valore: '' }],
  immagine_url: '',
  sotto_occhiello: '',
  main_headline: '',
  sub_headline: '',
  introduzione_shock: { titolo: '', punti: [''], conclusione: '' },
  meccanismo_unico: { titolo: '', descrizione: '', pilastri: [{ titolo: '', testo: '' }] },
  obiezioni: [{ domanda: '', risposta: '' }],
  prodotti_showcase: [{ nome: '', descrizione: '' }],
  cta_finale: '',
};

export default function PartnerEditorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [partner, setPartner] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

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
    const loadPartner = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch('/api/admin/partners', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }

        const data = await res.json();
        const found = data.partners?.find((p: any) => p.slug === slug);

        if (found) {
          setPartner({
            ...emptyPartner,
            ...found,
            storia_paragrafi: found.storia_paragrafi || [''],
            dettagli: found.dettagli || [{ etichetta: '', valore: '' }],
            introduzione_shock: found.introduzione_shock || emptyPartner.introduzione_shock,
            meccanismo_unico: found.meccanismo_unico || emptyPartner.meccanismo_unico,
            obiezioni: found.obiezioni || [{ domanda: '', risposta: '' }],
            prodotti_showcase: found.prodotti_showcase || [{ nome: '', descrizione: '' }],
          });
        } else {
          setToast({ msg: 'Partner non trovato.', type: 'error' });
          setTimeout(() => router.push('/admin'), 2000);
        }
      } catch (err) {
        console.error(err);
        setToast({ msg: 'Errore nel caricamento.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadPartner();
  }, [slug, getToken, router]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const update = (field: keyof PartnerData, value: any) => {
    if (!partner) return;
    setPartner({ ...partner, [field]: value });
    setDirty(true);
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token || !partner) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/partners', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partner),
      });

      if (!res.ok) {
        const data = await res.json();
        setToast({ msg: data.error || 'Errore nel salvataggio.', type: 'error' });
        return;
      }

      setDirty(false);
      setToast({ msg: 'Partner salvato con successo!', type: 'success' });
    } catch {
      setToast({ msg: 'Errore di connessione.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !partner) {
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
            onClick={() => router.push('/admin')}
            style={{ marginRight: '8px' }}
          >
            ← Indietro
          </button>
          <h2>{partner.nome}</h2>
          <span>Editor Partner</span>
        </div>
        <div className="admin-header-actions">
          <a
            href={`/partner/${partner.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn-ghost"
          >
            👁 Vedi sul Sito
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="admin-content admin-editor" style={{ paddingBottom: '100px' }}>

        {/* === Sezione Info Base === */}
        <div className="admin-editor-section">
          <h3>Informazioni Base</h3>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Nome Partner</label>
              <input
                value={partner.nome}
                onChange={(e) => update('nome', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Slug (URL)</label>
              <input value={partner.slug} disabled style={{ opacity: 0.4 }} />
            </div>
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label>Zona</label>
              <input
                value={partner.zona}
                onChange={(e) => update('zona', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Prodotto</label>
              <input
                value={partner.prodotto}
                onChange={(e) => update('prodotto', e.target.value)}
              />
            </div>
          </div>
          <div className="admin-field">
            <label>Descrizione</label>
            <textarea
              value={partner.descrizione}
              onChange={(e) => update('descrizione', e.target.value)}
              rows={3}
            />
          </div>
          <div className="admin-field">
            <label>Claim</label>
            <input
              value={partner.claim}
              onChange={(e) => update('claim', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>URL Immagine</label>
            <input
              value={partner.immagine_url || ''}
              onChange={(e) => update('immagine_url', e.target.value)}
              placeholder="/images/partner/nome-partner.png"
            />
          </div>
        </div>

        {/* === Sezione Headlines === */}
        <div className="admin-editor-section">
          <h3>Copywriting — Headlines</h3>
          <div className="admin-field">
            <label>Sotto Occhiello</label>
            <input
              value={partner.sotto_occhiello || ''}
              onChange={(e) => update('sotto_occhiello', e.target.value)}
              placeholder="ES: LA VERITÀ SCOMODA SU..."
            />
          </div>
          <div className="admin-field">
            <label>Main Headline</label>
            <textarea
              value={partner.main_headline || ''}
              onChange={(e) => update('main_headline', e.target.value)}
              rows={2}
              placeholder="Il titolo principale della pagina partner"
            />
          </div>
          <div className="admin-field">
            <label>Sub Headline</label>
            <textarea
              value={partner.sub_headline || ''}
              onChange={(e) => update('sub_headline', e.target.value)}
              rows={2}
              placeholder="Il sottotitolo esplicativo"
            />
          </div>
          <div className="admin-field">
            <label>CTA Finale</label>
            <input
              value={partner.cta_finale || ''}
              onChange={(e) => update('cta_finale', e.target.value)}
              placeholder="ES: Richiedi la Campionatura..."
            />
          </div>
        </div>

        {/* === Sezione Storia === */}
        <div className="admin-editor-section">
          <h3>Storia — Paragrafi</h3>
          {(partner.storia_paragrafi || []).map((para, idx) => (
            <div key={idx} className="admin-field">
              <label>Paragrafo {idx + 1}</label>
              <textarea
                value={para}
                onChange={(e) => {
                  const updated = [...(partner.storia_paragrafi || [])];
                  updated[idx] = e.target.value;
                  update('storia_paragrafi', updated);
                }}
                rows={4}
              />
              {(partner.storia_paragrafi || []).length > 1 && (
                <button
                  onClick={() => {
                    const updated = (partner.storia_paragrafi || []).filter((_, i) => i !== idx);
                    update('storia_paragrafi', updated);
                  }}
                  style={{
                    marginTop: '4px',
                    fontSize: '0.75rem',
                    color: '#C05060',
                    cursor: 'pointer',
                  }}
                >
                  × Rimuovi paragrafo
                </button>
              )}
            </div>
          ))}
          <button
            className="admin-btn-ghost"
            onClick={() => {
              update('storia_paragrafi', [...(partner.storia_paragrafi || []), '']);
            }}
            style={{ marginTop: '0.5rem' }}
          >
            + Aggiungi Paragrafo
          </button>
        </div>

        {/* === Sezione Dettagli === */}
        <div className="admin-editor-section">
          <h3>Dettagli Tecnici</h3>
          {(partner.dettagli || []).map((det, idx) => (
            <div key={idx} className="admin-field-row" style={{ marginBottom: '0.75rem' }}>
              <div className="admin-field">
                <label>Etichetta {idx + 1}</label>
                <input
                  value={det.etichetta}
                  onChange={(e) => {
                    const updated = [...(partner.dettagli || [])];
                    updated[idx] = { ...updated[idx], etichetta: e.target.value };
                    update('dettagli', updated);
                  }}
                />
              </div>
              <div className="admin-field" style={{ position: 'relative' }}>
                <label>Valore {idx + 1}</label>
                <input
                  value={det.valore}
                  onChange={(e) => {
                    const updated = [...(partner.dettagli || [])];
                    updated[idx] = { ...updated[idx], valore: e.target.value };
                    update('dettagli', updated);
                  }}
                />
                {(partner.dettagli || []).length > 1 && (
                  <button
                    onClick={() => {
                      const updated = (partner.dettagli || []).filter((_, i) => i !== idx);
                      update('dettagli', updated);
                    }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      fontSize: '0.7rem',
                      color: '#C05060',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            className="admin-btn-ghost"
            onClick={() => {
              update('dettagli', [...(partner.dettagli || []), { etichetta: '', valore: '' }]);
            }}
          >
            + Aggiungi Dettaglio
          </button>
        </div>

        {/* === Sezione Introduzione Shock === */}
        <div className="admin-editor-section">
          <h3>Introduzione Shock</h3>
          <div className="admin-field">
            <label>Titolo Sezione</label>
            <input
              value={partner.introduzione_shock?.titolo || ''}
              onChange={(e) => {
                update('introduzione_shock', {
                  ...partner.introduzione_shock,
                  titolo: e.target.value,
                });
              }}
            />
          </div>
          {(partner.introduzione_shock?.punti || []).map((punto: string, idx: number) => (
            <div key={idx} className="admin-field">
              <label>Punto {idx + 1}</label>
              <textarea
                value={punto}
                rows={2}
                onChange={(e) => {
                  const punti = [...(partner.introduzione_shock?.punti || [])];
                  punti[idx] = e.target.value;
                  update('introduzione_shock', {
                    ...partner.introduzione_shock,
                    punti,
                  });
                }}
              />
            </div>
          ))}
          <button
            className="admin-btn-ghost"
            onClick={() => {
              const punti = [...(partner.introduzione_shock?.punti || []), ''];
              update('introduzione_shock', { ...partner.introduzione_shock, punti });
            }}
            style={{ marginBottom: '1rem' }}
          >
            + Aggiungi Punto
          </button>
          <div className="admin-field">
            <label>Conclusione</label>
            <textarea
              value={partner.introduzione_shock?.conclusione || ''}
              rows={2}
              onChange={(e) => {
                update('introduzione_shock', {
                  ...partner.introduzione_shock,
                  conclusione: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* === Meccanismo Unico === */}
        <div className="admin-editor-section">
          <h3>Meccanismo Unico</h3>
          <div className="admin-field">
            <label>Titolo</label>
            <input
              value={partner.meccanismo_unico?.titolo || ''}
              onChange={(e) => {
                update('meccanismo_unico', {
                  ...partner.meccanismo_unico,
                  titolo: e.target.value,
                });
              }}
            />
          </div>
          <div className="admin-field">
            <label>Descrizione</label>
            <textarea
              value={partner.meccanismo_unico?.descrizione || ''}
              rows={2}
              onChange={(e) => {
                update('meccanismo_unico', {
                  ...partner.meccanismo_unico,
                  descrizione: e.target.value,
                });
              }}
            />
          </div>
          {(partner.meccanismo_unico?.pilastri || []).map((pil: any, idx: number) => (
            <div key={idx} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(163,62,73,0.2)' }}>
              <div className="admin-field">
                <label>Pilastro {idx + 1} — Titolo</label>
                <input
                  value={pil.titolo}
                  onChange={(e) => {
                    const pilastri = [...(partner.meccanismo_unico?.pilastri || [])];
                    pilastri[idx] = { ...pilastri[idx], titolo: e.target.value };
                    update('meccanismo_unico', { ...partner.meccanismo_unico, pilastri });
                  }}
                />
              </div>
              <div className="admin-field">
                <label>Pilastro {idx + 1} — Testo</label>
                <textarea
                  value={pil.testo}
                  rows={3}
                  onChange={(e) => {
                    const pilastri = [...(partner.meccanismo_unico?.pilastri || [])];
                    pilastri[idx] = { ...pilastri[idx], testo: e.target.value };
                    update('meccanismo_unico', { ...partner.meccanismo_unico, pilastri });
                  }}
                />
              </div>
            </div>
          ))}
          <button
            className="admin-btn-ghost"
            onClick={() => {
              const pilastri = [...(partner.meccanismo_unico?.pilastri || []), { titolo: '', testo: '' }];
              update('meccanismo_unico', { ...partner.meccanismo_unico, pilastri });
            }}
          >
            + Aggiungi Pilastro
          </button>
        </div>

        {/* === Obiezioni === */}
        <div className="admin-editor-section">
          <h3>Obiezioni e Risposte</h3>
          {(partner.obiezioni || []).map((ob: any, idx: number) => (
            <div key={idx} style={{ marginBottom: '1.25rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(163,62,73,0.2)' }}>
              <div className="admin-field">
                <label>Domanda {idx + 1}</label>
                <input
                  value={ob.domanda}
                  onChange={(e) => {
                    const updated = [...(partner.obiezioni || [])];
                    updated[idx] = { ...updated[idx], domanda: e.target.value };
                    update('obiezioni', updated);
                  }}
                />
              </div>
              <div className="admin-field">
                <label>Risposta {idx + 1}</label>
                <textarea
                  value={ob.risposta}
                  rows={3}
                  onChange={(e) => {
                    const updated = [...(partner.obiezioni || [])];
                    updated[idx] = { ...updated[idx], risposta: e.target.value };
                    update('obiezioni', updated);
                  }}
                />
              </div>
            </div>
          ))}
          <button
            className="admin-btn-ghost"
            onClick={() => {
              update('obiezioni', [...(partner.obiezioni || []), { domanda: '', risposta: '' }]);
            }}
          >
            + Aggiungi Obiezione
          </button>
        </div>

        {/* === Prodotti Showcase === */}
        <div className="admin-editor-section">
          <h3>Prodotti in Vetrina</h3>
          {(partner.prodotti_showcase || []).map((prod: any, idx: number) => (
            <div key={idx} className="admin-field-row" style={{ marginBottom: '0.75rem' }}>
              <div className="admin-field">
                <label>Nome Prodotto {idx + 1}</label>
                <input
                  value={prod.nome}
                  onChange={(e) => {
                    const updated = [...(partner.prodotti_showcase || [])];
                    updated[idx] = { ...updated[idx], nome: e.target.value };
                    update('prodotti_showcase', updated);
                  }}
                />
              </div>
              <div className="admin-field">
                <label>Descrizione {idx + 1}</label>
                <input
                  value={prod.descrizione}
                  onChange={(e) => {
                    const updated = [...(partner.prodotti_showcase || [])];
                    updated[idx] = { ...updated[idx], descrizione: e.target.value };
                    update('prodotti_showcase', updated);
                  }}
                />
              </div>
            </div>
          ))}
          <button
            className="admin-btn-ghost"
            onClick={() => {
              update('prodotti_showcase', [...(partner.prodotti_showcase || []), { nome: '', descrizione: '' }]);
            }}
          >
            + Aggiungi Prodotto
          </button>
        </div>
      </div>

      {/* Save Bar */}
      <div className="admin-save-bar">
        <span className="save-status">
          {dirty ? '● Modifiche non salvate' : '✓ Tutto salvato'}
        </span>
        <button
          className="admin-btn-cancel"
          onClick={() => router.push('/admin')}
        >
          Annulla
        </button>
        <button
          className="admin-btn-save"
          onClick={handleSave}
          disabled={saving || !dirty}
        >
          {saving ? 'Salvataggio…' : 'Salva Modifiche'}
        </button>
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
