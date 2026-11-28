import React, { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VIETNAM_DESTINATIONS } from '../../data/vietnamDestinations';
import { useLanguage } from '../../context/LanguageContext';
import { useConsultation } from '../../context/ConsultationContext';
import { TripBuilderProvider } from './context/TripBuilderContext';
import { initSmoothScroll, destroySmoothScroll } from '../../utils/lenisManager';
import './styles/destination-theme.css';

gsap.registerPlugin(ScrollTrigger);

const HanoiExperiencePage = lazy(() => import('./components/Hanoi/HanoiExperiencePage'));
const DaNangExperiencePage = lazy(() => import('./components/DaNang/DaNangExperiencePage'));

function resolvePublishedDestinationKey(slug) {
  const normalized = (slug || '').toLowerCase().trim();
  if (normalized === 'ha-noi' || normalized === 'hanoi' || normalized === 'vietnam-hanoi') {
    return 'ha-noi';
  }
  if (normalized === 'da-nang' || normalized === 'danang' || normalized === 'vietnam-danang') {
    return 'da-nang';
  }
  return null;
}

const DestinationPage = ({ slugProp }) => {
  const { slug: routeSlug } = useParams();
  const slug = slugProp || routeSlug || 'da-nang';
  const publishedKey = resolvePublishedDestinationKey(slug);
  const { language, isKorean } = useLanguage();
  const { openNewConsultation } = useConsultation();

  const [configLoader, setConfigLoader] = useState(null);

  // Dynamically load ONLY the active destination's configuration module
  useEffect(() => {
    let cancelled = false;
    if (!publishedKey) {
      setConfigLoader(null);
      return undefined;
    }

    const load = publishedKey === 'ha-noi'
      ? import('./data/ha-noi.config.js').then((m) => ({ key: 'ha-noi', getConfig: m.getLocalizedHaNoiConfig }))
      : import('./data/da-nang.config.js').then((m) => ({ key: 'da-nang', getConfig: m.getLocalizedDaNangConfig }));

    load.then((entry) => {
      if (!cancelled) {
        setConfigLoader(entry);
        requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [publishedKey]);

  // Synchronous localization lookup on language toggle — zero remount, zero scroll reset
  const destination = useMemo(() => {
    if (!publishedKey || !configLoader || configLoader.key !== publishedKey) return null;
    return configLoader.getConfig(language);
  }, [publishedKey, configLoader, language]);

  const isLoadingPublished = Boolean(publishedKey && (!configLoader || configLoader.key !== publishedKey));
  const destinationMeta = VIETNAM_DESTINATIONS.find((d) => d.id === (publishedKey || slug)) || null;

  // 1. ROUTE LIFECYCLE: Mount, Unmount & Destination navigation ([slug])
  useEffect(() => {
    window.scrollTo(0, 0);
    initSmoothScroll();

    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      destroySmoothScroll();
    };
  }, [slug]);

  // 2. LANGUAGE & SEO METADATA LIFECYCLE
  useEffect(() => {
    const origTitle = document.title;
    const origLang = document.documentElement.lang;

    if (!destination) {
      const destTitle = isKorean
        ? destinationMeta?.nameKr || slug
        : destinationMeta?.nameVi || slug;
      document.title = `${destTitle} — Super EZ Tour | Tour Riêng 100%`;
      document.documentElement.lang = isKorean ? 'ko' : 'vi';
      return () => {
        document.title = origTitle;
        document.documentElement.lang = origLang || 'ko';
      };
    }

    const destTitle = isKorean
      ? destination.nameKr || destination.name
      : destination.name || destination.nameVi || destination.nameKr;

    document.title = isKorean
      ? `${destTitle} — 럭셔리 프라이빗 맞춤 여행 | Super EZ Tour`
      : `${destTitle} — Trải nghiệm Độc Bản 3D | Super EZ Tour - Tour Riêng 100%`;

    document.documentElement.lang = isKorean ? 'ko' : 'vi';

    return () => {
      document.title = origTitle;
      document.documentElement.lang = origLang || 'ko';
    };
  }, [destination, isKorean, destinationMeta, slug]);

  // 3. LAYOUT-AWARE SCROLLTRIGGER REFRESH (Handles DOM text expansion on KO <-> VI toggle)
  useEffect(() => {
    if (!destination) return undefined;
    let isCancelled = false;
    let rafId1 = null;
    let rafId2 = null;

    const performRefresh = () => {
      if (isCancelled) return;
      rafId1 = requestAnimationFrame(() => {
        if (isCancelled) return;
        rafId2 = requestAnimationFrame(() => {
          if (isCancelled) return;
          ScrollTrigger.refresh();
        });
      });
    };

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (!isCancelled) performRefresh();
        })
        .catch(() => {
          if (!isCancelled) performRefresh();
        });
    } else {
      performRefresh();
    }

    return () => {
      isCancelled = true;
      if (rafId1) cancelAnimationFrame(rafId1);
      if (rafId2) cancelAnimationFrame(rafId2);
    };
  }, [language, destination]);

  if (isLoadingPublished) {
    return <div style={{ minHeight: '100vh', background: '#0c1117' }} aria-busy="true" />;
  }

  if (!destination) {
    const destName = isKorean
      ? destinationMeta?.nameKr || slug
      : destinationMeta?.nameVi || slug;
    const regionName = isKorean
      ? destinationMeta?.regionKr || ''
      : destinationMeta?.regionVi || '';

    return (
      <div className="dest-coming-soon-wrapper">
        <div className="dest-coming-soon-card">
          <span className="dest-coming-soon-kicker">
            SUPER EZ TOUR {regionName ? `· ${regionName}` : ''}
          </span>
          <h1 className="dest-coming-soon-title">{destName}</h1>
          <p className="dest-coming-soon-lead">
            {isKorean
              ? `${destName} 3D 인터랙티브 가상 체험 페이지가 곧 공개됩니다.`
              : `Trải nghiệm tương tác 3D ${destName} đang được hoàn thiện và sẽ sớm ra mắt.`}
          </p>
          <p className="dest-coming-soon-desc">
            {isKorean
              ? '슈퍼이지투어는 100% 프라이빗 맞춤 여행 전문 여행사입니다. 지금 1:1 전담 컨시어지와 맞춤 일정을 설계해보세요.'
              : 'Super EZ Tour chuyên thiết kế tour riêng 100% theo yêu cầu. Quý khách có thể nhận tư vấn và thiết kế lịch trình riêng ngay hôm nay.'}
          </p>
          <div className="dest-coming-soon-actions">
            <button
              type="button"
              className="dest-coming-soon-btn primary"
              onClick={() =>
                openNewConsultation({
                  source: 'destination-page',
                  destinationId: destinationMeta?.id || slug,
                })
              }
            >
              {isKorean ? '1:1 맞춤 여행 무료 상담' : 'Nhận tư vấn hành trình riêng'}
            </button>
            <Link to="/" className="dest-coming-soon-btn secondary">
              {isKorean ? '홈으로 돌아가기' : 'Về trang chủ'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TripBuilderProvider destinationConfig={destination}>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0c1117' }} aria-busy="true" />}>
        {destination.id === 'ha-noi' ? (
          <HanoiExperiencePage destination={destination} onOpenConsultModal={openNewConsultation} />
        ) : (
          <DaNangExperiencePage destination={destination} onOpenConsultModal={openNewConsultation} />
        )}
      </Suspense>
    </TripBuilderProvider>
  );
};

export default DestinationPage;
