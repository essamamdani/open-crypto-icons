import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Search, Moon, Sun, ChevronLeft, ChevronRight, Check, Copy, Download, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import SEOHelmet from './SEOHelmet';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

export default function App() {
  const [icons, setIcons] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    fetch('/open-crypto-icons/coins.json')
      .then(res => res.json())
      .then(data => {
        setIcons(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load coins.json", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500/30">
      <header className="absolute top-0 left-0 right-0 z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Crypto<span className="text-emerald-500">Icons</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/about" className="font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              About
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white dark:hover:bg-black transition-all shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} className="text-emerald-400" /> : <Moon size={20} className="text-emerald-600" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home icons={icons} loading={loading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/:symbol" element={<IconDetail icons={icons} />} />
        </Routes>
      </main>

      <footer className="mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center text-sm text-zinc-500 font-medium">
          Built with ❤️ for the Web3 Community. Open Source on GitHub.
        </div>
      </footer>
    </div>
  );
}

function Home({ icons, loading }: { icons: Coin[], loading: boolean }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 48;
  useEffect(() => { setCurrentPage(1); }, [search]);
  const navigate = useNavigate();

  const filteredIcons = useMemo(() => {
    if (!search) return icons;
    const lowerSearch = search.toLowerCase();
    return icons.filter((icon: any) => 
      icon.symbol.toLowerCase().includes(lowerSearch) || 
      icon.name.toLowerCase().includes(lowerSearch) ||
      icon.id.toLowerCase().includes(lowerSearch)
    );
  }, [search, icons]);

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const currentIcons = filteredIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const featuredCoins = useMemo(() => {
    return icons.filter(i => ['btc','eth','usdt','sol','bnb','xrp','doge','ada'].includes(i.symbol.toLowerCase()));
  }, [icons]);

  return (
    <>
      <SEOHelmet 
         title="Open Crypto Icons - Free High-Quality Cryptocurrency Logos" 
         description="Download high-quality cryptocurrency icons in SVG, PNG, and JPG formats. Search for Bitcoin, Ethereum, and thousands of other crypto logos."
         image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
         url="https://essamamdani.github.io/open-crypto-icons/"
      />
      <section className={`relative transition-all duration-700 ease-in-out ${search ? 'pt-32 pb-12 min-h-[40vh]' : 'pt-32 pb-20 min-h-[60vh]'} px-6 overflow-hidden flex flex-col items-center justify-center`}>
        {/* Background gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-emerald-500/20 dark:bg-emerald-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none transition-opacity duration-700" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[1.1]"
          >
            Find the perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">crypto icon.</span>
          </motion.h2>
          
          {!search && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 font-medium"
            >
              Beautiful, scalable, open-source crypto logos for your Web3 project.
            </motion.p>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative max-w-3xl mx-auto group transition-all duration-500 ${search ? 'mt-8' : 'mt-0'}`}
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-emerald-500 transition-colors">
              <Search size={28} strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Search for Bitcoin, ETH, SOL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-2 border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-3xl py-5 md:py-6 pl-16 pr-6 text-xl md:text-2xl outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-2xl shadow-emerald-500/5 text-zinc-900 dark:text-zinc-100"
            />
          </motion.div>
        </div>
        
        {/* Decorative background icons */}
        {!search && featuredCoins.length > 0 && (
          <div className="absolute inset-0 -z-10 opacity-[0.05] dark:opacity-[0.08] pointer-events-none overflow-hidden">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-6 md:gap-12 rotate-12 scale-[1.3] opacity-60">
              {Array.from({ length: 24 }).map((_, i) => {
                const icon = featuredCoins[i % featuredCoins.length];
                return (
                  <div key={`bg-${i}`} className="flex items-center justify-center filter grayscale">
                    <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} className="w-20 h-20 opacity-50" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full relative z-10">
        {!search && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <Sparkles className="text-emerald-500" size={28} />
              Featured Coins
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
              {featuredCoins.map((icon) => (
                <button
                  key={`feat-${icon.symbol}`}
                  onClick={() => navigate(`/${icon.symbol.toLowerCase()}`)}
                  className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={icon.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {icon.symbol}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold">
            {search ? `Results for "${search}"` : 'Top Library'}
          </h3>
          <span className="text-sm md:text-base text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full">
            {icons.length} total
          </span>
        </div>

        {loading ? (
           <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
           </div>
        ) : filteredIcons.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl text-zinc-500 font-display">No icons found for "{search}"</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-5 pb-20">
            {currentIcons.map((icon: any, index: number) => (
              <button
                key={`${icon.symbol}-${index}`}
                onClick={() => navigate(`/${icon.symbol.toLowerCase()}`)}
                className="group flex flex-col items-center justify-center p-5 md:p-8 aspect-square rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-500 hover:-translate-y-1 hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={icon.name} className="w-full h-full object-contain" />
                </div>
                <span className="mt-auto text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate w-full text-center group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors uppercase font-bold">
                  {icon.symbol}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate w-full text-center mt-1">
                  {icon.name}
                </span>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4 w-full">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </>
  );
}

function IconDetail({ icons }: { icons: Coin[] }) {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [copiedType, setCopiedType] = useState<string | null>(null);
  
  const icon = icons.find(i => i.symbol.toLowerCase() === symbol?.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [symbol]);

  if (!icon) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
        <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4">Icon Not Found</h2>
        <button onClick={() => navigate('/')} className="text-emerald-500 hover:text-emerald-600 font-medium flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Search
        </button>
      </div>
    );
  }

  const cdnUrl = `https://essamamdani.github.io/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`;
  const pageUrl = `https://essamamdani.github.io/open-crypto-icons/${icon.symbol.toLowerCase()}`;
  const imgTag = `<img src="${cdnUrl}" alt="${icon.name} Logo" />`;
  // reactTag was here `import { ${icon.symbol.toUpperCase()}Icon } from 'open-crypto-icons';\n\n<${icon.symbol.toUpperCase()}Icon size={24} />`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadIcon = (format: string) => {
    const svgPath = `/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`;
    if (format === 'svg') {
      const link = document.createElement('a');
      link.href = svgPath;
      link.download = `${icon.symbol.toLowerCase()}.svg`;
      link.click();
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = svgPath;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (format === 'jpg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, 512, 512);
        const link = document.createElement('a');
        link.download = `${icon.symbol.toLowerCase()}.${format}`;
        link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 1.0);
        link.click();
      }
    };
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto py-32 px-4 sm:px-6 w-full">
      <SEOHelmet 
         title={`${icon.name} (${icon.symbol.toUpperCase()}) Icon SVG, PNG Download`} 
         description={`Download ${icon.name} (${icon.symbol.toUpperCase()}) vector logo in SVG, PNG, and JPG formats. Free and open-source ${icon.name} crypto icon.`}
         image={cdnUrl}
         url={pageUrl}
      />
      
      <button onClick={() => navigate('/')} className="mb-8 text-zinc-500 hover:text-emerald-500 flex items-center gap-2 transition-colors font-medium">
        <ArrowLeft size={20} /> Back to Library
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row w-full max-w-5xl"
      >
        <div className="w-full md:w-5/12 shrink-0 bg-zinc-50 dark:bg-zinc-950/50 p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="w-40 h-40 lg:w-64 lg:h-64 p-6 lg:p-10 bg-white dark:bg-zinc-900 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-zinc-200 dark:border-zinc-800 mb-6 lg:mb-8 relative z-10 group">
            <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={icon.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-black mb-2 tracking-tight text-zinc-900 dark:text-white text-center break-all">{icon.name}</h2>
          <p className="text-zinc-500 font-mono text-sm bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-1 rounded-full uppercase">{icon.symbol}</p>
        </div>

        <div className="flex-1 p-8 md:p-12 flex flex-col gap-8">
          <div>
             
          {/* React Component Usage */}
          <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 mb-8">
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={14}/> React Usage (NPM)</h3>
            <div className="bg-white dark:bg-black/50 p-4 rounded-xl flex items-start justify-between group/code border border-zinc-200 dark:border-zinc-800/50">
              <pre className="text-zinc-700 dark:text-zinc-300 font-mono text-xs leading-relaxed overflow-x-auto w-full">
                <span className="text-purple-600 dark:text-purple-400">import</span> {'{'} <span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> {'}'} <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-emerald-600 dark:text-green-400">'open-crypto-icons'</span>;<br/><br/>
                {'<'}<span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> symbol="<span className="text-emerald-600 dark:text-green-400">{icon.symbol.toLowerCase()}</span>" variant="<span className="text-emerald-600 dark:text-green-400">colored</span>" size={'{'}48{'}'} {'/>'}
              </pre>
              <button 
                onClick={() => navigator.clipboard.writeText(`import { CryptoIcon } from 'open-crypto-icons';\n\n<CryptoIcon symbol="${icon.symbol.toLowerCase()}" variant="colored" size={48} />`)}
                className="text-zinc-400 hover:text-emerald-500 ml-2 mt-1 flex-shrink-0 transition-colors"
                title="Copy code"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

             <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Download Assets</h3>
             <div className="flex flex-col sm:flex-row gap-3">
               <button onClick={() => downloadIcon('svg')} className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold transition-all active:scale-[0.98]">
                 <Download size={18} /> SVG
               </button>
               <button onClick={() => downloadIcon('png')} className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 py-3 px-4 rounded-xl font-bold transition-all active:scale-[0.98]">
                 PNG
               </button>
               <button onClick={() => downloadIcon('jpg')} className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 py-3 px-4 rounded-xl font-bold transition-all active:scale-[0.98]">
                 JPG
               </button>
             </div>
          </div>

          <CodeSnippet label="HTML Image Tag" code={imgTag} type="img" copiedType={copiedType} onCopy={copyToClipboard} />
          <CodeSnippet label="Direct CDN Link" code={cdnUrl} type="cdn" copiedType={copiedType} onCopy={copyToClipboard} />
        </div>
      </motion.div>
    </div>
  );
}

function CodeSnippet({ label, code, type, copiedType, onCopy }: any) {
  const isCopied = copiedType === type;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="relative group">
        <pre className="p-4 bg-zinc-100 dark:bg-zinc-950 rounded-2xl overflow-x-auto text-sm font-mono text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-inner">
          <code>{code}</code>
        </pre>
        <button
          onClick={() => onCopy(code, type)}
          className="absolute top-1/2 -translate-y-1/2 right-3 p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-700 active:scale-95"
          aria-label="Copy code"
        >
          {isCopied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} className="text-zinc-500 dark:text-zinc-400" />}
        </button>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="flex-1 max-w-4xl mx-auto py-32 px-4 sm:px-6 w-full">
      <SEOHelmet 
         title="About - Open Crypto Icons" 
         description="Learn about Open Crypto Icons, the most comprehensive open-source repository for cryptocurrency logos and icons."
         image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
         url="https://essamamdani.github.io/open-crypto-icons/about"
       />
      <h2 className="font-display text-5xl font-black mb-10 text-center text-zinc-900 dark:text-white">About Open Crypto Icons</h2>
      <div className="bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-300">
          Welcome to <strong>Open Crypto Icons</strong>, the most comprehensive open-source repository for cryptocurrency logos and icons.
        </p>
        <p className="text-zinc-600 dark:text-zinc-300">
          Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.
        </p>
        <h3 className="font-display font-bold mt-8 mb-4 text-zinc-900 dark:text-white">Features:</h3>
        <ul className="space-y-3 text-zinc-600 dark:text-zinc-300">
          <li><span className="font-bold text-emerald-500">Free to use</span> in personal and commercial projects.</li>
          <li><span className="font-bold text-emerald-500">Multiple Formats:</span> Instantly download in SVG, PNG, and JPG formats.</li>
          <li><span className="font-bold text-emerald-500">Constantly Updated:</span> Synchronized regularly with major market databases.</li>
          <li><span className="font-bold text-emerald-500">High Availability:</span> Hosted on GitHub Pages with robust CDN infrastructure ensuring fast delivery.</li>
        </ul>
      </div>
    </div>
  );
}
