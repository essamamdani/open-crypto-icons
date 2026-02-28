const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The goal is to replace the entire Home component to fix any TS issues and scope issues.
// We'll extract the Home component body.
const homeMatch = code.match(/function Home\(\) \{([\s\S]*?)\n\}\n\nfunction Detail/);
if (homeMatch) {
  let homeBody = homeMatch[1];
  
  // Replace the search logic to properly define filteredIcons and currentIcons
  homeBody = homeBody.replace(/const filteredIcons = useMemo[\s\S]*?currentIcons = [^;]+;/m, `
  const filteredIcons = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return icons.filter((icon: any) => 
      icon.symbol.toLowerCase().includes(lowerSearch) || 
      icon.name.toLowerCase().includes(lowerSearch) ||
      icon.id.toLowerCase().includes(lowerSearch)
    );
  }, [search, icons]);

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const currentIcons = filteredIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  `);

  code = code.replace(homeMatch[1], homeBody);
  
  // Also let's ensure Chevron imports are present:
  if (!code.includes('ChevronLeft')) {
    code = code.replace("import { Search, Moon, Sun", "import { Search, Moon, Sun, ChevronLeft, ChevronRight");
  }
}

fs.writeFileSync('src/App.tsx', code);
