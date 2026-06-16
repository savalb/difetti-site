'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/(site)/eventi/[slug]/page.module.css';

interface PolaroidGalleryProps {
  immagini: string[];
  titolo: string;
}

export function PolaroidGallery({ immagini, titolo }: PolaroidGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
    setActiveIndex(0);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % immagini.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + immagini.length) % immagini.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, immagini]);

  if (!immagini || immagini.length === 0) return null;

  // The first image is the cover
  const coverImg = immagini[0];

  const activeMediaUrl = immagini[activeIndex];
  const isVideo = activeMediaUrl.toLowerCase().endsWith('.mp4') || activeMediaUrl.toLowerCase().endsWith('.mov');

  return (
    <>
      {/* Tilted Polaroid Album Cover */}
      <div className={styles.polaroidCoverContainer}>
        <div className={styles.polaroidCover} onClick={handleOpen}>
          <div className={styles.polaroidCoverImgWrapper}>
            <Image
              src={coverImg}
              alt={`Copertina album ${titolo}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={styles.galleryImg}
              priority
            />
            <div className={styles.polaroidBadge}>
              📷 GUARDA LE FOTO DELL&apos;EVENTO
            </div>
          </div>
          <div className={styles.polaroidCaption}>
            {titolo}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className={styles.lightbox} onClick={handleClose}>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Chiudi galleria">
            ✕
          </button>
          
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <div className={styles.polaroidFrame}>
              <div className={styles.polaroidMediaWrapper}>
                {isVideo ? (
                  <video
                    src={activeMediaUrl}
                    className={styles.polaroidVideo}
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <Image
                    src={activeMediaUrl}
                    alt={`Immagine ${activeIndex + 1} di ${titolo}`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 80vw"
                    className={styles.polaroidImg}
                    priority
                  />
                )}
              </div>
              <div className={styles.polaroidFooter}>
                {titolo}
              </div>
            </div>

            {/* Navigation controls */}
            {immagini.length > 1 && (
              <div className={styles.lightboxControls}>
                <button className={styles.navBtn} onClick={handlePrev} aria-label="Media precedente">
                  ← Precedente
                </button>
                <span style={{ color: 'var(--cream)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem' }}>
                  {activeIndex + 1} / {immagini.length}
                </span>
                <button className={styles.navBtn} onClick={handleNext} aria-label="Media successivo">
                  Successiva →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
