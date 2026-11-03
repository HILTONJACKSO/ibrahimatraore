import React from 'react';
import { SITE_CONFIG } from '@/config/site';

interface HeroPitchCompositionProps {
  jurisdictionLabel: string;
  jurisdictionValue: string;
  entitiesLabel: string;
  entitiesValue: string;
  ariaLabel: string;
}

export function HeroPitchComposition({
  jurisdictionLabel,
  jurisdictionValue,
  entitiesLabel,
  entitiesValue,
  ariaLabel,
}: HeroPitchCompositionProps) {
  const portraitPath = SITE_CONFIG.features.portraitPath;
  const webpPath = portraitPath.replace(/\.jpg$/i, '.webp');

  return (
    <div className="pitch-architectural-frame" aria-label={ariaLabel}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 4.2',
          overflow: 'hidden',
          backgroundColor: '#173B38',
          border: '1px solid rgba(161, 125, 67, 0.45)',
        }}
      >
        <picture>
          <source srcSet={webpPath} type="image/webp" />
          <img
            src={portraitPath}
            alt="Ibrahima Traore — CEO of Sport World Africa and Kouankan IV SL"
            width={800}
            height={840}
            fetchPriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
        </picture>

        {/* Subtle Architectural Pitch Corner Overlay & IT Monogram Seal */}
        <svg
          viewBox="0 0 400 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {/* Subtle inner gold frame lines */}
          <rect
            x="12"
            y="12"
            width="376"
            height="396"
            stroke="#A17D43"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
          {/* Pitch corner arcs */}
          <path
            d="M 12 30 A 18 18 0 0 0 30 12"
            stroke="#F7F5EF"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <path
            d="M 370 12 A 18 18 0 0 0 388 30"
            stroke="#F7F5EF"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Subtle Bottom Gradient & IT Monogram Seal */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '18px',
            bottom: '18px',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(23, 59, 56, 0.92)',
            border: '1px solid #A17D43',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.32)',
          }}
        >
          <img
            src="/brand/monogram-it.svg"
            alt=""
            width={34}
            height={34}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>

      {/* Executive Metadata Strip */}
      <div className="hero-meta-strip">
        <div>
          <span className="meta-item-label">{jurisdictionLabel}</span>
          <span className="meta-item-value">{jurisdictionValue}</span>
        </div>
        <div>
          <span className="meta-item-label">{entitiesLabel}</span>
          <span className="meta-item-value">{entitiesValue}</span>
        </div>
      </div>
    </div>
  );
}

interface ExecutivePortraitCardProps {
  src: string;
  alt: string;
  caption?: string;
  subcaption?: string;
  aspectRatio?: string;
  objectPosition?: string;
}

export function ExecutivePortraitCard({
  src,
  alt,
  caption,
  subcaption,
  aspectRatio = '4 / 4.5',
  objectPosition = 'center top',
}: ExecutivePortraitCardProps) {
  const webpSrc = src.replace(/\.jpg$/i, '.webp');

  return (
    <figure className="pitch-architectural-frame" style={{ margin: 0 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio,
          overflow: 'hidden',
          backgroundColor: '#173B38',
          border: '1px solid rgba(161, 125, 67, 0.45)',
        }}
      >
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition,
              display: 'block',
            }}
          />
        </picture>
      </div>
      {(caption || subcaption) && (
        <figcaption style={{ marginTop: '1.15rem' }}>
          {caption && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
              }}
            >
              {caption}
            </p>
          )}
          {subcaption && (
            <p
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-supporting)',
                marginTop: '0.2rem',
              }}
            >
              {subcaption}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function StatementPitchGraphic() {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '320px', height: 'auto', justifySelf: 'end' }}
      aria-hidden="true"
    >
      <circle
        cx="160"
        cy="110"
        r="86"
        stroke="#A17D43"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />
      <circle
        cx="160"
        cy="110"
        r="54"
        stroke="#F7F5EF"
        strokeWidth="1"
        strokeOpacity="0.22"
      />
      <line
        x1="20"
        y1="110"
        x2="300"
        y2="110"
        stroke="#A17D43"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      <path
        d="M 48 176 C 104 146, 160 110, 272 44"
        stroke="#A17D43"
        strokeWidth="1.6"
        strokeDasharray="4 6"
      />
      <circle cx="160" cy="110" r="4.5" fill="#A17D43" />
      <circle cx="48" cy="176" r="3.5" fill="#F7F5EF" fillOpacity="0.7" />
      <circle cx="272" cy="44" r="3.5" fill="#A17D43" />
    </svg>
  );
}
