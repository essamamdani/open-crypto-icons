const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace("let reactTag =", "// reactTag was here");
fs.writeFileSync('src/App.tsx', code);
