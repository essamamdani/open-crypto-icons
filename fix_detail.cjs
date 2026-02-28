const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the flex shrinking issue on the detail page left pane
code = code.replace(
  'className="w-full md:w-5/12 bg-zinc-50 dark:bg-zinc-950/50 p-8 sm:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative"',
  'className="w-full md:w-5/12 shrink-0 bg-zinc-50 dark:bg-zinc-950/50 p-8 sm:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative"'
);

fs.writeFileSync('src/App.tsx', code);
