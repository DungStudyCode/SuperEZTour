const { execSync } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const dom = execSync(`"${CHROME}" --headless=new --dump-dom "http://localhost:3000/destinations/ha-noi"`, {
  encoding: 'utf-8',
  maxBuffer: 30 * 1024 * 1024
});

const m1 = dom.match(/.{0,50}06\. 다낭.{0,50}/g);
console.log('06. matches:', m1);

const m2 = dom.match(/.{0,50}다낭 — 100%.{0,50}/g);
console.log('100% matches:', m2);

const m3 = dom.match(/.{0,30}다낭.{0,30}/g);
console.log('Total matches of 다낭:', m3 ? m3.length : 0);
if (m3) {
  console.log('Sample matches:');
  m3.slice(0, 10).forEach(m => console.log(' -> ', m.trim()));
}
