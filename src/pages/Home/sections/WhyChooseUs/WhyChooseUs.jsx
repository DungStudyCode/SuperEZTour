import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './WhyChooseUs.css';

// Register ScrollTrigger once if available
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 4 Core Comparison Criteria (Bilingual)
 * Objective, high-end editorial criteria contrasting standard group tours with private journeys.
 */
const COMPARISON_CRITERIA = [
  {
    id: 'itinerary',
    num: '01',
    categoryVi: '01 / Lịch trình',
    categoryKr: '01 / 여행 일정',
    standardVi: 'Theo chương trình chung của đoàn.',
    standardKr: '정해진 단체 일정에 따라 이동',
    privateVi: 'Thiết kế theo sở thích và thời gian của bạn.',
    privateKr: '취향과 일정에 맞춘 맞춤 여행',
  },
  {
    id: 'transport',
    num: '02',
    categoryVi: '02 / Không gian di chuyển',
    categoryKr: '02 / 이동 및 차량',
    standardVi: 'Di chuyển cùng những khách khác.',
    standardKr: '다른 여행객과 차량 공동 이용',
    privateVi: 'Phương tiện dành riêng cho nhóm của bạn.',
    privateKr: '우리 일행만을 위한 전용 차량',
  },
  {
    id: 'experiences',
    num: '03',
    categoryVi: '03 / Trải nghiệm & Hoạt động',
    categoryKr: '03 / 여행 경험',
    standardVi: 'Các hoạt động theo lịch trình có sẵn.',
    standardKr: '정해진 프로그램 중심의 체험',
    privateVi: 'Lựa chọn trải nghiệm phù hợp với nhóm.',
    privateKr: '우리 일행의 관심사에 맞춘 체험',
  },
  {
    id: 'guide',
    num: '04',
    categoryVi: '04 / Hướng dẫn & Đồng hành',
    categoryKr: '04 / 전담 가이드 및 케어',
    standardVi: 'Hướng dẫn viên phục vụ cả đoàn.',
    standardKr: '전체 단체를 담당하는 가이드',
    privateVi: 'Hướng dẫn viên đồng hành cùng nhóm riêng.',
    privateKr: '우리 일행을 위한 전담 가이드',
  },
];

/**
 * Super EZ Tour — Luxury Split Comparison
 * "THE FREEDOM TO TRAVEL — TWO WAYS TO TRAVEL"
 * High-end Korean Travel Editorial Concept
 */
