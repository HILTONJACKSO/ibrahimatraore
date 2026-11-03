'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Global IntersectionObserver that orchestrates smooth, staggered scroll-reveal
 * animations across all sections, cards, portraits, and headings on every route,
 * plus a subtle 2px muted-gold reading progress bar at the top of the viewport.
 */
export function ScrollRevealObserver() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Subtle reading progress bar
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setScrollProgress(pct);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [pathname]);

  // 2. Staggered IntersectionObserver for sections, cards, portraits & headings
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const selectors = [
      '.section:not(.hero-section) .section-heading',
      '.section:not(.hero-section) .lead-copy',
      '.editorial-panel',
      '.partner-track-card',
      '.partner-cta-credential-card',
      '.ceo-letter-card',
      '.ceo-message-portrait-col',
      '.editorial-media-split > div',
      '.split-editorial > div',
      '.brand-statement-inner > *',
      '.table-wrapper',
      '.contact-form-card',
      '.contact-layout > aside > div',
      '.two-panel-grid > figure',
    ].join(', ');

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selectors)
    );

    // Assign reveal classes and stagger index for grid siblings
    elements.forEach((el) => {
      // Avoid double-initializing elements already revealed
      if (el.dataset.revealReady === 'true') return;
      el.dataset.revealReady = 'true';

      const parent = el.parentElement;
      if (
        parent &&
        (parent.classList.contains('three-column-grid') ||
          parent.classList.contains('two-panel-grid') ||
          parent.classList.contains('partner-tracks-grid') ||
          parent.classList.contains('editorial-media-split') ||
          parent.classList.contains('split-editorial'))
      ) {
        const siblings = Array.from(parent.children);
        const idx = siblings.indexOf(el);
        if (idx > 0) {
          el.style.setProperty('--reveal-delay', `${Math.min(idx * 110, 330)}ms`);
        }
      }

      // Check if already inside the initial viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('scroll-reveal-item', 'is-visible');
      } else {
        el.classList.add('scroll-reveal-item');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div
      className="scroll-progress-bar"
      aria-hidden="true"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  );
}
