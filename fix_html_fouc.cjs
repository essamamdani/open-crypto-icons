const fs = require('fs');

let htmlCode = fs.readFileSync('index.html', 'utf8');

// Add FOUC script
const foucScript = `
    <!-- Theme Restore (FOUC Fix) -->
    <script>
      const t = localStorage.getItem("theme") || "dark";
      if (t === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    </script>
`;

if (!htmlCode.includes('Theme Restore (FOUC Fix)')) {
  htmlCode = htmlCode.replace('</title>', '</title>' + foucScript);
}

fs.writeFileSync('index.html', htmlCode);
