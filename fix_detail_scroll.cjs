const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The issue is likely that the pre tag overflow or text width is pushing the container out of the viewport.
// Let's add min-w-0 to the flex-1 right column to allow it to shrink properly and handle overflow.
code = code.replace(
  '<div className="flex-1 p-8 md:p-12 flex flex-col gap-8">',
  '<div className="flex-1 min-w-0 p-6 md:p-8 lg:p-12 flex flex-col gap-8">'
);

// Allow <pre> to wrap or hide scrollbar, ensure its container also has min-w-0
code = code.replace(
  '<div className="bg-white dark:bg-black/50 p-4 rounded-xl flex items-start justify-between group/code border border-zinc-200 dark:border-zinc-800/50">',
  '<div className="bg-white dark:bg-black/50 p-4 rounded-xl flex items-start justify-between group/code border border-zinc-200 dark:border-zinc-800/50 w-full overflow-hidden">'
);

code = code.replace(
  '<pre className="text-zinc-700 dark:text-zinc-300 font-mono text-xs leading-relaxed overflow-x-auto w-full">',
  '<pre className="text-zinc-700 dark:text-zinc-300 font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto w-full whitespace-pre-wrap break-all pr-2">'
);

// We should also check the other code block in the right pane to add the same fixes
code = code.replace(
  '<div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl flex items-center justify-between group/code">',
  '<div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl flex items-start justify-between group/code w-full overflow-hidden">'
);

code = code.replace(
  '<code className="text-zinc-500 dark:text-zinc-400 font-mono text-sm break-all">',
  '<code className="text-zinc-500 dark:text-zinc-400 font-mono text-[10px] md:text-xs leading-relaxed overflow-x-auto w-full whitespace-pre-wrap break-all pr-2">'
);

fs.writeFileSync('src/App.tsx', code);
