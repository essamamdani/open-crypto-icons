const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the filteredIcons useMemo to include pagination logic properly
const oldSearchLogic = `  const filteredIcons = useMemo(() => {
    if (!search) return icons.slice(0, 100);
    const lowerSearch = search.toLowerCase();
    return icons.filter(icon => 
      icon.symbol.toLowerCase().includes(lowerSearch) || 
      icon.name.toLowerCase().includes(lowerSearch) ||
      icon.id.toLowerCase().includes(lowerSearch)
    ).slice(0, 150); // limit to prevent DOM lag on massive search results
  }, [search, icons]);`;

const newSearchLogic = `  const filteredIcons = useMemo(() => {
    if (!search) return icons;
    const lowerSearch = search.toLowerCase();
    return icons.filter((icon: any) => 
      icon.symbol.toLowerCase().includes(lowerSearch) || 
      icon.name.toLowerCase().includes(lowerSearch) ||
      icon.id.toLowerCase().includes(lowerSearch)
    );
  }, [search, icons]);

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const currentIcons = filteredIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
`;

code = code.replace(oldSearchLogic, newSearchLogic);

code = code.replace(/currentIcons\.map\(\(icon, index\) =>/g, "currentIcons.map((icon: any, index: number) =>");

fs.writeFileSync('src/App.tsx', code);
