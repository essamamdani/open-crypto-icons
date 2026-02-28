const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the overflow issue by adjusting the inner box size and padding responsively
code = code.replace(
  'className="w-full md:w-5/12 shrink-0 bg-zinc-50 dark:bg-zinc-950/50 p-8 sm:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative"',
  'className="w-full md:w-5/12 shrink-0 bg-zinc-50 dark:bg-zinc-950/50 p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative"'
);

code = code.replace(
  'className="w-48 h-48 sm:w-64 sm:h-64 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-zinc-200 dark:border-zinc-800 mb-8 relative z-10 group"',
  'className="w-40 h-40 lg:w-64 lg:h-64 p-6 lg:p-10 bg-white dark:bg-zinc-900 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-zinc-200 dark:border-zinc-800 mb-6 lg:mb-8 relative z-10 group"'
);

// Also make the text slightly smaller on md if needed
code = code.replace(
  'className="font-display text-4xl font-black mb-2 tracking-tight text-zinc-900 dark:text-white"',
  'className="font-display text-3xl lg:text-4xl font-black mb-2 tracking-tight text-zinc-900 dark:text-white text-center break-all"'
);

fs.writeFileSync('src/App.tsx', code);
