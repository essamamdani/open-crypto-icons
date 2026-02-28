const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change itemsPerPage to 48
code = code.replace(
  'const itemsPerPage = 50;',
  'const itemsPerPage = 48;'
);

fs.writeFileSync('src/App.tsx', code);
