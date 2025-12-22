'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import { useGetTopRatedQuery } from '@/redux/features/newProductApi';
import ErrorMsg from '@/components/common/error-msg';
import { HomeTwoFeaturedPrdLoader } from '@/components/loader';

/* ---------------- image helpers ---------------- */
const isAbsUrl = (s) => /^(https?:)?\/\//i.test(s || '');
const pickUrlDeep = function pick(v) {
  if (!v) return '';
  if (typeof v === 'string') {
    const s = v.trim().replace(/\s+/g, '');
    return s.startsWith('//') ? `https:${s}` : s;
  }
  if (Array.isArray(v)) for (const x of v) { const got = pickUrlDeep(x); if (got) return got; }
  if (typeof v === 'object')
    for (const val of Object.values(v || {})) {
      const got = pickUrlDeep(val);
      if (got) return got;
    }
  return '';
};

function absoluteUrlFromAnything(src) {
  const raw = pickUrlDeep(src);
  if (!raw) return '';
  if (isAbsUrl(raw)) return raw;
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
  const clean = String(raw).replace(/^\/+/, '').replace(/^api\/+/, '');
  return base ? `${base}/${clean}` : `/${clean}`;
}

function getImageUrl(item) {
  const p = item?.product || item;
  return (
    absoluteUrlFromAnything(p?.image1) ||
    absoluteUrlFromAnything(p?.image2) ||
    absoluteUrlFromAnything(p?.image3) ||
    absoluteUrlFromAnything(p?.img) ||
    absoluteUrlFromAnything(p?.image) ||
    absoluteUrlFromAnything(p?.images) ||
    absoluteUrlFromAnything(p?.thumbnail) ||
    absoluteUrlFromAnything(p?.cover) ||
    absoluteUrlFromAnything(p?.photo) ||
    absoluteUrlFromAnything(p?.picture) ||
    absoluteUrlFromAnything(p?.media) ||
    ""
  );
}

