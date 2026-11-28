import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '../../../../components/common/ErrorBoundary/ErrorBoundary';
import DestinationHeader from '../DestinationHeader/DestinationHeader';
import AirplanePortalScene from '../AirplanePortal/AirplanePortalScene';
import ExperiencesCinematicSequence from '../ExperiencesSequence/ExperiencesCinematicSequence';
import Accommodation3DScene from '../Accommodation3D/Accommodation3DScene';
import LocalGuideDocuScene from '../LocalGuideDocu/LocalGuideDocuScene';
import Flight3DScene from '../Flight3D/Flight3DScene';
import VehicleShowcase3D from '../VehicleShowcase3D/VehicleShowcase3D';
import Interactive3DMap from '../Interactive3DMap/Interactive3DMap';
import CulinaryFilmScene from '../CulinaryFilm/CulinaryFilmScene';
import TimeTransformationScene from '../TimeTransformation/TimeTransformationScene';
import ItineraryStickyTimeline from '../ItinerarySticky/ItineraryStickyTimeline';
import TripBuilderMorph from '../TripBuilderMorph/TripBuilderMorph';
import CustomerStories from '../CustomerStories/CustomerStories';
import CinematicEndingScene from '../CinematicEnding/CinematicEndingScene';
import DestinationFooter from '../DestinationFooter/DestinationFooter';

// Preload and isolate Three.js WebGL scene so `three` is downloaded only on Da Nang
const flyThroughPromise = import('../FlyThrough/FlyThroughScene');
const FlyThroughScene = lazy(() => flyThroughPromise);

const DaNangExperiencePage = ({ destination, onOpenConsultModal }) => {
  return (
    <div className={`dest-engine dest-engine-immersive dest-theme-${destination.id}`}>
      <DestinationHeader destination={destination} onOpenConsultModal={onOpenConsultModal} />

      <ErrorBoundary isolated>
        <AirplanePortalScene heroData={destination.hero} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <Suspense fallback={<section className="fly-through-scene" id="discover" style={{ minHeight: '100vh', background: '#061426' }} />}>
          <FlyThroughScene introData={destination.intro} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <ExperiencesCinematicSequence ecosystemData={destination.ecosystem} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <Accommodation3DScene accommodationData={destination.accommodation} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <LocalGuideDocuScene guideData={destination.localGuide} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <Flight3DScene flightData={destination.flights} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <VehicleShowcase3D transportData={destination.transportation} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <Interactive3DMap attractionsData={destination.attractions} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <CulinaryFilmScene culinaryData={destination.culinary} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <TimeTransformationScene privateValuesData={destination.privateValues} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <ItineraryStickyTimeline itinerariesData={destination.itineraries} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <TripBuilderMorph destinationConfig={destination} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <CustomerStories storiesData={destination.customerStories} />
      </ErrorBoundary>

      <ErrorBoundary isolated>
        <CinematicEndingScene ctaData={destination.finalCta} />
      </ErrorBoundary>

      <DestinationFooter destination={destination} />
    </div>
  );
};

export default DaNangExperiencePage;
