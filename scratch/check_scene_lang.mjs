import fs from 'fs';

const scenes = [
  'AirplanePortal/AirplanePortalScene.jsx',
  'FlyThrough/FlyThroughScene.jsx',
  'ExperiencesSequence/ExperiencesCinematicSequence.jsx',
  'Accommodation3D/Accommodation3DScene.jsx',
  'Flight3D/Flight3DScene.jsx',
  'Interactive3DMap/Interactive3DMap.jsx',
  'CulinaryFilm/CulinaryFilmScene.jsx',
  'CinematicEnding/CinematicEndingScene.jsx'
];

scenes.forEach(file => {
  const p = 'src/features/destinations/components/' + file;
  const content = fs.readFileSync(p, 'utf8');
  console.log(`\n--- ${file} ---`);
  console.log('Includes useLanguage:', content.includes('useLanguage'));
  console.log('Includes isKorean:', content.includes('isKorean'));
});
