const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the single icon detail layout cutting off on the left
// Changing flex-row setup to correctly stack or space without clipping the icon block
code = code.replace(
  'className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row"',
  'className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row w-full max-w-5xl"'
);

// Specifically fixing the left pane padding and sizing for the icon detail view
code = code.replace(
  'className="flex-1 bg-zinc-50 dark:bg-zinc-950/50 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative overflow-hidden"',
  'className="w-full md:w-5/12 bg-zinc-50 dark:bg-zinc-950/50 p-8 sm:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative"'
);

// Re-add pagination to the Home component
// First find the bottom part of Home
const paginationSnippet = `
                 {totalPages > 1 && (
                   <div className="mt-12 flex justify-center items-center gap-4 w-full col-span-full">
                     <button 
                       onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                       disabled={currentPage === 1}
                       className="p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                       <ChevronLeft size={24} />
                     </button>
                     <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                       Page {currentPage} of {totalPages}
                     </span>
                     <button 
                       onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                       disabled={currentPage === totalPages}
                       className="p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                       <ChevronRight size={24} />
                     </button>
                   </div>
                 )}
`;

// Insert ChevronLeft and ChevronRight in lucide imports if missing
if (!code.includes('ChevronLeft')) {
  code = code.replace("import { Search, Moon, Sun", "import { Search, Moon, Sun, ChevronLeft, ChevronRight");
}

// Ensure Home has currentPage state
if (!code.includes('const [currentPage, setCurrentPage] = useState(1);')) {
  code = code.replace(
    'const [search, setSearch] = useState("");',
    'const [search, setSearch] = useState("");\n  const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 50;\n  useEffect(() => { setCurrentPage(1); }, [search]);'
  );
}

// Fix filteredIcons logic in Home to not slice at 150 but use pagination slice
code = code.replace(
  /return icons\.filter\(icon =>[\s\S]*?\}\);/g,
  `return icons.filter(icon => 
      icon.symbol.toLowerCase().includes(lowerSearch) || 
      icon.name.toLowerCase().includes(lowerSearch) ||
      icon.id.toLowerCase().includes(lowerSearch)
    );
  }, [search, icons]);
  
  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const currentIcons = filteredIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
`
);

// Replace filteredIcons.map with currentIcons.map in Home
code = code.replace(
  /filteredIcons\.map\(\(icon, index\)/g,
  'currentIcons.map((icon, index)'
);

// Inject pagination controls right before closing div of grid
code = code.replace(
  /<\/div>\n\s*\}\)\}\n\s*<\/div>\n\s*\)\}\n\s*<\/div>/g,
  `</div>\n                 ${paginationSnippet}\n               </div>\n        )}\n      </div>`
);

fs.writeFileSync('src/App.tsx', code);
