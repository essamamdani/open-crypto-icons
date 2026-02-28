const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "const filteredIcons = icons.filter(icon => \n    icon.symbol.toLowerCase().includes(search.toLowerCase()) || \n    icon.name.toLowerCase().includes(search.toLowerCase()) ||\n    icon.id.toLowerCase().includes(search.toLowerCase())\n  );",
  `const filteredIcons = icons.filter(icon => 
    icon.symbol.toLowerCase().includes(search.toLowerCase()) || 
    icon.name.toLowerCase().includes(search.toLowerCase()) ||
    icon.id.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 150); // Limit to 150 icons per render to avoid browser lag`
);

fs.writeFileSync('src/App.tsx', code);
