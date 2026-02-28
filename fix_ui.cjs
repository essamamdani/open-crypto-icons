const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Improve the hero grid to look more like the Apple/Lucide aesthetic
code = code.replace(
  '<div className="grid grid-cols-4 md:grid-cols-6 gap-10 md:gap-20 rotate-12 scale-150">',
  '<div className="grid grid-cols-4 md:grid-cols-6 gap-6 md:gap-12 rotate-12 scale-[1.3] opacity-60">'
);

// Improve the cards for featured coins
code = code.replace(
  'className="flex flex-col items-center justify-center p-6 aspect-square rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"',
  'className="group flex flex-col items-center justify-center p-4 md:p-6 aspect-square rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"'
);

// Improve the text inside featured cards
code = code.replace(
  '<span className="mt-auto text-xs font-mono text-zinc-400 uppercase font-bold tracking-wider">',
  '<span className="mt-auto text-[10px] md:text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 uppercase font-bold tracking-wider transition-colors">'
);

// Improve the main grid items
code = code.replace(
  'className="group flex flex-col items-center justify-center p-6 md:p-8 aspect-square rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"',
  'className="group flex flex-col items-center justify-center p-5 md:p-8 aspect-square rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300"'
);

// Change grid columns for mobile from 2 to 3, so it looks denser and less blocky
code = code.replace(
  '<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">',
  '<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">'
);

code = code.replace(
  '<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 pb-20">',
  '<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-5 pb-20">'
);

// Make the icon size in grid slightly smaller to give more breathing room
code = code.replace(
  '<div className="w-12 h-12 mb-4 group-hover:scale-125 transition-transform duration-300">',
  '<div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">'
);

// Update NPM installation section to have consistent radius
code = code.replace(
  'className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative group"',
  'className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative group"'
);

fs.writeFileSync('src/App.tsx', code);
