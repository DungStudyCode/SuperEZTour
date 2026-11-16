import React, { useState } from 'react';
import HeroBanner from './sections/HeroBanner/HeroBanner';
import DestinationNavigation from './sections/DestinationNavigation/DestinationNavigation';
import WhyChooseUs from './sections/WhyChooseUs/WhyChooseUs';
import DestinationMap from './sections/DestinationMap/DestinationMap';
import TravelThemes from './sections/TravelThemes/TravelThemes';
import TravelReviews from './sections/TravelReviews/TravelReviews';
import QuickQuote from './sections/QuickQuote/QuickQuote';
import TravelVideos from './sections/TravelVideos/TravelVideos';
import TravelCommunity from './sections/TravelCommunity/TravelCommunity';
import InstagramGallery from './sections/InstagramGallery/InstagramGallery';
import './Home.css';

const Home = ({ quotes, onOpenQuoteModal, onSelectDestination }) => {
  return (
    <main className="home-page-main">
      {/* 5.2 Hero Banner */}
      <HeroBanner onOpenQuoteModal={onOpenQuoteModal} />

      {/* 5.3 Destination Navigation (6 countries, 16 destinations) */}
      <DestinationNavigation
        onOpenQuoteModal={onOpenQuoteModal}
        onSelectDestination={onSelectDestination}
      />

      {/* 5.10 Why Choose Us (3 Core Values) */}
      <WhyChooseUs onOpenQuoteModal={onOpenQuoteModal} />

      {/* 5.6 Interactive Destination Map (16 markers & branch stats) */}
      <DestinationMap
        onOpenQuoteModal={onOpenQuoteModal}
        onSelectDestination={onSelectDestination}
      />

      {/* 5.9 Travel Themes (5 travel themes) */}
      <TravelThemes onOpenQuoteModal={onOpenQuoteModal} />

      {/* 5.4 Travel Reviews (50,000+ verified customer reviews) */}
      <TravelReviews />

      {/* 5.7 Quick Quote & Consultation (Live status board) */}
      <QuickQuote
        quotes={quotes}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 5.8 Travel Videos (Video showcase & modal) */}
      <TravelVideos />

      {/* 5.5 Travel Community (3 board categories) */}
      <TravelCommunity />

      {/* 5.11 Instagram Gallery (8 curated photos & lightbox) */}
      <InstagramGallery />
    </main>
  );
};

export default Home;
