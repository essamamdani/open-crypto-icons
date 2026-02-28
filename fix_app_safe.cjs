const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const installHTML = `
      {/* Installation Section */}
      <div className="w-full max-w-3xl mx-auto mb-16 text-left">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-zinc-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-emerald-500" />
            Install via NPM for React
          </h3>
          <div className="bg-zinc-50 dark:bg-black/50 p-4 rounded-xl flex items-center justify-between group/code border border-zinc-200 dark:border-zinc-800/50 mb-4">
            <code className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">npm install open-crypto-icons</code>
            <button 
              onClick={() => navigator.clipboard.writeText("npm install open-crypto-icons")}
              className="text-zinc-400 hover:text-emerald-500 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="bg-zinc-50 dark:bg-black/50 p-4 rounded-xl flex items-start justify-between group/code border border-zinc-200 dark:border-zinc-800/50">
            <pre className="text-zinc-700 dark:text-zinc-300 font-mono text-xs leading-relaxed overflow-x-auto">
              <span className="text-purple-600 dark:text-purple-400">import</span> {'{'} <span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> {'}'} <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-emerald-600 dark:text-green-400">'open-crypto-icons'</span>;<br/><br/>
              <span className="text-zinc-400 dark:text-zinc-500">// Inside your component</span><br/>
              {'<'}CryptoIcon symbol="<span className="text-emerald-600 dark:text-green-400">btc</span>" variant="<span className="text-emerald-600 dark:text-green-400">colored</span>" size={'{'}32{'}'} {'/>'}
            </pre>
          </div>
        </div>
      </div>
`;

code = code.replace(
  '<div className="w-full max-w-2xl mx-auto mb-16 relative group">',
  installHTML + '\n      <div className="w-full max-w-2xl mx-auto mb-16 relative group">'
);

const detailHTML = `
          {/* React Component Usage */}
          <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 mb-8">
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> React Usage (NPM)</h3>
            <div className="bg-white dark:bg-black/50 p-4 rounded-xl flex items-start justify-between group/code border border-zinc-200 dark:border-zinc-800/50">
              <pre className="text-zinc-700 dark:text-zinc-300 font-mono text-xs leading-relaxed overflow-x-auto w-full">
                <span className="text-purple-600 dark:text-purple-400">import</span> {'{'} <span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> {'}'} <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-emerald-600 dark:text-green-400">'open-crypto-icons'</span>;<br/><br/>
                {'<'}<span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> symbol="<span className="text-emerald-600 dark:text-green-400">{icon.symbol.toLowerCase()}</span>" variant="<span className="text-emerald-600 dark:text-green-400">colored</span>" size={'{'}48{'}'} {'/>'}
              </pre>
              <button 
                onClick={() => navigator.clipboard.writeText(\`import { CryptoIcon } from 'open-crypto-icons';\\n\\n<CryptoIcon symbol="\${icon.symbol.toLowerCase()}" variant="colored" size={48} />\`)}
                className="text-zinc-400 hover:text-emerald-500 ml-2 mt-1 flex-shrink-0 transition-colors"
                title="Copy code"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
`;

code = code.replace(
  '<h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Download Assets</h3>',
  detailHTML + '\n             <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Download Assets</h3>'
);

if (!code.includes('Copy')) {
  code = code.replace("import { Search, Moon, Sun, ChevronLeft, ChevronRight } from", "import { Search, Moon, Sun, ChevronLeft, ChevronRight, Copy, Sparkles } from");
}

fs.writeFileSync('src/App.tsx', code);
