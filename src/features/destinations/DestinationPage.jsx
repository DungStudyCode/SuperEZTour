import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDestinationConfig } from './data/destinations.config';
import { VIETNAM_DESTINATIONS } from '../../data/vietnamDestinations';
import { useLanguage } from '../../context/LanguageContext';
import { useConsultation } from '../../context/ConsultationContext';
import { TripBuilderProvider } from './context/TripBuilderContext';
import { initSmoothScroll, destroySmoothScroll } from './motion/LenisManager';
import './styles/destination-theme.css';

// Upgraded Immersive 3D Cinematic Scenes
import DestinationHeader from './components/DestinationHeader/DestinationHeader';
import AirplanePortalScene from './components/AirplanePortal/AirplanePortalScene';
import FlyThroughScene from './components/FlyThrough/FlyThroughScene';
import ExperiencesCinematicSequence from './components/ExperiencesSequence/ExperiencesCinematicSequence';
import Accommodation3DScene from './components/Accommodation3D/Accommodation3DScene';
import LocalGuideDocuScene from './components/LocalGuideDocu/LocalGuideDocuScene';
import Flight3DScene from './components/Flight3D/Flight3DScene';
import VehicleShowcase3D from './components/VehicleShowcase3D/VehicleShowcase3D';
import Interactive3DMap from './components/Interactive3DMap/Interactive3DMap';
import CulinaryFilmScene from './components/CulinaryFilm/CulinaryFilmScene';
import TimeTransformationScene from './components/TimeTransformation/TimeTransformationScene';
import ItineraryStickyTimeline from './components/ItinerarySticky/ItineraryStickyTimeline';
import TripBuilderMorph from './components/TripBuilderMorph/TripBuilderMorph';
import CustomerStories from './components/CustomerStories/CustomerStories';
import CinematicEndingScene from './components/CinematicEnding/CinematicEndingScene';
import DestinationFooter from './components/DestinationFooter/DestinationFooter';

gsap.registerPlugin(ScrollTrigger);

const DestinationPage = ({ onAddQuote, slugProp }) => {
  const { slug: routeSlug } = useParams();
  const slug = slugProp || routeSlug || 'da-nang';
  const destination = getDestinationConfig(slug);
  const destinationMeta = VIETNAM_DESTINATIONS.find((d) => d.id === slug) || null;
  const { isKorean } = useLanguage();
  const { openNewConsultation } = useConsultation();

  useEffect(() => {
    // Dynamic SEO Metadata
    const origTitle = document.title;
    const origLang = document.documentElement.lang;

    if (!destination) {
      const destTitle = isKorean
        ? destinationMeta?.nameKr || slug
        : destinationMeta?.nameVi || slug;
      document.title = `${destTitle} — Super EZ Tour | Tour Riêng 100%`;
      window.scrollTo(0, 0);
      return () => {
        document.title = origTitle;
        document.documentElement.lang = origLang || 'vi';
      };
    }

    const isKoreanDestination = destination.locale === 'ko' || destination.id === 'da-nang';

    document.title = isKoreanDestination
      ? `${destination.nameKr || destination.name} — 럭셔리 프라이빗 맞춤 여행 | Super EZ Tour`
      : `${destination.name} — Immersive 3D Experience | Super EZ Tour - Tour Riêng 100%`;

    if (isKoreanDestination) {
      document.documentElement.lang = 'ko';
    }

    // Initialize Lenis Smooth Scroll synchronized with GSAP ScrollTrigger
    const lenis = initSmoothScroll();

    // Scroll to top upon landing & refresh ScrollTrigger
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      destroySmoothScroll();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      document.title = origTitle;
      document.documentElement.lang = origLang || 'vi';
    };
  }, [destination, isKorean, destinationMeta, slug]);

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
      <div className="dest-engine dest-engine-immersive">
        {/* Persistent Smart Navigation Header */}
        <DestinationHeader destination={destination} />

        {/* Scene 01: Airplane Cabin Oval Window Portal */}
        <AirplanePortalScene heroData={destination.hero} />

        {/* Scene 02: Multi-Plane Fly Through Da Nang */}
        <FlyThroughScene introData={destination.intro} />

        {/* Scene 03: Six Travel Experiences Cinematic Sequence */}
        <ExperiencesCinematicSequence ecosystemData={destination.ecosystem} />

        {/* Scene 04: Luxury Accommodation 3D Architectural Scene */}
        <Accommodation3DScene accommodationData={destination.accommodation} />

        {/* Scene 05: Local Guide Travel Documentary Scene */}
        <LocalGuideDocuScene guideData={destination.localGuide} />

        {/* Scene 06: Flight Aviation 3D Curved Trajectory Scene */}
        <Flight3DScene flightData={destination.flights} />

        {/* Scene 07: Automotive Showroom 3D Vehicle Turntable */}
        <VehicleShowcase3D transportData={destination.transportation} />

        {/* Scene 08: Interactive 3D Destination Map & Cart */}
        <Interactive3DMap attractionsData={destination.attractions} />

        {/* Scene 09: Culinary Macro Film Experience */}
        <CulinaryFilmScene culinaryData={destination.culinary} />

        {/* Scene 10: 24h Time Transformation (Dawn to Night) & Private Tour Philosophy */}
        <TimeTransformationScene privateValuesData={destination.privateValues} />

        {/* Scene 11: Interactive Itinerary Chapter Timeline */}
        <ItineraryStickyTimeline itinerariesData={destination.itineraries} />

        {/* Scene 12: Trip Builder Morphing Engine (7-Step Wizard & Sticky Summary) */}
        <TripBuilderMorph onAddQuote={onAddQuote} destinationConfig={destination} />

        {/* Scene 13: Customer Stories Travel Journal */}
        <CustomerStories storiesData={destination.customerStories} />

        {/* Scene 14: Cinematic Pullback Ending (Da Nang Is Calling) */}
        <CinematicEndingScene ctaData={destination.finalCta} />

        {/* Destination Footer */}
        <DestinationFooter destination={destination} />
      </div>
    </TripBuilderProvider>
  );
};

export default DestinationPage;