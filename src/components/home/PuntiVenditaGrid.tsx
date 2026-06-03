'use client';

import { useState, useEffect } from 'react';
import { getAllPuntiVendita } from '@/lib/services/puntiVenditaService';
import { PuntoVendita } from '@/lib/puntiVendita';
import styles from './PuntiVenditaGrid.module.css';

export function PuntiVenditaGrid() {
  const [punti, setPunti] = useState<PuntoVendita[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getAllPuntiVendita();
      setPunti(data);
    }
    loadData();
  }, []);

  const handleCardClick = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className={styles.section} id="punti-vendita">
      <div className="container">
        {/* Header Sezione */}
        <div className={styles.header}>
          <span className="subtitle">La Rete delle Selezioni</span>
          <h2 className="title">Dove Trovare i <br /><em>Prodotti Selezionati da Difetti</em></h2>
          <p className={styles.intro}>
            I ristoranti, i bistrot e le enoteche d'eccellenza che hanno scelto di rifiutare la standardizzazione 
            industriale per servire la sincera qualità dei prodotti a marchio Difetti e dei nostri partner.
          </p>
        </div>

        {/* 3-Column Logo Grid */}
        <div className={styles.grid}>
          {punti.map((p) => {
            const isActive = activeId === p.id;
            return (
              <div 
                key={p.id} 
                className={`${styles.card} ${isActive ? styles.active : ''}`}
                onMouseEnter={() => setActiveId(p.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => handleCardClick(p.id)}
              >
                {/* Logo Box */}
                <div className={styles.logoBox}>
                  {p.logo_url ? (
                    <img src={p.logo_url} alt={p.nome} className={styles.logoImage} />
                  ) : (
                    <div className={styles.textLogo}>
                      <span className={styles.initials}>{getInitials(p.nome)}</span>
                      <span className={styles.brandSubtitle}>{p.tipologia}</span>
                    </div>
                  )}
                  
                  {/* Badge tipologia */}
                  <span className={styles.badge}>{p.tipologia}</span>
                </div>

                {/* Info Overlay (Popover) */}
                <div className={`${styles.popover} ${isActive ? styles.popoverVisible : ''}`}>
                  <h3 className={styles.popoverTitle}>{p.nome}</h3>
                  <span className={styles.popoverSub}>📍 {p.indirizzo}</span>
                  <p className={styles.popoverDesc}>{p.dettaglio}</p>
                  
                  {p.prodotti && p.prodotti.length > 0 && (
                    <div className={styles.popoverProducts}>
                      <strong>Selezioni disponibili:</strong>
                      <div className={styles.productsList}>
                        {p.prodotti.map((pr) => (
                          <span key={pr} className={styles.productTag}>{pr}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {p.telefono && (
                    <div className={styles.popoverContact}>
                      <a 
                        href={p.whatsapp || `tel:${p.telefono}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.contactBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.whatsapp ? 'WhatsApp' : 'Chiama Ora'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
