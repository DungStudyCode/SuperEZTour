import fs from 'fs';

const files = [
  'FlyThrough/FlyThroughScene.jsx',
  'Flight3D/Flight3DScene.jsx',
  'VehicleShowcase3D/VehicleShowcase3D.jsx',
  'Accommodation3D/Accommodation3DScene.jsx',
  'Hanoi/HanoiAwakeningHero/HanoiAwakeningHero.jsx',
  'Hanoi/HanoiOldQuarterWalk/HanoiOldQuarterWalk.jsx',
  'Hanoi/HanoiHeritageChamber/HanoiHeritageChamber.jsx',
  'Hanoi/HanoiTaste3D/HanoiTaste3D.jsx',
  'Hanoi/HanoiSeasons3D/HanoiSeasons3D.jsx'
];

files.forEach(f => {
  const p = 'src/features/destinations/components/' + f;
  if (!fs.existsSync(p)) return;
  const c = fs.readFileSync(p, 'utf8');
  const addResize = (c.match(/addEventListener\(['"]resize['"]/g) || []).length;
  const remResize = (c.match(/removeEventListener\(['"]resize['"]/g) || []).length;
  console.log(f, 'addResize:', addResize, 'remResize:', remResize);
});
