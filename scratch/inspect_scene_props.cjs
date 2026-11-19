const fs = require('fs');

const scenes = [
  { name: '01. AirplanePortalScene', file: 'src/features/destinations/components/AirplanePortal/AirplanePortalScene.jsx', prop: 'heroData' },
  { name: '02. FlyThroughScene', file: 'src/features/destinations/components/FlyThrough/FlyThroughScene.jsx', prop: 'introData' },
  { name: '03. ExperiencesSequence', file: 'src/features/destinations/components/ExperiencesSequence/ExperiencesCinematicSequence.jsx', prop: 'ecosystemData' },
  { name: '04. Accommodation3D', file: 'src/features/destinations/components/Accommodation3D/Accommodation3DScene.jsx', prop: 'accommodationData' },
  { name: '05. LocalGuideDocu', file: 'src/features/destinations/components/LocalGuideDocu/LocalGuideDocuScene.jsx', prop: 'guideData' },
  { name: '06. Flight3D', file: 'src/features/destinations/components/Flight3D/Flight3DScene.jsx', prop: 'flightData' },
  { name: '07. VehicleShowcase3D', file: 'src/features/destinations/components/VehicleShowcase3D/VehicleShowcase3D.jsx', prop: 'transportData' },
  { name: '08. Interactive3DMap', file: 'src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx', prop: 'attractionsData' },
  { name: '09. CulinaryFilm', file: 'src/features/destinations/components/CulinaryFilm/CulinaryFilmScene.jsx', prop: 'culinaryData' },
  { name: '10. TimeTransformation', file: 'src/features/destinations/components/TimeTransformation/TimeTransformationScene.jsx', prop: 'privateValuesData' },
  { name: '11. ItinerarySticky', file: 'src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx', prop: 'itinerariesData' },
  { name: '12. TripBuilderMorph', file: 'src/features/destinations/components/TripBuilderMorph/TripBuilderMorph.jsx', prop: 'destinationConfig' },
  { name: '13. CustomerStories', file: 'src/features/destinations/components/CustomerStories/CustomerStories.jsx', prop: 'storiesData' },
  { name: '14. CinematicEnding', file: 'src/features/destinations/components/CinematicEnding/CinematicEndingScene.jsx', prop: 'ctaData' }
];

scenes.forEach(s => {
  const content = fs.readFileSync(s.file, 'utf8');
  const regex = new RegExp(`${s.prop}\\??\\.[a-zA-Z0-9_]+`, 'g');
  const matches = [...new Set(content.match(regex) || [])];
  console.log(`\n=== ${s.name} (${s.prop}) ===`);
  console.log('Props accessed:', matches.join(', '));
});
