import React from 'react';
import ErrorBoundary from '../../../../components/common/ErrorBoundary/ErrorBoundary';
import DestinationHeader from '../DestinationHeader/DestinationHeader';
import HanoiAwakeningHero from './HanoiAwakeningHero/HanoiAwakeningHero';
import HanoiOldQuarterWalk from './HanoiOldQuarterWalk/HanoiOldQuarterWalk';
import HanoiHeritageChamber from './HanoiHeritageChamber/HanoiHeritageChamber';
import HanoiTaste3D from './HanoiTaste3D/HanoiTaste3D';
import HanoiSeasons3D from './HanoiSeasons3D/HanoiSeasons3D';
import Interactive3DMap from '../Interactive3DMap/Interactive3DMap';
import HanoiYourStory from './HanoiYourStory/HanoiYourStory';
import ItineraryStickyTimeline from '../ItinerarySticky/ItineraryStickyTimeline';
import TripBuilderMorph from '../TripBuilderMorph/TripBuilderMorph';
import CustomerStories from '../CustomerStories/CustomerStories';
import CinematicEndingScene from '../CinematicEnding/CinematicEndingScene';
import DestinationFooter from '../DestinationFooter/DestinationFooter';

/**
 * Super EZ Tour — HANOI: A LIVING MEMORY
 * Master Immersive 3D Cultural Journey for Hanoi (Production Experience)
 */
const HanoiExperiencePage = ({ destination, onAddQuote, onOpenConsultModal }) => {
  return (
    <div className="hanoi-experience-wrapper dest-theme-ha-noi">
      {/* Persistent Smart Destination Header */}
      <DestinationHeader destination={destination} onOpenConsultModal={onOpenConsultModal} />

      {/* SCENE 01 — THE AWAKENING OF HANOI (Production Hero Experience) */}
      <ErrorBoundary isolated>
        <HanoiAwakeningHero heroData={destination.hero} />
      </ErrorBoundary>

      {/* SCENE 02 — WALK THROUGH THE OLD QUARTER (Interactive 3D Street Experience) */}
      <ErrorBoundary isolated>
        <HanoiOldQuarterWalk />
      </ErrorBoundary>

      {/* SCENE 03 — THE HERITAGE CHAMBER (Văn Miếu 3D Architectural Pavilion) */}
      <ErrorBoundary isolated>
        <HanoiHeritageChamber />
      </ErrorBoundary>

      {/* SCENE 04 — THE TASTE OF HANOI (3D Café Salon & Egg Coffee Steam) */}
      <ErrorBoundary isolated>
        <HanoiTaste3D />
      </ErrorBoundary>

      {/* SCENE 05 — HANOI THROUGH THE SEASONS (Interactive Environmental Transformation) */}
      <ErrorBoundary isolated>
        <HanoiSeasons3D />
      </ErrorBoundary>

      {/* SCENE 06 — HANOI INTERACTIVE ATLAS (MapLibre 3D Discovery Engine) */}
      <ErrorBoundary isolated>
        <Interactive3DMap attractionsData={destination.attractions} />
      </ErrorBoundary>

      {/* SCENE 07 — YOUR HANOI, YOUR STORY (Personalized Private Travel Pillars) */}
      <ErrorBoundary isolated>
        <HanoiYourStory />
      </ErrorBoundary>

      {/* SCENE 08 — SIGNATURE HANOI ITINERARY (3D2N / 2박 3일 Synchronized Timeline) */}
      <ErrorBoundary isolated>
        <ItineraryStickyTimeline itinerariesData={destination.itineraries} />
      </ErrorBoundary>

      {/* SCENE 09 — TRIP BUILDER MORPHING ENGINE (7-Step Bespoke Customizer) */}
      <ErrorBoundary isolated>
        <TripBuilderMorph onAddQuote={onAddQuote} destinationConfig={destination} />
      </ErrorBoundary>

      {/* SCENE 10 — CUSTOMER STORIES (Authentic Traveler Journals) */}
      <ErrorBoundary isolated>
        <CustomerStories storiesData={destination.customerStories} />
      </ErrorBoundary>

      {/* SCENE 11 — CINEMATIC ENDING (Sunset Hoan Kiem Pullback & QuoteModal CTA) */}
      <ErrorBoundary isolated>
        <CinematicEndingScene ctaData={destination.finalCta} />
      </ErrorBoundary>

      {/* Destination Footer */}
      <DestinationFooter destination={destination} />
    </div>
  );
};

export default HanoiExperiencePage;
