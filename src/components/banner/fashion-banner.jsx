'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/* ---- constants ---- */
const HERO_VIDEO = '/videos/canva_mix.mp4';
const STATIC_FALLBACK = '/assets/img/hero/hero-bg.jpg';

const EYEBROW  = 'Your One-Stop Fabric Destination';
const TITLE    = 'India\'s Trusted Fabric Manufacturer';
const SUBTITLE = 'From timeless cottons to new-age blends — explore fabrics that define style and durability.';
const CTA      = { href: '/shop', label: 'Discover Now' };

export default function FashionBanner() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Video loaded state for smoother transitions
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="fashion-hero" role="banner" aria-label="Hero Banner">
      {/* Background Container */}
      <div className="hero-bg">
        {/* Video Background */}
        <video
          className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={(e) => {
            console.error('Video loading error:', e);
            e.target.style.display = 'none';
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback Image */}
        <div 
          className="hero-fallback"
          style={{ backgroundImage: `url(${STATIC_FALLBACK})` }}
          aria-hidden="true"
        />

        {/* Modern Gradient Overlays */}
        <div className="bg-overlay primary-overlay" />
        <div className="bg-overlay accent-overlay" />
      </div>

      {/* Content Container */}
      <div className="container">
        <div className="hero-content">
          {/* Top Badge */}
          <div className="eyebrow-badge">
            <span className="badge-text">{EYEBROW}</span>
            <div className="badge-line" />
          </div>

          {/* Main Title */}
          <h1 className="main-title">
            <span className="title-line">India's Trusted</span>
            <span className="title-line accent-line">Fabric Manufacturer</span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle">{SUBTITLE}</p>

          {/* CTA Section */}
          <div className="cta-section">
            <Link href={CTA.href} className="cta-btn">
              <span className="btn-text">{CTA.label}</span>
              <span className="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </div>

          {/* Trust Metrics - Modern Style */}
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-number">500+</div>
              <div className="metric-label">Fabric Varieties</div>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <div className="metric-number">25+</div>
              <div className="metric-label">Years Experience</div>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <div className="metric-number">1000+</div>
              <div className="metric-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ===== HERO SECTION ===== */
        .fashion-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          max-height: 900px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: var(--tp-theme-1);
        }

        /* ===== BACKGROUND STYLES ===== */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: none;
          object-position: center;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .hero-video.loaded {
          opacity: 0.6;
        }

        .hero-fallback {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.5);
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .primary-overlay {
          background: linear-gradient(
            135deg,
            rgba(15, 34, 53, 0.9) 0%,
            rgba(44, 76, 151, 0.7) 50%,
            rgba(15, 34, 53, 0.9) 100%
          );
        }

        .accent-overlay {
          background: radial-gradient(
            circle at 30% 50%,
            rgba(214, 167, 75, 0.15) 0%,
            transparent 70%
          );
        }

        /* ===== CONTENT CONTAINER ===== */
        .container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--page-xpad);
        }

        .hero-content {
          text-align: center;
          color: var(--tp-common-white);
        }

        /* ===== EYEBROW BADGE ===== */
        .eyebrow-badge {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .badge-text {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--tp-theme-secondary);
          font-family: var(--tp-ff-jost);
        }

        .badge-line {
          width: 60px;
          height: 2px;
          background: var(--tp-theme-secondary);
        }

        /* ===== MAIN TITLE ===== */
        .main-title {
          font-family: var(--tp-ff-jost);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .title-line {
          display: block;
          font-size: 3.5rem;
          color: var(--tp-common-white);
        }

        .accent-line {
          background: linear-gradient(135deg, var(--tp-common-white) 30%, var(--tp-theme-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ===== SUBTITLE ===== */
        .subtitle {
          max-width: 600px;
          margin: 0 auto 40px;
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--tp-ff-roboto);
          font-weight: 400;
        }

        /* ===== CTA BUTTON ===== */
        .cta-section {
          margin-bottom: 50px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 42px;
          background: var(--tp-theme-primary);
          color: var(--tp-common-white);
          border: 2px solid transparent;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          font-family: var(--tp-ff-jost);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--tp-theme-secondary);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(44, 76, 151, 0.3);
          border-color: var(--tp-theme-secondary);
        }

        .cta-btn:hover::before {
          opacity: 1;
        }

        .btn-text, .btn-icon {
          position: relative;
          z-index: 1;
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .cta-btn:hover .btn-icon {
          transform: translateX(4px);
        }

        /* ===== METRICS GRID ===== */
        .metrics-grid {
          display: inline-flex;
          align-items: center;
          gap: 32px;
          padding: 24px 40px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .metric-item {
          text-align: center;
        }

        .metric-number {
          font-size: 28px;
          font-weight: 700;
          color: var(--tp-theme-secondary);
          font-family: var(--tp-ff-jost);
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--tp-ff-roboto);
        }

        .metric-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
        }

        /* ===== RESPONSIVE DESIGN ===== */
        
        /* Large Desktop */
        @media (min-width: 1400px) {
          .title-line {
            font-size: 4rem;
          }
        }

        /* Desktop */
        @media (max-width: 1200px) {
          .fashion-hero {
            min-height: 650px;
            max-height: 800px;
          }
          
          .title-line {
            font-size: 3.2rem;
          }
          
          .metrics-grid {
            gap: 28px;
            padding: 20px 36px;
          }
        }

        /* Tablet Landscape */
        @media (max-width: 992px) {
          .fashion-hero {
            height: auto;
            min-height: 600px;
            max-height: none;
            padding: 100px 0;
          }
          
          .title-line {
            font-size: 2.8rem;
          }
          
          .subtitle {
            font-size: 17px;
            max-width: 500px;
            margin-bottom: 36px;
          }
          
          .cta-btn {
            padding: 16px 36px;
            font-size: 15px;
          }
          
          .metrics-grid {
            gap: 24px;
            padding: 18px 32px;
          }
          
          .metric-number {
            font-size: 24px;
          }
        }

        /* Tablet Portrait */
        @media (max-width: 768px) {
          .fashion-hero {
            padding: 80px 0;
            min-height: 550px;
          }
          
          .eyebrow-badge {
            margin-bottom: 32px;
          }
          
          .badge-text {
            font-size: 13px;
            letter-spacing: 1.5px;
          }
          
          .title-line {
            font-size: 2.4rem;
          }
          
          .subtitle {
            font-size: 16px;
            margin-bottom: 32px;
            padding: 0 20px;
          }
          
          .cta-section {
            margin-bottom: 40px;
          }
          
          .metrics-grid {
            flex-direction: column;
            gap: 20px;
            padding: 24px;
            max-width: 280px;
          }
          
          .metric-divider {
            width: 60px;
            height: 1px;
          }
          
          .metric-item {
            padding: 0 20px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .fashion-hero {
            padding: 60px 0;
            min-height: 500px;
          }
          
          .eyebrow-badge {
            margin-bottom: 28px;
          }
          
          .title-line {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 15px;
            margin-bottom: 28px;
            padding: 0;
          }
          
          .cta-btn {
            padding: 14px 32px;
            font-size: 14px;
          }
          
          .metrics-grid {
            padding: 20px;
            max-width: 260px;
          }
          
          .metric-number {
            font-size: 22px;
          }
          
          .metric-label {
            font-size: 11px;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .title-line {
            font-size: 1.8rem;
          }
          
          .badge-text {
            font-size: 12px;
          }
          
          .subtitle {
            font-size: 14px;
          }
          
          .cta-btn {
            padding: 12px 28px;
            font-size: 13px;
          }
          
          .metrics-grid {
            padding: 16px;
          }
        }

        /* ===== PERFORMANCE & ACCESSIBILITY ===== */
        .hero-video {
          will-change: opacity;
        }

        .cta-btn:focus-visible {
          outline: 2px solid var(--tp-theme-secondary);
          outline-offset: 2px;
        }

        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .cta-btn:hover,
          .hero-video {
            transition: none;
          }
          
          .cta-btn:hover .btn-icon {
            transform: none;
          }
        }

        /* Dark theme adjustments */
        .theme-dark .fashion-hero {
          background: var(--tp-theme-1);
        }

        .theme-dark .primary-overlay {
          background: linear-gradient(
            135deg,
            rgba(15, 34, 53, 0.95) 0%,
            rgba(44, 76, 151, 0.8) 50%,
            rgba(15, 34, 53, 0.95) 100%
          );
        }
      `}</style>
    </section>
  );
}