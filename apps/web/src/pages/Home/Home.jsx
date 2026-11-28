import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroBanner from './sections/HeroBanner/HeroBanner';
import DestinationNavigation from './sections/DestinationNavigation/DestinationNavigation';
import SignatureJourneys from './sections/SignatureJourneys/SignatureJourneys';
import TravelThemes from './sections/TravelThemes/TravelThemes';
import PremiumServices from './sections/PremiumServices/PremiumServices';
import WhyChooseUs from './sections/WhyChooseUs/WhyChooseUs';
import TravelReviews from './sections/TravelReviews/TravelReviews';
import './Home.css';

const Home = ({ onOpenQuoteModal, onSelectDestination }) => {
  const location = useLocation();

  // Handle cross-page deep linking with hash (e.g. /#destinations)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  return (
    <main className="home-page-main">
      {/* 01. Cinematic Hero with Instant Destination Search */}
      <HeroBanner onOpenQuoteModal={onOpenQuoteModal} />

      {/* 02. Destination Discovery & Explore by Region (All 10 Vietnam Destinations) */}
      <DestinationNavigation
        onOpenQuoteModal={onOpenQuoteModal}
        onSelectDestination={onSelectDestination}
      />

      {/* 03. Signature Private Journeys (BOBTOUR & Guideman Curated Itineraries) */}
      <SignatureJourneys onOpenQuoteModal={onOpenQuoteModal} />

      {/* 04. Travel by Theme (8 Curated Luxury Themes) */}
      <TravelThemes onOpenQuoteModal={onOpenQuoteModal} />

      {/* 05. The Art of Private Travel — Premium Services Editorial Experience */}
      <PremiumServices onOpenQuoteModal={onOpenQuoteModal} />

      {/* 06. Why Super EZ Tour (BOBTOUR & Guideman Value Comparison Matrix) */}
      <WhyChooseUs onOpenQuoteModal={onOpenQuoteModal} />

      {/* 07. Traveler Stories & Authentic Customer Reviews */}
      <TravelReviews onOpenQuoteModal={onOpenQuoteModal} />
    </main>
  );
};

export default Home;
