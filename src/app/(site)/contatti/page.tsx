'use client';

import { useState, FormEvent } from 'react';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

export default function ContattiPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Formspree endpoint — sostituire con il tuo ID
      const res = await fetch('https://formspree.io/f/FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Contatti</span>
          <h1 className={styles.heroTitle}>Parliamone.</h1>
          <p className={styles.heroSub}>
            Antonio risponde personalmente entro 24 ore.
            Il modo più veloce è WhatsApp. Altrimenti compila il form.
          </p>
        </div>
      </section>

      <section className={`${styles.body} section-pad`}>
        <div className={`container ${styles.cols}`}>
          {/* Info colonna */}
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>WhatsApp</h3>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                id="contatti-wa"
                style={{ marginTop: '0.5rem' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.122 1.523 5.862L.057 23.486a.5.5 0 0 0 .613.614l5.598-1.473A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.967 0-3.82-.535-5.404-1.473l-.386-.232-3.995 1.05 1.068-3.898-.253-.4A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Scrivici su WhatsApp
              </a>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Email</h3>
              <a href={`mailto:${BRAND.email}`} className={styles.infoLink}>
                {BRAND.email}
              </a>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Seguici</h3>
              <div className={styles.socialLinks}>
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Zona</h3>
              <p>Irpinia — Campania, Italia</p>
              <p className={styles.legal}>
                Difetti di Antonio De Matteis<br />
                P.IVA: da inserire
              </p>
            </div>
          </div>

          {/* Form colonna */}
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Invia un messaggio</h2>
            <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="nome">Nome *</label>
                  <input type="text" id="nome" name="nome" required placeholder="Il tuo nome" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required placeholder="La tua email" />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="tipo">Sono un...</label>
                <select id="tipo" name="tipo">
                  <option value="">Seleziona</option>
                  <option value="ristoratore">Ristoratore / Chef</option>
                  <option value="azienda">Azienda (regali corporate)</option>
                  <option value="produttore">Produttore artigianale</option>
                  <option value="privato">Privato / Appassionato</option>
                  <option value="altro">Altro</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="messaggio">Messaggio *</label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  required
                  rows={5}
                  placeholder="Raccontaci cosa cerchi..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
                id="contact-submit"
              >
                {status === 'sending' ? 'Invio in corso...' : 'Invia messaggio'}
              </button>

              {status === 'ok' && (
                <p className={styles.success}>✓ Messaggio inviato! Antonio ti risponderà entro 24h.</p>
              )}
              {status === 'error' && (
                <p className={styles.error}>
                  Errore nell&apos;invio. Prova con WhatsApp o scrivi a {BRAND.email}.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96384.09889513544!2d14.72!3d40.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bba3e5fb3f6f7%3A0x4076c9de0c735391!2sAvellino%2C%20AV!5e0!3m2!1sit!2sit!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Zona operativa Difetti — Avellino, Irpinia"
        />
      </section>
    </main>
  );
}
