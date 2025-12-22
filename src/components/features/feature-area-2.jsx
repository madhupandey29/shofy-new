'use client';
import React from 'react';
import {
  FiCheckCircle,
  FiPackage,
  FiLayers,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
} from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';

const feature_data = [
  {
    title: 'Fast Dispatch',
    subtitle: 'Shipments in days, not weeks',
    icon: <FiPackage />,
    color: '#2C4C97',
  },
  {
    title: '5000+ Fabrics',
    subtitle: 'Cotton, Poplin, Twill, Lycra',
    icon: <FiLayers />,
    color: '#1E3A8A',
  },
  {
    title: 'Quality Control',
    subtitle: 'Batch-wise QC & lab-tested',
    icon: <FiCheckCircle />,
    color: '#3B82F6',
  },
  {
    title: 'Transparent Pricing',
    subtitle: 'No hidden charges',
    icon: <FiDollarSign />,
    color: '#2563EB',
  },
  {
    title: 'Low MOQ',
    subtitle: 'Perfect for designers',
    icon: <FiTrendingUp />,
    color: '#1D4ED8',
  },
  {
    title: 'Dedicated Support',
    subtitle: 'Your own fabric expert',
    icon: <FiUsers />,
    color: '#1E40AF',
  },
];

export default function FeatureAreaTwo() {
  return (
    <section className="aesthetic-features-section">
      {/* Background Decorative Elements */}
      <div className="bg-decorations">
        <div className="circle-1" />
        <div className="circle-2" />
        <div className="circle-3" />
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrapper">
          <div className="header-left">
            <span className="section-kicker">
              <div className="kicker-line" />
              Why We Stand Out
            </span>

            <h2 className="section-title">
              Precision in Every <span className="highlight">Thread</span>
            </h2>
          </div>

          <div className="header-right">
            <p className="section-description">
              We deliver more than fabric—we deliver reliability, consistency, and partnership.
              Every roll reflects our commitment to excellence.
            </p>

            <a href="/contact" className="cta-link">
              Start Conversation <BsArrowRight />
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="modern-features-grid">
          {feature_data.map(({ title, subtitle, icon, color }, index) => (
            <div key={title} className="modern-feature-card">
              <div className="feature-number">0{index + 1}</div>

              <div
                className="icon-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
                  boxShadow: `0 8px 24px ${color}40`,
                }}
              >
                {icon}
              </div>

              <div className="feature-content">
                <h3 className="feature-title">{title}</h3>
                <p className="feature-subtitle">{subtitle}</p>
              </div>

              <div className="hover-indicator">
                <BsArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ IMPORTANT: style block MUST be wrapped in backticks */}
      <style jsx global>{`
        /* ===== AESTHETIC FEATURES SECTION ===== */
        .aesthetic-features-section {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        /* Background Decorations */
        .bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .circle-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(44, 76, 151, 0.05) 0%, transparent 70%);
          top: -200px;
          right: -200px;
        }
        .circle-2 {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(214, 167, 75, 0.03) 0%, transparent 70%);
          bottom: -150px;
          left: -150px;
        }
        .circle-3 {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(44, 76, 151, 0.08) 0%, transparent 70%);
          top: 50%;
          left: 10%;
        }

        /* ===== SECTION HEADER ===== */
        .section-header-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 60px;
        }

        .section-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--tp-theme-primary);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
          font-family: var(--tp-ff-jost);
        }

        .kicker-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, var(--tp-theme-primary), var(--tp-theme-secondary));
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: var(--tp-text-1);
          line-height: 1.1;
          font-family: var(--tp-ff-jost);
          margin: 0;
        }

        .highlight {
          background: linear-gradient(135deg, var(--tp-theme-primary), var(--tp-theme-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-description {
          color: var(--tp-text-2);
          font-size: 17px;
          line-height: 1.7;
          font-family: var(--tp-ff-roboto);
          margin: 0 0 28px;
          max-width: 520px;
        }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--tp-theme-primary);
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          font-family: var(--tp-ff-jost);
          transition: gap 0.3s ease;
          padding: 10px 0;
          position: relative;
        }

        .cta-link::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--tp-theme-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: right;
        }

        .cta-link:hover {
          gap: 12px;
        }
        .cta-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* ===== GRID (DESKTOP = 6 IN ONE ROW) ===== */
        .modern-features-grid {
          display: grid;
          grid-template-columns: 1fr; /* mobile default */
          gap: 18px;
          margin-bottom: 10px; /* no stats now, so less bottom space */
        }

        /* ===== FEATURE CARD ===== */
        .modern-feature-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 4px 20px rgba(15, 34, 53, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.15);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 190px;
        }

        .modern-feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 100%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .modern-feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(44, 76, 151, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          border-color: var(--tp-theme-primary);
        }
        .modern-feature-card:hover::before {
          opacity: 1;
        }

        .feature-number {
          position: absolute;
          top: 18px;
          right: 18px;
          font-size: 14px;
          font-weight: 700;
          color: var(--tp-theme-primary);
          font-family: var(--tp-ff-jost);
          opacity: 0.65;
          z-index: 2;
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .icon-wrapper svg {
          width: 26px;
          height: 26px;
          color: #fff;
        }

        .feature-content {
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .feature-title {
          font-size: 20px;
          font-weight: 650;
          color: var(--tp-text-1);
          margin-bottom: 10px;
          font-family: var(--tp-ff-jost);
          line-height: 1.25;
        }

        .feature-subtitle {
          color: var(--tp-text-2);
          font-size: 14px;
          line-height: 1.6;
          font-family: var(--tp-ff-roboto);
          margin: 0;
        }

        .hover-indicator {
          position: absolute;
          bottom: 20px;
          right: 20px;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.25s ease;
          color: var(--tp-theme-primary);
          z-index: 2;
        }
        .modern-feature-card:hover .hover-indicator {
          opacity: 1;
          transform: translateX(0);
        }

        /* ===== RESPONSIVE BREAKPOINTS ===== */

        /* >= 576px: 2 cards */
        @media (min-width: 576px) {
          .modern-features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 22px;
          }
        }

        /* >= 992px: 3 cards */
        @media (min-width: 992px) {
          .aesthetic-features-section {
            padding: 70px 0;
          }
          .section-title {
            font-size: 42px;
          }
          .section-header-wrapper {
            gap: 40px;
          }
          .modern-features-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        /* >= 1200px: 6 cards in one row (your desktop design) */
        @media (min-width: 1200px) {
          .modern-features-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 24px;
          }

          /* compact cards for 6-in-a-row */
          .modern-feature-card {
            padding: 22px 18px;
            border-radius: 18px;
            min-height: 185px;
          }

          .feature-number {
            top: 16px;
            right: 16px;
          }

          .icon-wrapper {
            width: 56px;
            height: 56px;
            margin-bottom: 16px;
          }

          .icon-wrapper svg {
            width: 24px;
            height: 24px;
          }

          .feature-title {
            font-size: 18px;
            margin-bottom: 8px;
          }

          .feature-subtitle {
            font-size: 13px;
          }

          .hover-indicator {
            bottom: 16px;
            right: 16px;
          }
        }

        /* >= 1400px: keep 6 cards, bigger heading */
        @media (min-width: 1400px) {
          .section-title {
            font-size: 56px;
          }
          .modern-features-grid {
            gap: 28px;
          }
          .modern-feature-card {
            min-height: 195px;
          }
        }

        /* <= 992px: stack header */
        @media (max-width: 992px) {
          .section-header-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .section-title {
            font-size: 38px;
          }
          .section-description {
            font-size: 16px;
          }
        }

        /* <= 768px: 1 column centered */
        @media (max-width: 768px) {
          .section-title {
            font-size: 34px;
          }
          .section-kicker {
            font-size: 12px;
          }
          .modern-features-grid {
            grid-template-columns: 1fr;
            max-width: 560px;
            margin: 0 auto;
          }
        }

        /* <= 576px: tighter spacing */
        @media (max-width: 576px) {
          .aesthetic-features-section {
            padding: 50px 0;
          }
          .section-title {
            font-size: 30px;
          }
          .section-kicker {
            font-size: 11px;
            letter-spacing: 1.5px;
          }
          .modern-feature-card {
            padding: 24px;
          }
          .icon-wrapper {
            width: 52px;
            height: 52px;
            margin-bottom: 18px;
          }
          .icon-wrapper svg {
            width: 24px;
            height: 24px;
          }
          .feature-title {
            font-size: 18px;
          }
          .feature-subtitle {
            font-size: 13px;
          }
        }

        /* Dark Theme Support */
        .theme-dark .aesthetic-features-section {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .theme-dark .modern-feature-card {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .theme-dark .feature-title {
          color: var(--tp-common-white);
        }
        .theme-dark .feature-subtitle {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </section>
  );
}
