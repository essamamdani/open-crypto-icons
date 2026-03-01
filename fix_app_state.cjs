const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The code currently has this:
// const [darkMode, setDarkMode] = useState(() => {
//   if (typeof window !== 'undefined') {
//     const saved = localStorage.getItem('theme');
//     if (saved) return saved === 'dark';
//   }
//   return true; // Force dark mode by default
// });

// We should replace it with exact required logic
const oldState = /const \[darkMode, setDarkMode\] = useState\(\(\) => \{[\s\S]*?return true; \/\/ Force dark mode by default\n  \}\);/;

const newState = `const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') || 'dark';
      return saved === 'dark';
    }
    return true;
  });`;

if (code.match(oldState)) {
  code = code.replace(oldState, newState);
}

// And the useEffect:
const oldEffect = /useEffect\(\(\) => \{[\s\S]*?\}, \[darkMode\]\);/;

const newEffect = `useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      html.style.colorScheme = 'dark';
    } else {
      html.classList.remove('dark');
      html.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [darkMode]);`;

if (code.match(oldEffect)) {
  code = code.replace(oldEffect, newEffect);
}

fs.writeFileSync('src/App.tsx', code);
