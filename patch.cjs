const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const filteredIcons = icons\.filter\([\s\S]*?\);/g,
  `const filteredIcons = icons.filter(icon => 
    icon.symbol.toLowerCase().includes(search.toLowerCase()) || 
    icon.name.toLowerCase().includes(search.toLowerCase()) ||
    icon.id.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 150);`
);

fs.writeFileSync('src/App.tsx', code);
