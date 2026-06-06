'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface Campaign {
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
}

interface Coupon {
  id: string;
  codice_coupon: string;
  nome: string;
  telefono: string;
  stato: string;
  creato_il: string;
}

export default function VipPromoPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [claimedCoupon, setClaimedCoupon] = useState<Coupon | null>(null);

  // Caricamento campagna e controllo coupon in cache locale all'avvio
  useEffect(() => {
    async function init() {
      try {
        // 1. Controlliamo se c'è già un coupon salvato in localStorage
        const cached = localStorage.getItem('difetti_vip_coupon');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            setClaimedCoupon(parsed); // Mostra subito il coupon locale per velocità

            // Controlla lo stato più recente dal database Supabase in background
            if (supabase) {
              const { data, error } = await supabase
                .from('coupon_richiesti')
                .select('*')
                .eq('codice_coupon', parsed.codice_coupon)
                .maybeSingle();

              if (!error && data) {
                setClaimedCoupon(data);
                localStorage.setItem('difetti_vip_coupon', JSON.stringify(data));
              } else if (!error && !data) {
                // Se è stato eliminato dal database (cancellato dall'admin), puliamo localmente
                localStorage.removeItem('difetti_vip_coupon');
                setClaimedCoupon(null);
              }
            }
          } catch (e) {
            localStorage.removeItem('difetti_vip_coupon');
          }
        }

        // 2. Recuperiamo la campagna attiva
        const res = await fetch('/api/promo');
        if (res.ok) {
          const data = await res.json();
          setCampaign(data.campaign);
        }
      } catch (err) {
        console.error('Errore inizializzazione pagina VIP:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Invio modulo per ottenere il coupon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !campaign) return;

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          campaignId: campaign.id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Errore durante l\'elaborazione.');
      }

      if (data.success && data.coupon) {
        setClaimedCoupon(data.coupon);
        // Salviamo in cache locale per consentire l'accesso offline
        localStorage.setItem('difetti_vip_coupon', JSON.stringify(data.coupon));
        // Scorri in alto all'inizio del ticket
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Si è verificato un errore, riprova.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    if (!claimedCoupon || !campaign) return;
    const text = `Ciao! Ho appena ottenuto il coupon VIP di Difetti per l'evento "${campaign.evento_nome}" alla cantina ${campaign.evento_location}! Codice: ${claimedCoupon.codice_coupon} per avere il ${campaign.prodotto_nome} con il ${campaign.percentuale_sconto}% di sconto!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  // Stato Caricamento
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--black)',
        color: 'var(--cream)',
        fontFamily: 'var(--font-ui)',
        padding: '2rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(242,239,234,0.1)',
          borderTopColor: 'var(--amaranto)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }} />
        <p style={{ color: 'var(--cream-dark)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Accesso VIP in corso…
        </p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // Stato Nessuna Campagna Attiva
  if (!campaign && !claimedCoupon) {
    return (
      <div className="grain" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--black)',
        color: 'var(--cream)',
        fontFamily: 'var(--font-body)',
        textAlign: 'center',
        padding: '3rem 1.5rem'
      }}>
        <div style={{ maxWidth: '480px', background: 'rgba(30, 21, 19, 0.6)', border: '1px solid rgba(242,239,234,0.1)', padding: '3rem 2rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--cream)' }}>
            Accesso Riservato
          </h2>
          <span className="accent-line" style={{ margin: '0 auto 1.5rem auto' }} />
          <p style={{ fontSize: '1.1rem', color: 'var(--cream-dark)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Al momento non ci sono promozioni VIP attive. Le nostre offerte esclusive dedicate agli eventi riprenderanno a breve!
          </p>
          <Link href="/difetti" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.8rem' }}>
            Esplora il Catalogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grain" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #140E0C 0%, #221411 100%)',
      color: 'var(--cream)',
      fontFamily: 'var(--font-body)',
      padding: '2rem 1rem'
    }}>
      {/* Header Brand */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-title)',
          fontSize: '1.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--cream)',
          margin: 0
        }}>
          Difetti
        </h1>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--amaranto)',
          marginTop: '0.25rem'
        }}>
          Eccellenze Campane
        </p>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '480px', margin: '0 auto' }}>
        
        {/* Se abbiamo già un coupon salvato localmente o appena registrato, mostriamo solo il ticket */}
        {claimedCoupon ? (
          <div style={{
            background: 'rgba(30, 21, 19, 0.85)',
            border: '1px dashed var(--amaranto)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.6s ease-out'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#81c784',
                background: 'rgba(129, 199, 132, 0.1)',
                padding: '4px 12px',
                borderRadius: '20px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#81c784', display: 'inline-block' }} />
                Coupon Attivo & Valido
              </span>
              
              <h2 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.9rem',
                color: 'var(--cream)',
                marginTop: '1rem',
                marginBottom: '0.5rem'
              }}>
                Grazie {claimedCoupon.nome}!
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--cream-dark)' }}>
                Ecco il tuo pass di sconto personale
              </p>
            </div>

            {/* Dettaglio del Coupon / Ticket */}
            <div style={{
              background: 'rgba(20, 14, 12, 0.9)',
              border: '2px dashed rgba(242,239,234,0.15)',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', color: 'var(--cream-dark)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Codice Coupon VIP
              </span>
              
              <div style={{
                fontFamily: 'monospace',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: 'var(--cream)',
                letterSpacing: '0.1em',
                margin: '0.5rem 0 1rem 0',
                background: 'rgba(163, 62, 73, 0.15)',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(163, 62, 73, 0.3)'
              }}>
                {claimedCoupon.codice_coupon}
              </div>

              <div style={{ borderTop: '1px solid rgba(242,239,234,0.08)', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', textAlign: 'left' }}>
                <div>
                  <span style={{ color: 'rgba(242,239,234,0.5)', display: 'block', fontSize: '0.7rem' }}>PRODOTTO</span>
                  <strong style={{ color: 'var(--cream)' }}>{campaign?.prodotto_nome || 'Gin Sintony'}</strong>
                </div>
                <div>
                  <span style={{ color: 'rgba(242,239,234,0.5)', display: 'block', fontSize: '0.7rem' }}>SCONTO</span>
                  <strong style={{ color: 'var(--amaranto-light)' }}>-{campaign?.percentuale_sconto || 20}% (€48 anziché €60)</strong>
                </div>
              </div>

              {campaign && (
                <div style={{ borderTop: '1px solid rgba(242,239,234,0.08)', marginTop: '0.75rem', paddingTop: '0.75rem', fontSize: '0.8rem', textAlign: 'left' }}>
                  <span style={{ color: 'rgba(242,239,234,0.5)', display: 'block', fontSize: '0.7rem' }}>EVENTO</span>
                  <span style={{ color: 'var(--cream)' }}>{campaign.evento_nome} — {campaign.evento_location}</span>
                </div>
              )}
            </div>

            <p style={{
              fontSize: '0.85rem',
              color: 'var(--cream-dark)',
              textAlign: 'center',
              lineHeight: '1.5',
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              Mostra questa schermata (o uno screenshot) alla cassa dello stand Difetti per ricevere lo sconto immediato.
            </p>

            {/* Azioni del Coupon */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={handleShare} className="btn" style={{
                background: '#25D366',
                color: '#fff',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.8rem',
                borderRadius: '8px'
              }}>
                Condividi su WhatsApp
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button onClick={handlePrint} className="btn btn-outline-light" style={{
                  justifyContent: 'center',
                  padding: '10px',
                  fontSize: '0.75rem',
                  borderRadius: '8px'
                }}>
                  Stampa / PDF
                </button>
                <button onClick={() => {
                  if (confirm('Vuoi richiedere un altro coupon? Questo sovrascriverà quello attuale sul tuo telefono.')) {
                    localStorage.removeItem('difetti_vip_coupon');
                    setClaimedCoupon(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }} className="btn btn-outline" style={{
                  justifyContent: 'center',
                  padding: '10px',
                  fontSize: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(163, 62, 73, 0.4)'
                }}>
                  Nuovo Coupon
                </button>
              </div>
            </div>

            <p style={{
              fontSize: '0.7rem',
              color: 'rgba(242,239,234,0.4)',
              textAlign: 'center',
              marginTop: '1.5rem'
            }}>
              Nota: Il coupon è salvato in memoria in questo telefono. Sarà visibile anche in assenza di segnale internet alla cantina.
            </p>
          </div>
        ) : (
          /* Form di registrazione e dettagli dell'offerta */
          campaign && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Card Offerta */}
              <div style={{
                background: 'rgba(30, 21, 19, 0.6)',
                border: '1px solid rgba(242,239,234,0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                animation: 'fadeIn 0.6s ease-out'
              }}>
                
                {/* Event Label */}
                {campaign.evento_nome && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      color: 'var(--amaranto-light)',
                      border: '1px solid rgba(163, 62, 73, 0.4)',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}>
                      Event Ticket
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(242,239,234,0.5)', fontFamily: 'var(--font-ui)' }}>
                      {campaign.evento_data}
                    </span>
                  </div>
                )}

                {/* Immagine Espositore / Prodotto */}
                {campaign.immagine_url && (
                  <div style={{
                    width: '100%',
                    height: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(20, 14, 12, 0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid rgba(242,239,234,0.05)',
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}>
                    <img 
                      src={campaign.immagine_url} 
                      alt={campaign.prodotto_nome} 
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))'
                      }}
                    />
                  </div>
                )}

                {/* Titoli dell'offerta */}
                <div>
                  <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.75rem', color: 'var(--cream)', lineHeight: '1.2' }}>
                    {campaign.titolo}
                  </h2>
                  {campaign.sottotitolo && (
                    <p style={{ fontSize: '0.9rem', color: 'rgba(242,239,234,0.6)', marginTop: '0.25rem' }}>
                      {campaign.sottotitolo}
                    </p>
                  )}
                  <span className="accent-line" style={{ marginTop: '0.75rem', marginBottom: 0 }} />
                </div>

                {/* Prezzo & Sconto */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  background: 'rgba(20, 14, 12, 0.4)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(242,239,234,0.05)'
                }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(242,239,234,0.5)', fontFamily: 'var(--font-ui)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Special price
                    </span>
                    <span style={{ fontSize: '2.2rem', fontFamily: 'var(--font-title)', fontWeight: 'bold', color: 'var(--cream)', lineHeight: 1 }}>
                      €{campaign.prezzo_scontato.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  <div style={{ borderLeft: '1px solid rgba(242,239,234,0.1)', paddingLeft: '1.5rem' }}>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(242,239,234,0.5)', fontFamily: 'var(--font-ui)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Prezzo Standard
                    </span>
                    <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-title)', textDecoration: 'line-through', color: 'var(--earth-light)', lineHeight: 1 }}>
                      €{campaign.prezzo_originale.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div style={{
                    marginLeft: 'auto',
                    background: 'var(--amaranto)',
                    color: 'var(--cream)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '6px'
                  }}>
                    -{campaign.percentuale_sconto}%
                  </div>
                </div>

                {/* Storytelling / Descrizione */}
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: 'var(--cream-dark)',
                  textAlign: 'justify'
                }}>
                  {campaign.descrizione_copy}
                </p>

                {/* Box Location Evento */}
                {campaign.evento_location && (
                  <div style={{
                    borderTop: '1px solid rgba(242,239,234,0.08)',
                    paddingTop: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    fontSize: '0.8rem',
                    color: 'rgba(242,239,234,0.6)'
                  }}>
                    <span>📍 <strong>Location:</strong> {campaign.evento_location}</span>
                    <span>🍷 <strong>Organizzatore:</strong> Difetti Eccellenze Campane</span>
                  </div>
                )}
              </div>

              {/* Form di Registrazione */}
              <div style={{
                background: 'rgba(30, 21, 19, 0.85)',
                border: '1px solid rgba(242,239,234,0.15)',
                borderRadius: '16px',
                padding: '2rem 1.5rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.4rem',
                  color: 'var(--cream)',
                  marginBottom: '0.25rem',
                  textAlign: 'center'
                }}>
                  Richiedi il tuo Coupon
                </h3>
                <p style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  color: 'rgba(242,239,234,0.5)',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.05em'
                }}>
                  Inserisci i tuoi dati per bloccare lo sconto speciale
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(242,239,234,0.6)', fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Nome e Cognome
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Es. Mario Rossi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        background: 'rgba(20, 14, 12, 0.7)',
                        border: '1px solid rgba(242,239,234,0.2)',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        color: '#fff',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.9rem',
                        transition: 'border var(--duration) var(--ease-out)'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(242,239,234,0.6)', fontFamily: 'var(--font-ui)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Numero di Telefono
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Es. 333 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        background: 'rgba(20, 14, 12, 0.7)',
                        border: '1px solid rgba(242,239,234,0.2)',
                        padding: '0.85rem 1rem',
                        borderRadius: '8px',
                        color: '#fff',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.9rem',
                        transition: 'border var(--duration) var(--ease-out)'
                      }}
                    />
                  </div>

                  {errorMsg && (
                    <div style={{
                      color: '#ef5350',
                      fontSize: '0.8rem',
                      background: 'rgba(239, 83, 80, 0.1)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(239, 83, 80, 0.2)',
                      textAlign: 'center'
                    }}>
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{
                      justifyContent: 'center',
                      padding: '14px',
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      borderRadius: '8px',
                      marginTop: '0.5rem',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? 'Elaborazione in corso…' : 'Ottieni subito il tuo coupon'}
                  </button>

                </form>
              </div>

            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(242,239,234,0.05)',
        fontSize: '0.75rem',
        color: 'rgba(242,239,234,0.4)',
        fontFamily: 'var(--font-ui)'
      }}>
        © {new Date().getFullYear()} Difetti Eccellenze Campane. Tutti i diritti riservati.
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