/* ---------------- slider settings ---------------- */
const SLIDER_SETTINGS = {
  spaceBetween: 30,
  slidesPerView: 1,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.featured-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.featured-next',
    prevEl: '.featured-prev',
  },
  // Enhanced touch/swipe settings for mobile
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  allowTouchMove: true,
  touchStartPreventDefault: false,
  touchMoveStopPropagation: false,
  resistanceRatio: 0.85,
  threshold: 10,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  grabCursor: true,
  breakpoints: {
    1400: { 
      slidesPerView: 4, 
      spaceBetween: 30,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    1200: { 
      slidesPerView: 3, 
      spaceBetween: 25,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    992: { 
      slidesPerView: 3, 
      spaceBetween: 20,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    768: { 
      slidesPerView: 2, 
      spaceBetween: 16,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    576: { 
      slidesPerView: 1, 
      spaceBetween: 20,
      centeredSlides: false,
      initialSlide: 0,
      loop: false,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      freeMode: false,
      watchSlidesProgress: true
    },
    0: { 
      slidesPerView: 1, 
      spaceBetween: 20,
      centeredSlides: false,
      initialSlide: 0,
      loop: false,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      freeMode: false,
      watchSlidesProgress: true
    },
  },
  keyboard: { enabled: true, onlyInViewport: true },
};

const CARD_W = 320;
const CARD_H = 320;

/* ---------------- component ---------------- */
const WeeksFeatured = () => {
  const { data: products, isError, isLoading } = useGetTopRatedQuery();

  let content = null;
  if (isLoading) content = <HomeTwoFeaturedPrdLoader loading />;
  else if (isError) content = <ErrorMsg msg="There was an error" />;
  else if (!products?.data?.length) content = <ErrorMsg msg="No Products found!" />;
  else {
    const items = products.data;

    content = (
      <Swiper 
        {...SLIDER_SETTINGS} 
        modules={[Pagination, Autoplay, Navigation]} 
        className="featured-slider"
      >
        {items.map((item, idx) => {
          const p = item?.product || item;
          const pid = p?._id || idx;
          const title = p?.name || item?.title || 'Product Name';
          const imageUrl = getImageUrl(item);
          const slug = p?.slug || pid;
          const detailsHref = `/fabric/${encodeURIComponent(slug)}`;
          
          // Handle category as object - extract name property
          const categoryData = p?.category;
          const category = typeof categoryData === 'object' 
            ? categoryData?.name || 'Premium Fabric' 
            : categoryData || 'Premium Fabric';
            
          const eager = idx < 3;

          return (
            <SwiperSlide key={pid}>
              <div className="featured-card">
                {/* Card Top Section */}
                <div className="card-top">
                  {/* Category Tag */}
                  <div className="category-tag">
                    <span className="tag-text">{category}</span>
                  </div>
                  
                  {/* Image Container */}
                  <Link href={detailsHref} target="_blank" rel="noopener noreferrer" className="card-image-container">
                    <div className="image-wrapper">
                      <Image
                        src={imageUrl || '/assets/img/placeholder/product.jpg'}
                        alt={title}
                        width={CARD_W}
                        height={CARD_H}
                        sizes="(max-width: 768px) 50vw, 320px"
                        priority={eager}
                        loading={eager ? 'eager' : 'lazy'}
                        quality={90}
                        className="card-image"
                      />
                    </div>
                    
                    {/* New Collection Badge */}
                    <div className="collection-badge">
                      <span className="badge-text">New Arrival</span>
                    </div>
                  </Link>
                </div>

                {/* Card Bottom Section */}
                <div className="card-bottom">
                  {/* Product Info */}
                  <div className="product-info">
                    <h3 className="product-title">
                      <Link href={detailsHref} target="_blank" rel="noopener noreferrer">{title}</Link>
                    </h3>
                    
                    {/* Quick Stats */}
                    <div className="quick-stats">
                      <div className="stat-item">
                        <svg className="stat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="stat-text">Premium Quality</span>
                      </div>
                      <div className="stat-item">
                        <svg className="stat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="stat-text">In Stock</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="quick-action">
                    <Link href={detailsHref} target="_blank" rel="noopener noreferrer" className="quick-view-btn">
                      <span className="btn-text">Explore</span>
                      <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return (
    <section className="featured-section pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper-2 text-center mb-50">
              <span className="section-subtitle">
                Featured Collections
                <svg className="tp-shape-line" width="60" height="4" viewBox="0 0 60 4" fill="none">
                  <path d="M0 2H60" stroke="var(--tp-theme-secondary)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <h3 className="section-title">Top-Rated Fabrics</h3>

            </div>
          </div>
        </div>

        {/* Slider Content */}
        <div className="featured-slider-wrapper">
          {/* Navigation Arrows */}
          <div className="featured-nav-wrapper">
            <button className="featured-nav featured-prev" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>
            <button className="featured-nav featured-next" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>
          {content}
        </div>

        {/* Browse All Button - Moved Below */}
        <div className="row">
          <div className="col-xl-12">
            <div className="featured-btn-wrapper text-center mt-30">
              <Link href="/shop" className="view-all-link">
                Browse All
                <svg className="link-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ===== SECTION STYLES ===== */
        .featured-section {
          background: var(--tp-grey-1);
          position: relative;
        }

        /* ===== SECTION HEADER ===== */
        .tp-section-title-wrapper-2 {
          position: relative;
        }

        .section-subtitle {
          display: inline-block;
          color: var(--tp-theme-primary);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-family: var(--tp-ff-jost);
          position: relative;
        }

        .tp-shape-line {
          position: absolute;
          left: 50%;
          bottom: -8px;
          transform: translateX(-50%);
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          color: var(--tp-text-1);
          margin-bottom: 16px;
          font-family: var(--tp-ff-jost);
          line-height: 1.2;
        }

        .section-description {
          color: var(--tp-text-2);
          font-size: 16px;
          max-width: 650px;
          margin: 0 auto;
          font-family: var(--tp-ff-roboto);
          line-height: 1.6;
          text-align: center;
          word-spacing: 0.1em;
          letter-spacing: 0.02em;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: var(--tp-theme-secondary); /* Theme secondary color */
          color: var(--tp-common-white); /* White text */
          border: 2px solid var(--tp-theme-secondary);
          border-radius: 30px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--tp-ff-roboto);
          white-space: nowrap;
        }

        .view-all-link:hover {
          background: var(--tp-common-white); /* White background on hover */
          color: var(--tp-theme-secondary); /* Theme color text on hover */
          border-color: var(--tp-theme-secondary);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(214, 167, 75, 0.25);
        }

        .view-all-link:hover .link-arrow {
          transform: translateX(4px);
        }

        .link-arrow {
          transition: transform 0.3s ease;
        }

        /* ===== SLIDER WRAPPER ===== */
        .featured-slider-wrapper {
          margin: 0 -12px;
          padding: 10px 50px 50px; /* Add horizontal padding for arrows */
          position: relative;
        }

        .featured-slider {
          padding: 10px !important;
        }

        /* Navigation Arrows */
        .featured-nav-wrapper {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          z-index: 10;
          pointer-events: none;
        }

        .featured-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: var(--tp-theme-primary); /* Blue background */
          border: 1px solid var(--tp-theme-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--tp-common-white); /* White arrows */
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .featured-prev {
          left: 10px; /* Move inside container */
        }

        .featured-next {
          right: 10px; /* Move inside container */
        }

        .featured-nav:hover {
          background: var(--tp-common-white); /* White background on hover */
          color: var(--tp-theme-primary); /* Blue arrows on hover */
          border-color: var(--tp-theme-primary);
          transform: translateY(-50%) scale(1.1);
        }

        .featured-nav svg {
          width: 16px;
          height: 16px;
        }

        .featured-nav:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .featured-nav:disabled:hover {
          background: var(--tp-theme-primary);
          color: var(--tp-common-white);
          border-color: var(--tp-theme-primary);
          transform: translateY(-50%);
        }

        /* ===== MODERN CARD DESIGN ===== */
        .featured-card {
          background: var(--tp-common-white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(15, 34, 53, 0.08);
          border: 1px solid var(--tp-grey-2);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .featured-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(44, 76, 151, 0.12);
          border-color: var(--tp-theme-primary);
        }

        /* Card Top */
        .card-top {
          padding: 20px 20px 0;
          position: relative;
        }

        .category-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
        }

        .tag-text {
          display: inline-block;
          padding: 6px 12px;
          background: var(--tp-theme-primary);
          color: var(--tp-common-white);
          font-size: 11px;
          font-weight: 600;
          border-radius: 16px;
          font-family: var(--tp-ff-jost);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .card-image-container {
          display: block;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: var(--tp-grey-5);
          aspect-ratio: 1;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .card-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          padding: 25px;
          transition: transform 0.6s ease;
        }

        .featured-card:hover .card-image {
          transform: scale(1.05);
        }

        .collection-badge {
          position: absolute;
          bottom: 16px;
          right: 16px;
          z-index: 2;
        }

        .badge-text {
          display: inline-block;
          padding: 6px 12px;
          background: var(--tp-theme-secondary);
          color: var(--tp-common-white);
          font-size: 11px;
          font-weight: 600;
          border-radius: 16px;
          font-family: var(--tp-ff-jost);
          letter-spacing: 0.5px;
        }

        /* Card Bottom */
        .card-bottom {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--tp-common-white);
        }

        .product-info {
          margin-bottom: 20px;
          flex: 1;
        }

        .product-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--tp-text-1);
          line-height: 1.4;
          margin: 0 0 15px;
          font-family: var(--tp-ff-jost);
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .product-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .product-title a:hover {
          color: var(--tp-theme-primary);
        }

        .quick-stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-icon {
          color: var(--tp-theme-secondary);
          flex-shrink: 0;
        }

        .stat-text {
          font-size: 13px;
          color: var(--tp-text-2);
          font-weight: 500;
          font-family: var(--tp-ff-roboto);
        }

        /* Quick Action Button */
        .quick-action {
          border-top: 1px solid var(--tp-grey-2);
          padding-top: 18px;
        }

        .quick-view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px;
          background: var(--tp-theme-primary); /* Blue background */
          color: var(--tp-common-white); /* White text */
          border: 1px solid var(--tp-theme-primary);
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--tp-ff-jost);
        }

        .quick-view-btn:hover {
          background: var(--tp-common-white); /* White background on hover */
          color: var(--tp-theme-primary); /* Blue text on hover */
          border-color: var(--tp-theme-primary);
          transform: translateY(-2px);
        }

        .quick-view-btn:hover .btn-icon {
          transform: translateX(3px);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        /* ===== PAGINATION - Hidden ===== */
        .featured-pagination {
          display: none !important;
        }

        .featured-pagination .swiper-pagination-bullet {
          display: none !important;
        }

        .featured-pagination .swiper-pagination-bullet-active {
          display: none !important;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        
        /* Large Desktop */
        @media (min-width: 1400px) {
          .section-title {
            font-size: 36px;
          }
          
          .featured-slider-wrapper {
            margin: 0 -15px;
          }
        }

        /* Desktop */
        @media (max-width: 1200px) {
          .section-title {
            font-size: 32px;
          }
          
          .section-description {
            font-size: 15px;
          }
          
          .card-top,
          .card-bottom {
            padding: 18px;
          }
          
          .product-title {
            font-size: 16px;
          }
          
          .stat-text {
            font-size: 12.5px;
          }
        }

        /* Tablet Landscape */
        @media (max-width: 992px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .section-title {
            font-size: 30px;
          }
          
          .section-subtitle {
            font-size: 13px;
          }
          
          .view-all-link {
            align-self: flex-start;
          }
          
          .featured-slider-wrapper {
            margin: 0 -10px;
            padding: 10px 10px 40px;
          }
          
          .card-top,
          .card-bottom {
            padding: 16px;
          }
          
          .card-image {
            padding: 20px;
          }
          
          .tag-text,
          .badge-text {
            font-size: 10px;
            padding: 5px 10px;
          }
        }

        /* Tablet Portrait */
        @media (max-width: 768px) {
          .featured-section {
            padding: 60px 0 !important;
          }
          
          .section-title {
            font-size: 28px;
          }
          
          .section-description {
            font-size: 14px;
            max-width: 100%;
          }
          
          .featured-card {
            border-radius: 14px;
            width: 280px; /* Fixed width for horizontal scroll */
            flex-shrink: 0;
            margin: 0;
          }
          
          .card-image-container {
            aspect-ratio: 1;
          }
          
          .product-title {
            font-size: 15px;
            margin-bottom: 12px;
          }
          
          .quick-view-btn {
            padding: 9px;
            font-size: 13px;
          }
          
          .view-all-link {
            padding: 14px 32px;
            font-size: 14px;
            border-radius: 30px;
          }
          
          /* Hide navigation arrows on mobile */
          .featured-nav-wrapper {
            display: none;
          }
          
          /* Instagram-style horizontal scroll */
          .featured-slider-wrapper {
            padding: 10px 0 50px;
            margin: 0;
            overflow: hidden;
          }
          
          .featured-slider {
            overflow-x: auto !important;
            overflow-y: hidden !important;
            padding: 10px 15px !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .featured-slider::-webkit-scrollbar {
            display: none;
          }
          
          .featured-slider .swiper-wrapper {
            display: flex !important;
            flex-direction: row !important;
            width: auto !important;
            transform: none !important;
            transition: none !important;
          }
          
          .featured-slider .swiper-slide {
            width: 280px !important;
            margin-right: 15px !important;
            padding: 0 !important;
            scroll-snap-align: start;
            flex-shrink: 0;
          }
          
          .featured-slider .swiper-slide:last-child {
            margin-right: 0 !important;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .section-title {
            font-size: 26px;
          }
          
          .section-subtitle {
            font-size: 12px;
          }
          
          .header-content {
            min-width: 100%;
          }
          
          .featured-card {
            width: 260px; /* Slightly smaller on mobile */
          }
          
          .featured-slider-wrapper {
            margin: 0;
            padding: 5px 0 35px;
          }
          
          .featured-slider .swiper-slide {
            width: 260px !important;
            margin-right: 12px !important;
          }
          
          .card-top,
          .card-bottom {
            padding: 14px;
          }
          
          .category-tag {
            top: 14px;
            left: 14px;
          }
          
          .collection-badge {
            bottom: 14px;
            right: 14px;
          }
          
          .card-image {
            padding: 16px;
          }
          
          .product-title {
            font-size: 14px;
          }
          
          .stat-text {
            font-size: 12px;
          }
          
          .stat-icon {
            width: 14px;
            height: 14px;
          }
          
          .view-all-link {
            width: 100%;
            justify-content: center;
            padding: 14px 32px;
            font-size: 14px;
            border-radius: 30px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .section-title {
            font-size: 24px;
          }
          
          .section-description {
            font-size: 13px;
          }
          
          .featured-slider-wrapper {
            margin: 0 -6px;
          }
          
          .card-top,
          .card-bottom {
            padding: 12px;
          }
          
          .card-image {
            padding: 14px;
          }
          
          .product-title {
            font-size: 13px;
          }
          
          .quick-view-btn {
            padding: 8px;
            font-size: 12px;
          }
        }

        @media (max-width: 380px) {
          .section-title {
            font-size: 22px;
          }
          
          .section-header {
            margin-bottom: 30px;
          }
          
          .product-title {
            font-size: 12.5px;
          }
          
          .stat-item {
            flex-wrap: wrap;
          }
        }

        /* ===== DARK THEME SUPPORT ===== */
        .theme-dark .featured-section {
          background: var(--tp-grey-1);
        }

        .theme-dark .featured-card {
          background: var(--tp-common-white);
          border-color: var(--tp-grey-2);
        }

        .theme-dark .card-image-container {
          background: var(--tp-grey-5);
        }

        .theme-dark .quick-view-btn {
          border-color: var(--tp-grey-2);
        }
      `}</style>
    </section>
  );
};

export default WeeksFeatured;