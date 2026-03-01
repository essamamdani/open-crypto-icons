const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');

// Add Docs to routes
if (!code.includes('import Docs')) {
  code = code.replace("import App from './App.tsx';", "import App from './App.tsx';\nimport Docs from './Docs.tsx';");
  code = code.replace(
    "<Route path=\"/\" element={<App />} />",
    "<Route path=\"/\" element={<App />} />\n        <Route path=\"/docs\" element={<Docs />} />"
  );
}
fs.writeFileSync('src/main.tsx', code);

// Now add a Docs link to the Navbar in App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
if (!appCode.includes('href="/docs"')) {
  // We need to use Link from react-router-dom instead of a to avoid full page reload if possible, 
  // but href with Router basename works or we just use navigate
  appCode = appCode.replace(
    'className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"',
    'className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors mr-2"'
  );
  
  const docsLink = `
          <button 
            onClick={() => navigate('/docs')}
            className="mr-4 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 transition-colors flex items-center gap-2"
          >
            <Sparkles size={16} /> Docs
          </button>
  `;
  
  appCode = appCode.replace(
    '<button \n            onClick={() => setDarkMode(!darkMode)}',
    docsLink + '\n          <button \n            onClick={() => setDarkMode(!darkMode)}'
  );
}
fs.writeFileSync('src/App.tsx', appCode);

// Add Package, FileCode, CheckCircle, Terminal to lucide-react imports in Docs
