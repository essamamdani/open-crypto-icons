const fs = require('fs');

// 1. Update index.css
let cssCode = fs.readFileSync('src/index.css', 'utf8');
if (!cssCode.includes('@custom-variant dark')) {
  cssCode = cssCode.replace('@import "tailwindcss";', `@import "tailwindcss";\n\n/* dark mode ONLY via class */\n@custom-variant dark (&:where(.dark, .dark *));\n`);
}
fs.writeFileSync('src/index.css', cssCode);

// 2. Update index.html to add default class="dark" and default color-scheme
let htmlCode = fs.readFileSync('index.html', 'utf8');
if (!htmlCode.includes('class="dark"')) {
  htmlCode = htmlCode.replace('<html lang="en">', '<html lang="en" class="dark" style="color-scheme: dark;">');
}
fs.writeFileSync('index.html', htmlCode);

// 3. Update App.tsx to respect local storage or fallback to dark, and set color-scheme dynamically
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the darkMode useState
appCode = appCode.replace(
  `const [darkMode, setDarkMode] = useState(() => {\n    if (typeof window !== 'undefined') {\n      return window.matchMedia('(prefers-color-scheme: dark)').matches;\n    }\n    return true;\n  });`,
  `const [darkMode, setDarkMode] = useState(() => {\n    const saved = localStorage.getItem('theme');\n    if (saved) return saved === 'dark';\n    return true; // Default to dark as requested\n  });`
);

// We should also replace it if the indentation is different
appCode = appCode.replace(
  `const [darkMode, setDarkMode] = useState(() => {\n      return window.matchMedia('(prefers-color-scheme: dark)').matches;\n  });`,
  `const [darkMode, setDarkMode] = useState(() => {\n    const saved = localStorage.getItem('theme');\n    if (saved) return saved === 'dark';\n    return true;\n  });`
);

// Just in case, do a regex replace for the useState of darkMode
appCode = appCode.replace(
  /const \[darkMode, setDarkMode\] = useState\(\(\) => \{[^}]+\}\);/g,
  `const [darkMode, setDarkMode] = useState(() => {\n    const saved = localStorage.getItem('theme');\n    if (saved !== null) return saved === 'dark';\n    return true;\n  });`
);

// Remove the event listener for prefers-color-scheme
appCode = appCode.replace(
  /useEffect\(\(\) => \{\n\s*const mediaQuery[^}]+setDarkMode\(e\.matches\);\n\s*\};\n\s*mediaQuery.addEventListener[^}]+\n\s*\}\);\n/g,
  ''
);
// Above regex might be tricky, let's just do standard replace

// Let's replace the effect that sets the class
const oldEffect = `  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);`;

const newEffect = `  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode]);`;

if (appCode.includes('document.documentElement.classList.add(\'dark\');')) {
  // Use a targeted regex to replace the effect
  appCode = appCode.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[darkMode\]\);/g, newEffect);
}

fs.writeFileSync('src/App.tsx', appCode);
