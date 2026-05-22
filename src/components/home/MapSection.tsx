'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PUNTI_VENDITA, PuntoVendita } from '@/lib/puntiVendita';
import styles from './MapSection.module.css';

// Importazione dinamica del componente mappa per escluderlo dal SSR (evita errori su window)
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className={styles.mapLoading}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Inizializzazione della mappa...</p>
    </div>
  ),
});

type ProvinciaFiltro = 'Tutte' | 'Avellino' | 'Napoli' | 'Salerno' | 'Benevento';
type TipologiaFiltro = 'Tutte' | 'ristorante' | 'enoteca' | 'pizzeria' | 'bistrot';

export function MapSection() {
  const [selectedProvincia, setSelectedProvincia] = useState<ProvinciaFiltro>('Tutte');
  const [selectedTipologia, setSelectedTipologia] = useState<TipologiaFiltro>('Tutte');

  // Filtra i punti vendita in base alle selezioni dell'utente
  const filteredPunti = useMemo(() => {
    return PUNTI_VENDITA.filter((punto) => {
      const matchProvincia = selectedProvincia === 'Tutte' || punto.provincia === selectedProvincia;
      const matchTipologia = selectedTipologia === 'Tutte' || punto.tipologia === selectedTipologia;
      return matchProvincia && matchTipologia;
    });
  }, [selectedProvincia, selectedTipologia]);

  const province: ProvinciaFiltro[] = ['Tutte', 'Avellino', 'Napoli', 'Salerno', 'Benevento'];
  const tipologie: { value: TipologiaFiltro; label: string }[] = [
    { value: 'Tutte', label: 'Tutte le tipologie' },
    { value: 'ristorante', label: 'Ristoranti' },
    { value: 'enoteca', label: 'Enoteche' },
    { value: 'pizzeria', label: 'Pizzerie' },
    { value: 'bistrot', label: 'Bistrot' },
  ];

  return (
    <section className={styles.section} id="punti-vendita">
      <div className="container">
        {/* Header Sezione */}
        <div className={styles.header}>
          <span className="subtitle">La Rete della Verità</span>
          <h2 className="title">Dove Trovare il <br /><em>Difetto Certificato</em></h2>
          <p className={styles.intro}>
            I ristoranti, le pizzerie e le enoteche che hanno scelto di rifiutare la standardizzazione 
            industriale per servire la sincera imperfezione dei prodotti artigianali campani.
          </p>
        </div>

        {/* Pannello Controlli e Mappa */}
        <div className={styles.layout}>
          {/* Sidebar Sinistra: Filtri e Lista */}
          <div className={styles.sidebar}>
            {/* Filtri */}
            <div className={styles.filtersBox}>
              <h3 className={styles.filterTitle}>Filtra per Area</h3>
              <div className={styles.provinciaChips}>
                {province.map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvincia(prov)}
                    className={`${styles.chip} ${selectedProvincia === prov ? styles.chipActive : ''}`}
                  >
                    {prov}
                  </button>
                ))}
              </div>

              <h3 className={styles.filterTitle} style={{ marginTop: '20px' }}>Tipologia Locale</h3>
              <div className={styles.selectWrapper}>
                <select
                  value={selectedTipologia}
                  onChange={(e) => setSelectedTipologia(e.target.value as TipologiaFiltro)}
                  className={styles.select}
                >
                  {tipologie.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lista Locali Filtrati */}
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <span>Locali trovati: <strong>{filteredPunti.length}</strong></span>
              </div>
              
              {filteredPunti.length === 0 ? (
                <div className={styles.noResults}>
                  <p>Nessun punto vendita corrisponde ai filtri selezionati in questa zona.</p>
                </div>
              ) : (
                <div className={styles.list}>
                  {filteredPunti.map((punto) => (
                    <div key={punto.id} className={styles.itemCard}>
                      <span className={styles.itemType}>{punto.tipologia}</span>
                      <h4 className={styles.itemName}>{punto.nome}</h4>
                      <p className={styles.itemDesc}>{punto.dettaglio}</p>
                      <div className={styles.itemProducts}>
                        <strong>Prodotti:</strong> {punto.prodotti.join(', ')}
                      </div>
                      <div className={styles.itemMeta}>
                        <span className={styles.itemAddress}>📍 {punto.indirizzo}</span>
                        {punto.whatsapp && (
                          <a 
                            href={punto.whatsapp} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.itemWa}
                          >
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mappa Destra */}
          <div className={styles.mapWrapper}>
            <MapComponent punti={filteredPunti} />
          </div>
        </div>
      </div>
    </section>
  );
}
