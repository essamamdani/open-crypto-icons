const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldStateStr = `  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });`;

const newStateStr = `  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    }
    return true; // Force dark mode by default
  });`;

if (code.includes(oldStateStr)) {
  code = code.replace(oldStateStr, newStateStr);
}

// remove the event listener effect
const oldListener = `    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);`;

if (code.includes(oldListener)) {
  code = code.replace(oldListener, '');
}

fs.writeFileSync('src/App.tsx', code);
