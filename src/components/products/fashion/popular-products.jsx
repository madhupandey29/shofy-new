'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import { useGetPopularNewProductsQuery } from '@/redux/features/newProductApi';
import ErrorMsg from '@/components/common/error-msg';
import { HomeTwoPopularPrdLoader } from '@/components/loader';

/* ---------- helpers ---------- */
const isAbsUrl = (s) => /^(https?:)?\/\//i.test(s || '');
const cleanStringUrl = (s) => {
  if (!s) return '';
  const v = String(s).trim().replace(/\s+/g, '');
  if (!v || v === 'null' || v === 'undefined') return '';
  return v.startsWith('//') ? `https:${v}` : v;
};

const pickUrlDeep = function pick(v) {
  if (!v) return '';
  if (typeof v === 'string') return cleanStringUrl(v);

  if (Array.isArray(v)) {
    for (const x of v) {
      const got = pickUrlDeep(x);
      if (got) return got;
    }
    return '';
  }

  if (typeof v === 'object') {
    const direct =
      v.secure_url ||
      v.url ||
      v.path ||
      v.key ||
      v.src ||
      v.publicUrl ||
      v.imageUrl;

    const fromDirect = pickUrlDeep(direct);
    if (fromDirect) return fromDirect;

    for (const val of Object.values(v)) {
      const got = pickUrlDeep(val);
      if (got) return got;
    }
    return '';
  }

  return '';
};

function absoluteUrlFromAnything(src) {
  const raw = pickUrlDeep(src);
  if (!raw) return '';
  if (isAbsUrl(raw)) return raw;

  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');
  const clean = String(raw)
    .replace(/^\/+/, '')
    .replace(/^api\/uploads\/?/, '')
    .replace(/^uploads\/?/, '');

  return base ? `${base}/uploads/${clean}` : `/${clean}`;
}

function getItemImage(item) {
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
    ''
  );
}

