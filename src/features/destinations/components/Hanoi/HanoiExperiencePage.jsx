import React from 'react';
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
 * Master Immersive 3D Cultural Journey for Hanoi
 */
const HanoiExperiencePage = ({ destination, onAddQuote, onOpenConsultModal }) => {
  return (
    <div className="hanoi-experience-wrapper dest-theme-ha-noi">
      {/* Persistent Smart Destination Header */}
      <DestinationHeader destination={destination} onOpenConsultModal={onOpenConsultModal} />

      {/* SCENE 01 — THE AWAKENING OF HANOI (Hồ Gươm 3D Cinematic Opening) */}
      <HanoiAwakeningHero heroData={destination.hero} />

      {/* SCENE 02 — WALK THROUGH THE OLD QUARTER (Interactive 3D Street Experience) */}
      <HanoiOldQuarterWalk />

      {/* SCENE 03 — THE HERITAGE CHAMBER (Văn Miếu 3D Architectural Pavilion) */}
      <HanoiHeritageChamber />

      {/* SCENE 04 — THE TASTE OF HANOI (3D Café Salon & Egg Coffee Steam) */}
      <HanoiTaste3D />

      {/* SCENE 05 — HANOI THROUGH THE SEASONS (Interactive Environmental Transformation) */}
      <HanoiSeasons3D />

      {/* SCENE 06 — HANOI INTERACTIVE ATLAS (MapLibre 3D Discovery Engine) */}
      <Interactive3DMap attractionsData={destination.attractions} />

      {/* SCENE 07 — YOUR HANOI, YOUR STORY (Personalized Private Travel Pillars) */}
      <HanoiYourStory />

      {/* SCENE 08 — SIGNATURE HANOI ITINERARY (3D2N / 2박 3일 Synchronized Timeline) */}
      <ItineraryStickyTimeline itinerariesData={destination.itineraries} />

      {/* SCENE 09 — TRIP BUILDER MORPHING ENGINE (7-Step Bespoke Customizer) */}
      <TripBuilderMorph onAddQuote={onAddQuote} destinationConfig={destination} />

      {/* SCENE 10 — CUSTOMER STORIES (Authentic Traveler Journals) */}
      <CustomerStories storiesData={destination.customerStories} />

      {/* SCENE 11 — CINEMATIC ENDING (Sunset Hoan Kiem Pullback & QuoteModal CTA) */}
      <CinematicEndingScene ctaData={destination.finalCta} />

      {/* Destination Footer */}
      <DestinationFooter destination={destination} />
    </div>
  );
};

export default HanoiExperiencePage;
