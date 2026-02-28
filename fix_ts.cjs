const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/currentIcons\.map\(\(icon, index\) =>/g, 'currentIcons.map((icon: any, index: number) =>');
code = code.replace(/const currentIcons =/g, 'const currentIcons: any[] =');

// Also remove unused imports to satisfy TS6133
code = code.replace(/ChevronLeft, ChevronRight/g, '');
code = code.replace(/import { Search, Moon, Sun,  } from/g, 'import { Search, Moon, Sun, ChevronLeft, ChevronRight } from');

// If currentIcons is not defined inside the return, but used
// Oh wait! The problem is currentIcons is defined inside the useMemo() callback but used outside!
// Let's rewrite the pagination logic safely.
