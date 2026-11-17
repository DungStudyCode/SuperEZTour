import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDestinationConfig } from './data/destinations.config';
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

  useEffect(() => {
    // Dynamic SEO Metadata
    const origTitle = document.title;
    const origLang = document.documentElement.lang;
    const isKorean = destination.locale === 'ko' || destination.id === 'da-nang';

    document.title = isKorean
      ? `${destination.nameKr || destination.name} — 럭셔리 프라이빗 맞춤 여행 | Super EZ Tour`
      : `${destination.name} — Immersive 3D Experience | Super EZ Tour - Tour Riêng 100%`;

    if (isKorean) {
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
      document.title = origTitle;
      document.documentElement.lang = origLang || 'vi';
    };
  }, [destination]);

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