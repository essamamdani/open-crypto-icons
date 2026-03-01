const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

const installCommandHtml = `
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex justify-center mb-12"
            >
              <div className="flex items-center gap-3 bg-white dark:bg-black/50 border border-zinc-200 dark:border-zinc-800/50 p-2 pl-5 pr-2 rounded-full shadow-sm hover:border-emerald-500/50 transition-colors">
                <code className="text-zinc-700 dark:text-zinc-300 font-mono text-sm md:text-base">npm install open-crypto-icons</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("npm install open-crypto-icons");
                    alert("Copied!");
                  }}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-500 hover:text-white rounded-full transition-colors text-zinc-500 dark:text-zinc-400"
                  title="Copy command"
                >
                  <Copy size={16} />
                </button>
              </div>
            </motion.div>
`;

if (!appCode.includes('npm install open-crypto-icons')) {
  // It might be in the NPM section below, but let's check for the exact JSX above
  appCode = appCode.replace(
    'Beautiful, scalable, open-source crypto logos for your Web3 project.\n            </motion.p>\n          )}',
    'Beautiful, scalable, open-source crypto logos for your Web3 project.\n            </motion.p>\n          )}\n\n          {!search && (\n' + installCommandHtml + '\n          )}'
  );
}

fs.writeFileSync('src/App.tsx', appCode);
