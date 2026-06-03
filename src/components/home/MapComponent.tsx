'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { PuntoVendita } from '@/lib/puntiVendita';

interface MapComponentProps {
  punti: PuntoVendita[];
}

export default function MapComponent({ punti }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Centriamo la mappa sulla Campania (Avellino)
    const map = L.map(mapContainerRef.current, {
      center: [40.9140, 14.7938],
      zoom: 9,
      scrollWheelZoom: false, // Evita scroll hijacking durante la navigazione della pagina
      zoomControl: true,
    });

    // Tile eleganti e minimaliste di CartoDB (Positron)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    mapRef.current = map;

    // Aggiunge la possibilità di zoomare con la rotella se cliccata
    map.on('focus', () => {
      map.scrollWheelZoom.enable();
    });
    map.on('blur', () => {
      map.scrollWheelZoom.disable();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Effetto per aggiornare i marker quando i punti filtrati cambiano
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Rimuovi i vecchi marker
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (punti.length === 0) return;

    // Icona personalizzata in perfetto stile Brutalista / Brand
    const customIcon = L.divIcon({
      className: 'custom-brutalist-pin',
      html: `
        <div style="
          background-color: #A33E49; 
          width: 16px; 
          height: 16px; 
          border: 2px solid #140E0C; 
          border-radius: 50%; 
          box-shadow: 2px 2px 0px #140E0C;
          transition: transform 0.2s ease-out;
        "></div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });

    // Aggiungi i nuovi marker
    const bounds = L.latLngBounds([]);
    
    punti.forEach((punto) => {
      if (punto.lat === undefined || punto.lng === undefined) return;
      const marker = L.marker([punto.lat, punto.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: var(--font-body, serif); color: #140E0C; padding: 4px; min-width: 200px;">
            <span style="
              font-family: var(--font-ui, sans-serif); 
              font-size: 0.7rem; 
              text-transform: uppercase; 
              letter-spacing: 0.1em; 
              color: #A33E49; 
              font-weight: bold;
              display: block;
              margin-bottom: 2px;
            ">${punto.tipologia}</span>
            <h4 style="
              font-family: var(--font-title, serif); 
              font-size: 1.1rem; 
              margin: 0 0 6px 0; 
              font-weight: 700;
              color: #140E0C;
            ">${punto.nome}</h4>
            <p style="font-size: 0.85rem; margin: 0 0 8px 0; line-height: 1.3;">${punto.dettaglio}</p>
            <div style="font-size: 0.8rem; border-top: 1px solid #e2ded8; padding-top: 6px; margin-bottom: 8px;">
              <strong>Prodotti:</strong> ${punto.prodotti.join(', ')}
            </div>
            <div style="font-size: 0.75rem; color: #5a3e36; font-style: italic; margin-bottom: 8px;">
              📍 ${punto.indirizzo}
            </div>
            ${punto.whatsapp ? `
              <a href="${punto.whatsapp}" target="_blank" rel="noopener noreferrer" style="
                display: inline-block;
                width: 100%;
                text-align: center;
                background-color: #140E0C;
                color: #F2EFEA;
                font-family: var(--font-ui, sans-serif);
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                text-decoration: none;
                padding: 6px 12px;
                border: 1px solid #140E0C;
                box-shadow: 2px 2px 0px #A33E49;
                transition: transform 0.1s, box-shadow 0.1s;
              " 
              onmouseover="this.style.transform='translate(-1px, -1px)'; this.style.boxShadow='3px 3px 0px #A33E49';"
              onmouseout="this.style.transform='none'; this.style.boxShadow='2px 2px 0px #A33E49';"
              >
                Contatta o Prenota
              </a>
            ` : ''}
          </div>
        `);

      markersRef.current.push(marker);
      bounds.extend([punto.lat, punto.lng]);
    });

    // Se ci sono marker, adattiamo la visualizzazione della mappa
    if (punti.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [punti]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: '100%', height: '100%', minHeight: '450px' }}
      className="brutalist-map-container"
    />
  );
}
