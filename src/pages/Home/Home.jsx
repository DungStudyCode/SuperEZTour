import React from 'react';
import HeroBanner from './sections/HeroBanner/HeroBanner';
import DestinationNavigation from './sections/DestinationNavigation/DestinationNavigation';
import SignatureJourneys from './sections/SignatureJourneys/SignatureJourneys';
import TravelThemes from './sections/TravelThemes/TravelThemes';
import WhyChooseUs from './sections/WhyChooseUs/WhyChooseUs';
import TravelReviews from './sections/TravelReviews/TravelReviews';
import QuickQuote from './sections/QuickQuote/QuickQuote';
import './Home.css';

const Home = ({ quotes, onOpenQuoteModal, onSelectDestination }) => {
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

      {/* 05. Premium Travel Services (4 Pillars) & Why Super EZ Tour (Comparison Matrix) */}
      <WhyChooseUs onOpenQuoteModal={onOpenQuoteModal} />

      {/* 06. Verified Customer Testimonials & Reviews */}
      <TravelReviews />

      {/* 07. Real-Time 1:1 Consultation & 30-Minute Rapid Quotation */}
      <QuickQuote
        quotes={quotes}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </main>
  );
};

export default Home;