const WhyChooseUs = ({ onOpenQuoteModal }) => {
  const { t, isKorean } = useLanguage();
  const sectionRef = useRef(null);

  // Signature Reveal Animation with GSAP
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    let ctx;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        // 1. Header fade + light translateY
        tl.from('.comparison-header-anim', {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: 'power2.out',
        })
        // 2. Center divider reveal from top down
        .from('.split-center-divider, .row-center-divider', {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.65,
          ease: 'power2.out',
        }, '-=0.35')
        // 3. Staggered reveal of comparison rows
        .from('.split-criterion-row', {
          opacity: 0,
          y: 12,
          duration: 0.48,
          stagger: 0.08,
          ease: 'power2.out',
        }, '-=0.4')
        // 4. Editorial footer quote and CTA
        .from('.comparison-footer-anim', {
          opacity: 0,
          y: 14,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.2');
      }, sectionRef);
    } catch (err) {
      console.warn('WhyChooseUs GSAP animation warning:', err);
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') {
        ctx.revert();
      }
    };
  }, []);

  const handleCtaClick = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal({ source: 'why-choose-us' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="editorial-comparison-section"
      aria-label="The Freedom to Travel - Comparison"
    >
      <div className="comparison-container">
        {/* =========================================================
            01. SECTION HEADER: Editorial Luxury Typography
        ========================================================= */}
        <header className="comparison-editorial-header comparison-header-anim">
          <span className="comparison-eyebrow">
            <Sparkles size={12} className="eyebrow-icon" />
            <span>{t('home.whyUs.eyebrow', 'THE FREEDOM TO TRAVEL')}</span>
          </span>

          <h2 className={`comparison-main-heading ${isKorean ? 'is-korean' : ''}`}>
            {t(
              'home.whyUs.heading',
              isKorean ? '여행의 방식도, 당신답게.' : 'Du lịch theo cách của riêng bạn.'
            )}
          </h2>

          <p className="comparison-lead-desc">
            {t(
              'home.whyUs.subtitle',
              isKorean
                ? '모든 여행에는 저마다의 리듬이 있습니다. 단체여행과 나만을 위한 프라이빗 여행의 차이를 살펴보세요.'
                : 'Mỗi chuyến đi đều có một nhịp riêng. Khám phá sự khác biệt giữa hành trình theo đoàn và trải nghiệm được thiết kế dành riêng cho bạn.'
            )}
          </p>
        </header>

        {/* =========================================================
            02. LUXURY SPLIT COMPARISON CONTAINER
        ========================================================= */}
        <div className="luxury-split-frame">
          {/* Top Column Headers */}
          <div className="split-frame-header">
            {/* Left Header: Standard Journey */}
            <div className="split-header-col standard-header">
              <span className="header-kicker">
                {t('home.whyUs.colStandardKicker', 'STANDARD JOURNEY')}
              </span>
              <h3 className="header-title">
                {t('home.whyUs.colStandardTitle', isKorean ? '일반 단체 패키지' : 'Tour ghép truyền thống')}
              </h3>
              <p className="header-subtitle">
                {t('home.whyUs.colStandardDesc', isKorean ? '정해진 단체 일정 중심' : 'Hành trình chung theo đoàn')}
              </p>
            </div>

            {/* Central Vertical Hairline Divider */}
            <div className="split-center-divider" aria-hidden="true" />

            {/* Right Header: Super EZ Tour */}
            <div className="split-header-col superez-header">
              <div className="header-badge-row">
                <span className="header-kicker-gold">
                  <Sparkles size={11} className="kicker-sparkle" />
                  <span>{t('home.whyUs.colSuperEzKicker', 'SUPER EZ TOUR')}</span>
                </span>
                <span className="header-private-tag">100% PRIVATE</span>
              </div>
              <h3 className="header-title">
                {t('home.whyUs.colSuperEzTitle', isKorean ? '100% 프라이빗 투어' : 'Hành trình riêng tư')}
              </h3>
              <p className="header-subtitle">
                {t('home.whyUs.colSuperEzDesc', isKorean ? '오직 우리만을 위한 맞춤 여행' : 'Thiết kế riêng cho bạn')}
              </p>
            </div>
          </div>

          {/* 4 Core Comparison Criteria Rows */}
          <div className="split-rows-container" role="list">
            {COMPARISON_CRITERIA.map((criterion, index) => {
              const categoryLabel = isKorean
                ? t(`home.whyUs.criteria.${criterion.id}.categoryLabel`, criterion.categoryKr)
                : t(`home.whyUs.criteria.${criterion.id}.categoryLabel`, criterion.categoryVi);

              const standardText = isKorean
                ? t(`home.whyUs.criteria.${criterion.id}.standard`, criterion.standardKr)
                : t(`home.whyUs.criteria.${criterion.id}.standard`, criterion.standardVi);

              const privateText = isKorean
                ? t(`home.whyUs.criteria.${criterion.id}.private`, criterion.privateKr)
                : t(`home.whyUs.criteria.${criterion.id}.private`, criterion.privateVi);

              return (
                <div
                  key={criterion.id}
                  className="split-criterion-row"
                  role="listitem"
                  data-row={index}
                >
                  {/* Category Indicator Tag */}
                  <div className="row-category-bar">
                    <span className="row-category-label">{categoryLabel}</span>
                  </div>

                  {/* 2-Column Split Content */}
                  <div className="row-content-grid">
                    {/* Left Side: Standard Group Tour */}
                    <div className="row-cell standard-cell">
                      <span className="mobile-party-label">
                        {t('home.whyUs.colStandardTitle', isKorean ? '일반 단체 패키지' : 'TOUR GHÉP')}
                      </span>
                      <p className="criterion-text standard-text">{standardText}</p>
                    </div>

                    {/* Central Vertical Hairline Divider Continuation */}
                    <div className="row-center-divider" aria-hidden="true" />

                    {/* Right Side: Super EZ Tour Private Journey */}
                    <div className="row-cell superez-cell">
                      <span className="mobile-party-label superez">
                        {t('home.whyUs.colSuperEzTitle', isKorean ? 'SUPER EZ TOUR' : 'TOUR RIÊNG')}
                      </span>
                      <p className="criterion-text superez-text">{privateText}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            03. EDITORIAL FOOTER: Emotional Closing Statement
        ========================================================= */}
        <div className="comparison-editorial-footer comparison-footer-anim">
          <p className={`editorial-closing-quote ${isKorean ? 'is-korean' : ''}`}>
            “{t(
              'home.whyUs.editorialFooter',
              isKorean
                ? '모두를 위한 하나의 일정이 아닌, 오직 당신을 위한 여행.'
                : 'Không phải một hành trình dành cho tất cả. Mà là một hành trình dành cho bạn.'
            )}”
          </p>
        </div>

        {/* =========================================================
            04. CONSULTATION CTA: Single Clear Action
        ========================================================= */}
        <div className="comparison-cta-wrap comparison-footer-anim">
          <button
            type="button"
            className="comparison-primary-cta"
            onClick={handleCtaClick}
            aria-label={t(
              'home.whyUs.ctaBtn',
              isKorean ? '나만의 여행 설계하기' : 'Thiết kế hành trình riêng'
            )}
          >
            <span>
              {t(
                'home.whyUs.ctaBtn',
                isKorean ? '나만의 여행 설계하기' : 'Thiết kế hành trình riêng'
              )}
            </span>
            <ArrowRight size={16} className="cta-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