/* ---------- slider options ---------- */
const SLIDER_OPTS = {
  spaceBetween: 24,
  rewind: true,
  speed: 400,
  centeredSlides: false,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.tp-popular-next',
    prevEl: '.tp-popular-prev',
  },
  // Enhanced touch/swipe settings for mobile
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  allowTouchMove: true,
  touchStartPreventDefault: false,
  touchMoveStopPropagation: false,
  resistanceRatio: 0.85,
  threshold: 5,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  grabCursor: true,
  touchEventsTarget: 'container',
  passiveListeners: false,
  breakpoints: {
    1400: { 
      slidesPerView: 5, 
      spaceBetween: 24,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    1200: { 
      slidesPerView: 4, 
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    992: { 
      slidesPerView: 3, 
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    768: { 
      slidesPerView: 2, 
      spaceBetween: 16,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }
    },
    576: { 
      slidesPerView: 1, 
      spaceBetween: 20,
      centeredSlides: false,
      initialSlide: 0,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      freeMode: false,
      watchSlidesProgress: true,
      touchRatio: 1.2,
      threshold: 3,
      allowTouchMove: true,
      simulateTouch: true,
    },
    0: { 
      slidesPerView: 1, 
      spaceBetween: 20,
      centeredSlides: false,
      initialSlide: 0,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      freeMode: false,
      watchSlidesProgress: true,
      touchRatio: 1.2,
      threshold: 3,
      allowTouchMove: true,
      simulateTouch: true,
    },
  },
  keyboard: { enabled: true, onlyInViewport: true },
};

const CARD_W = 260;
const CARD_H = 300;

export default function PopularProducts() {
  const { data, isError, isLoading } = useGetPopularNewProductsQuery();

  let carousel = <ErrorMsg msg="No Products found!" />;
  if (isLoading) carousel = <HomeTwoPopularPrdLoader loading />;
  if (!isLoading && isError) carousel = <ErrorMsg msg="There was an error" />;

  if (
    !isLoading &&
    !isError &&
    data?.status === 1 &&
    Array.isArray(data?.data) &&
    data.data.length
  ) {
    const items = data.data;

    carousel = (
      <Swiper
        {...SLIDER_OPTS}
        modules={[Pagination, Autoplay, Navigation]}
        className="tp-popular-products-slider"
      >
        {items.map((seoDoc, idx) => {
          const p = seoDoc.product || seoDoc;
          const src = getItemImage(seoDoc) || '/assets/img/product/product-1.jpg';
          const pid = p?._id;
          const slug = p?.slug || pid;
          const pname = p?.name ?? 'Product';
          const detailsHref = slug ? `/fabric/${slug}` : '#';
          const eager = idx < 3;

          return (
            <SwiperSlide key={seoDoc._id || pid || idx}>
              <div className="tp-popular-product-card">
                {/* Product Image */}
                <div className="tp-popular-product-img-wrapper">
                  <Link href={detailsHref} className="tp-popular-product-img-link">
                    {/* Popular Badge */}
                    <div className="tp-popular-badge">
                      <span className="tp-popular-badge-text">Popular</span>
                    </div>
                    
                    <Image
                      src={src}
                      alt={pname}
                      width={CARD_W}
                      height={CARD_H}
                      sizes="(max-width: 768px) 50vw, 260px"
                      priority={eager}
                      loading={eager ? 'eager' : 'lazy'}
                      quality={80}
                      className="tp-popular-product-img"
                    />
                    
                    {/* Hover Overlay */}
                  
                  </Link>
                </div>

                {/* Product Info */}
                <div className="tp-popular-product-info">
                  <h3 className="tp-popular-product-title">
                    <Link href={detailsHref}>{pname}</Link>
                  </h3>
                  
                  <div className="tp-popular-product-action">
                    <Link href={detailsHref} className="tp-btn tp-btn-popular">
                      Explore Details
                      <svg className="tp-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    <section className="tp-popular-products-area pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper-2 text-center mb-50">
              <span className="tp-section-title-pre-2">
                Popular Collection
                <svg className="tp-shape-line" width="60" height="4" viewBox="0 0 60 4" fill="none">
                  <path d="M0 2H60" stroke="var(--tp-theme-secondary)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <h3 className="tp-section-title-2">
                Our Most Popular Fabrics
              </h3>
              <p className="tp-section-description">
                Premium quality fabrics loved by designers and manufacturers
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="tp-popular-products-slider-wrapper">
              {/* Navigation Arrows */}
              <div className="tp-popular-nav-wrapper">
                <button className="tp-popular-nav tp-popular-prev" type="button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <button className="tp-popular-nav tp-popular-next" type="button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </div>
              {carousel}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="tp-popular-products-btn-wrapper text-center mt-50">
              <Link href="/shop" className="tp-btn tp-btn-border tp-btn-shop-all">
                View All Products
                <svg className="tp-btn-shop-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Main Section Styling */
        .tp-popular-products-area {
          background: var(--tp-grey-1);
          position: relative;
        }

        .tp-popular-products-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--tp-grey-2), transparent);
        }

        /* Section Title */
        .tp-section-title-wrapper-2 {
          position: relative;
        }

        .tp-section-title-pre-2 {
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

        .tp-section-title-2 {
          font-size: 36px;
          font-weight: 700;
          color: var(--tp-text-1);
          margin-bottom: 16px;
          font-family: var(--tp-ff-jost);
          line-height: 1.2;
        }

        .tp-section-description {
          color: var(--tp-text-2);
          font-size: 16px;
          max-width: 600px;
          margin: 0 auto;
          font-family: var(--tp-ff-roboto);
          line-height: 1.6;
        }

        /* Slider Wrapper */
        .tp-popular-products-slider-wrapper {
          margin: 0 -12px;
          padding: 20px 50px 40px; /* Add horizontal padding for arrows */
          position: relative;
        }

        .tp-popular-products-slider {
          padding: 10px !important;
        }

        /* Navigation Arrows */
        .tp-popular-nav-wrapper {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          z-index: 10;
          pointer-events: none;
        }

        .tp-popular-nav {
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

        .tp-popular-prev {
          left: 10px; /* Move inside container */
        }

        .tp-popular-next {
          right: 10px; /* Move inside container */
        }

        .tp-popular-nav:hover {
          background: var(--tp-common-white); /* White background on hover */
          color: var(--tp-theme-primary); /* Blue arrows on hover */
          border-color: var(--tp-theme-primary);
          transform: translateY(-50%) scale(1.1);
        }

        .tp-popular-nav svg {
          width: 16px;
          height: 16px;
        }

        .tp-popular-nav:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tp-popular-nav:disabled:hover {
          background: var(--tp-theme-primary);
          color: var(--tp-common-white);
          border-color: var(--tp-theme-primary);
          transform: translateY(-50%);
        }

        /* Product Card */
        .tp-popular-product-card {
          background: var(--tp-common-white);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(15, 34, 53, 0.05);
          border: 1px solid var(--tp-grey-2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .tp-popular-product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba(44, 76, 151, 0.15);
          border-color: var(--tp-theme-primary);
        }

        /* Image Container */
        .tp-popular-product-img-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
          background: var(--tp-grey-5);
          aspect-ratio: 1;
        }

        .tp-popular-product-img-link {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Popular Badge */
        .tp-popular-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 2;
        }

        .tp-popular-badge-text {
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

        .tp-popular-product-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          padding: 25px;
          transition: transform 0.5s ease;
          background: var(--tp-grey-5);
        }

        .tp-popular-product-card:hover .tp-popular-product-img {
          transform: scale(1.05);
        }

        /* Hover Overlay */
        .tp-popular-product-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(15, 34, 53, 0.85) 0%, rgba(15, 34, 53, 0.7) 50%, rgba(15, 34, 53, 0.3) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .tp-popular-product-card:hover .tp-popular-product-overlay {
          opacity: 1;
        }

        .tp-popular-product-view {
          color: var(--tp-common-white);
          font-size: 10px;
          font-weight: 600;
          padding: 10px;
          background: rgba(214, 167, 75, 0.95);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-family: var(--tp-ff-jost);
          letter-spacing: 0.5px;
        }

        /* Product Info */
        .tp-popular-product-info {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--tp-common-white);
          border-radius: 0 0 10px 10px;
        }

        .tp-popular-product-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--tp-text-1);
          margin-bottom: 20px;
          line-height: 1.4;
          font-family: var(--tp-ff-jost);
          text-align: center;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tp-popular-product-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .tp-popular-product-title a:hover {
          color: var(--tp-theme-primary);
        }

        .tp-popular-product-action {
          margin-top: auto;
        }

        /* Button Styling */
        .tp-btn.tp-btn-popular {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px;
          background: var(--tp-theme-primary);
          color: var(--tp-common-white);
          border: 1px solid var(--tp-theme-primary);
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--tp-ff-roboto);
          position: relative;
          overflow: hidden;
        }

        .tp-btn.tp-btn-popular:hover {
          background: var(--tp-common-white);
          color: var(--tp-theme-primary);
          box-shadow: 0 4px 16px rgba(44, 76, 151, 0.2);
        }

        .tp-btn.tp-btn-popular:hover .tp-btn-arrow {
          transform: translateX(4px);
        }

        .tp-btn-arrow {
          transition: transform 0.3s ease;
        }

        /* Shop All Button - Theme Color */
        .tp-btn.tp-btn-border.tp-btn-shop-all {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          background: var(--tp-theme-secondary); /* Theme secondary color */
          border: 2px solid var(--tp-theme-secondary);
          color: var(--tp-common-white); /* White text */
          border-radius: 30px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--tp-ff-roboto);
        }

        .tp-btn.tp-btn-border.tp-btn-shop-all:hover {
          background: var(--tp-common-white); /* White background on hover */
          color: var(--tp-theme-secondary); /* Theme color text on hover */
          border-color: var(--tp-theme-secondary);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(214, 167, 75, 0.25);
        }

        .tp-btn.tp-btn-border.tp-btn-shop-all:hover .tp-btn-shop-arrow {
          transform: translateX(4px);
        }

        .tp-btn-shop-arrow {
          transition: transform 0.3s ease;
        }

        /* Swiper Pagination - Hidden */
        .swiper-pagination {
          display: none !important;
        }

        .swiper-pagination-bullet {
          display: none !important;
        }

        .swiper-pagination-bullet-active {
          display: none !important;
        }

        /* ===== MOBILE SWIPER FIXES ===== */
        @media (max-width: 768px) {
          .swiper {
            touch-action: pan-y pinch-zoom !important;
          }
          
          .swiper-wrapper {
            touch-action: pan-y pinch-zoom !important;
          }
          
          .swiper-slide {
            touch-action: pan-y pinch-zoom !important;
          }
          
          /* Ensure proper touch handling */
          .tp-popular-products-slider {
            touch-action: pan-y pinch-zoom !important;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .tp-popular-products-slider .swiper-wrapper {
            touch-action: pan-y pinch-zoom !important;
          }
          
          .tp-popular-products-slider .swiper-slide {
            touch-action: pan-y pinch-zoom !important;
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .tp-section-title-2 {
            font-size: 32px;
          }
          
          .tp-popular-product-title {
            font-size: 16px;
          }
        }

        @media (max-width: 992px) {
          .tp-section-title-2 {
            font-size: 28px;
          }
          
          .tp-section-description {
            font-size: 15px;
          }
          
          .tp-popular-product-info {
            padding: 20px;
          }
          
          .tp-btn.tp-btn-popular {
            padding: 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .tp-popular-products-area {
            padding: 60px 0;
          }
          
          .tp-section-title-2 {
            font-size: 26px;
          }
          
          .tp-section-title-pre-2 {
            font-size: 13px;
          }
          
          .tp-popular-product-card {
            border-radius: 10px;
            width: 280px; /* Fixed width for horizontal scroll */
            flex-shrink: 0;
            margin: 0;
          }
          
          .tp-popular-product-img-wrapper {
            aspect-ratio: 1/1;
          }
          
          .tp-btn.tp-btn-border.tp-btn-shop-all {
            padding: 14px 32px;
            font-size: 14px;
          }
          
          /* Hide navigation arrows on mobile */
          .tp-popular-nav-wrapper {
            display: none;
          }
          
          /* Instagram-style horizontal scroll */
          .tp-popular-products-slider-wrapper {
            padding: 20px 0 40px;
            margin: 0;
            overflow: visible;
          }
          
          .tp-popular-products-slider {
            overflow: visible !important;
            padding: 10px 15px !important;
          }
          
          .tp-popular-products-slider .swiper-wrapper {
            display: flex !important;
            flex-direction: row !important;
            width: auto !important;
          }
          
          .tp-popular-products-slider .swiper-slide {
            width: 280px !important;
            margin-right: 15px !important;
            padding: 0 !important;
            flex-shrink: 0;
          }
          
          .tp-popular-products-slider .swiper-slide:last-child {
            margin-right: 0 !important;
          }
        }

        @media (max-width: 576px) {
          .tp-section-title-2 {
            font-size: 24px;
          }
          
          .tp-popular-product-card {
            width: 260px; /* Slightly smaller on mobile */
          }
          
          .tp-popular-products-slider .swiper-slide {
            width: 260px !important;
            margin-right: 12px !important;
          }
          
          .tp-popular-product-title {
            font-size: 15px;
            min-height: 45px;
          }
          
          .tp-popular-product-view {
            font-size: 14px;
            padding: 8px 20px;
          }
          
          .tp-btn.tp-btn-popular {
            padding: 11px;
            font-size: 12px;
          }
          
          .tp-btn.tp-btn-border.tp-btn-shop-all {
            width: 100%;
            justify-content: center;
            padding: 14px 32px;
            font-size: 14px;
            border-radius: 30px;
          }
          
          .tp-popular-badge {
            top: 14px;
            left: 14px;
          }
          
          .tp-popular-badge-text {
            font-size: 10px;
            padding: 5px 10px;
          }
        }

        @media (max-width: 380px) {
          .tp-section-title-2 {
            font-size: 22px;
          }
          
          .tp-section-description {
            font-size: 14px;
          }
          
          .tp-popular-product-title {
            font-size: 14px;
          }
        }

        /* Dark Theme Support */
        .theme-dark .tp-popular-products-area {
          background: var(--tp-grey-1);
        }

        .theme-dark .tp-popular-product-card {
          background: var(--tp-common-white);
          border-color: var(--tp-grey-2);
        }

        .theme-dark .tp-popular-product-img {
          background: var(--tp-grey-5);
        }

        .theme-dark .tp-popular-product-overlay {
          background: linear-gradient(0deg, rgba(44, 76, 151, 0.85) 0%, rgba(44, 76, 151, 0.7) 50%, rgba(44, 76, 151, 0.3) 100%);
        }
      `}</style>
    </section>
  );
}