const fs = require('fs');

const sceneFiles = [
  'src/features/destinations/components/AirplanePortal/AirplanePortalScene.jsx',
  'src/features/destinations/components/FlyThrough/FlyThroughScene.jsx',
  'src/features/destinations/components/ExperiencesSequence/ExperiencesCinematicSequence.jsx',
  'src/features/destinations/components/Accommodation3D/Accommodation3DScene.jsx',
  'src/features/destinations/components/LocalGuideDocu/LocalGuideDocuScene.jsx',
  'src/features/destinations/components/Flight3D/Flight3DScene.jsx',
  'src/features/destinations/components/VehicleShowcase3D/VehicleShowcase3D.jsx',
  'src/features/destinations/components/Interactive3DMap/Interactive3DMap.jsx',
  'src/features/destinations/components/CulinaryFilm/CulinaryFilmScene.jsx',
  'src/features/destinations/components/TimeTransformation/TimeTransformationScene.jsx',
  'src/features/destinations/components/ItinerarySticky/ItineraryStickyTimeline.jsx',
  'src/features/destinations/components/TripBuilderMorph/TripBuilderMorph.jsx',
  'src/features/destinations/components/CustomerStories/CustomerStories.jsx',
  'src/features/destinations/components/CinematicEnding/CinematicEndingScene.jsx'
];

console.log('--- Scanning Da Nang Scene Components for Hangul & i18n ---');
sceneFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`FILE NOT FOUND: ${file}`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const hangulLines = [];
  lines.forEach((line, idx) => {
    if (/[\uac00-\ud7af]/.test(line)) {
      hangulLines.push({ line: idx + 1, text: line.trim() });
    }
  });

  const hasUseLanguage = content.includes('useLanguage');
  const hasIsKorean = content.includes('isKorean');

  console.log(`\n[${file}]`);
  console.log(`  - useLanguage: ${hasUseLanguage ? 'YES' : 'NO'}`);
  console.log(`  - isKorean logic: ${hasIsKorean ? 'YES' : 'NO'}`);
  console.log(`  - Hangul lines count: ${hangulLines.length}`);
  if (hangulLines.length > 0 && hangulLines.length <= 10) {
    hangulLines.forEach(h => console.log(`    L${h.line}: ${h.text.slice(0, 80)}`));
  } else if (hangulLines.length > 10) {
    console.log(`    (Sample first 5 lines):`);
    hangulLines.slice(0, 5).forEach(h => console.log(`    L${h.line}: ${h.text.slice(0, 80)}`));
    console.log(`    (Sample last 5 lines):`);
    hangulLines.slice(-5).forEach(h => console.log(`    L${h.line}: ${h.text.slice(0, 80)}`));
  }
});
