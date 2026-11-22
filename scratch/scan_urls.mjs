import fs from 'fs';
import path from 'path';

const domains = {};
let totalUrls = 0;
const mediaUrls = [];

function scan(d) {
  for (const e of fs.readdirSync(d)) {
    if (e === 'node_modules' || e === '.git' || e === 'dist' || e === 'scratch') continue;
    const full = path.join(d, e);
    if (fs.statSync(full).isDirectory()) scan(full);
    else if (/\.(js|jsx|json)$/.test(e)) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/https?:\/\/[^\s"'`<>]+/g);
      if (matches) {
        matches.forEach(m => {
          try {
            const clean = m.replace(/[,;)"'>]+$/, '');
            const u = new URL(clean);
            domains[u.hostname] = (domains[u.hostname] || 0) + 1;
            totalUrls++;
            if (/\.(png|jpg|jpeg|webp|mp4|webm|svg)(\?|$)/i.test(clean) || clean.includes('unsplash.com')) {
              mediaUrls.push({ url: clean, file: full });
            }
          } catch(err) {}
        });
      }
    }
  }
}

scan('src');
console.log('Total external URLs:', totalUrls);
console.log('Media URLs count:', mediaUrls.length);
console.log('External hostnames breakdown:', domains);
