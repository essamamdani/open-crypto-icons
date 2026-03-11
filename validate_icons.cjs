const fs = require('fs');
const path = require('path');

const svgDir = 'public/icons_svg';
const baseDirs = ['public/icons', 'icons'];
const variants = ['black', 'white', 'outline'];

const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));
let missing = [];
let checked = 0;

for (const f of svgFiles) {
  for (const b of baseDirs) {
    for (const v of variants) {
      const p = path.join(b, v, f);
      if (!fs.existsSync(p)) {
        missing.push(p);
      }
      checked++;
    }
  }
}

if (missing.length > 0) {
  console.error(`FAILED: Found ${missing.length} missing files!`);
  console.error('Sample missing:', missing.slice(0, 5));
  process.exit(1);
} else {
  console.log(`SUCCESS: 100% verified. All ${svgFiles.length} icons exist in all variants (${checked} files checked).`);
  process.exit(0);
}
