import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { Search, Zap, ChevronLeft, ChevronRight, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import SEOHelmet from './SEOHelmet';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

function Home({ icons, loading }: { icons: Coin[], loading: boolean }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredIcons = icons.filter(icon => 
    icon.symbol.toLowerCase().includes(search.toLowerCase()) || 
    icon.name.toLowerCase().includes(search.toLowerCase()) ||
    icon.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const currentIcons = filteredIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
       <SEOHelmet 
         title="Open Crypto Icons - Free High-Quality Cryptocurrency Logos" 
         description="Download high-quality cryptocurrency icons in SVG, PNG, and JPG formats. Search for Bitcoin, Ethereum, and thousands of other crypto logos."
         image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
         url="https://essamamdani.github.io/open-crypto-icons/"
       />
       <div className="text-center mb-10">
         <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">High-Quality Crypto Icons</h2>
         <p className="mt-4 text-xl text-gray-500">Free to download in SVG, PNG, and JPG formats. ({icons.length} High-Res Icons Available)</p>
       </div>
       
       <div className="max-w-3xl mx-auto mb-10 relative shadow-sm rounded-lg">
         <Search className="absolute left-5 top-4 text-gray-400" size={24} />
         <input type="text" placeholder="Search for Bitcoin, Ethereum, USDT, SOL..." 
           className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none text-lg transition-all" 
           value={search}
           onChange={e => setSearch(e.target.value)} />
       </div>
       
       {loading ? (
         <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
         </div>
       ) : (
         <>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {currentIcons.map((icon, index) => (
                <div 
                  key={`${icon.symbol}-${index}`} 
                  onClick={() => navigate(`/${icon.symbol.toLowerCase()}`)}
                  className="bg-white cursor-pointer border border-gray-100 p-6 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 mb-4 flex items-center justify-center overflow-hidden p-2 group-hover:scale-110 transition-transform duration-300">
                    <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={`${icon.name} logo`} 
                         className="w-full h-full object-contain" />
                  </div>
                  <span className="text-lg font-bold text-gray-900 uppercase">{icon.symbol}</span>
                  <span className="text-xs text-gray-500 text-center truncate w-full" title={icon.name}>{icon.name}</span>
                </div>
              ))}
           </div>
           
           {filteredIcons.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                 No icons found matching "{search}".
              </div>
           )}

           {totalPages > 1 && (
             <div className="mt-12 flex justify-center items-center gap-4">
               <button 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronLeft size={24} />
               </button>
               <span className="text-sm font-medium text-gray-700">
                 Page {currentPage} of {totalPages}
               </span>
               <button 
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages}
                 className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                 <ChevronRight size={24} />
               </button>
             </div>
           )}
         </>
       )}
    </div>
  );
}

function IconDetail({ icons }: { icons: Coin[] }) {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [copiedImg, setCopiedImg] = useState(false);
  const [copiedJsx, setCopiedJsx] = useState(false);
  
  const icon = icons.find(i => i.symbol.toLowerCase() === symbol?.toLowerCase());

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [symbol]);

  if (!icon) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Icon Not Found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline flex items-center justify-center gap-2 mx-auto">
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  const cdnUrl = `https://essamamdani.github.io/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`;
  const pageUrl = `https://essamamdani.github.io/open-crypto-icons/${icon.symbol.toLowerCase()}`;
  const imgTag = `<img src="${cdnUrl}" alt="${icon.name} Logo" />`;
  const jsxTag = `import { ${icon.symbol.toUpperCase()}Icon } from 'open-crypto-icons'; // Example\n<img src="${cdnUrl}" alt="${icon.name}" />`;

  const copyToClipboard = (text: string, type: 'img' | 'jsx') => {
    navigator.clipboard.writeText(text);
    if (type === 'img') {
      setCopiedImg(true);
      setTimeout(() => setCopiedImg(false), 2000);
    } else {
      setCopiedJsx(true);
      setTimeout(() => setCopiedJsx(false), 2000);
    }
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
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet 
         title={`${icon.name} (${icon.symbol.toUpperCase()}) Icon SVG, PNG, JPG Download - Open Crypto Icons`} 
         description={`Download ${icon.name} (${icon.symbol.toUpperCase()}) vector logo in SVG, PNG, and JPG formats. Free and open-source ${icon.name} crypto icon.`}
         image={cdnUrl}
         url={pageUrl}
       />
      <button onClick={() => navigate('/')} className="mb-8 text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Back to Library
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Big Icon */}
        <div className="md:w-5/12 bg-gray-50 p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-8">
            <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={`${icon.name} logo`} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">{icon.name}</h2>
          <p className="text-lg font-medium text-gray-500 uppercase tracking-widest mt-2">{icon.symbol}</p>
        </div>

        {/* Right Side: Downloads & CDN */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
          
          <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">Download Formats</h3>
          <div className="flex flex-wrap gap-4 mb-10">
            <button onClick={() => downloadIcon('svg')} className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-100 font-semibold py-4 px-6 rounded-xl transition-all text-center">
              SVG (Vector)
            </button>
            <button onClick={() => downloadIcon('png')} className="flex-1 bg-green-50 hover:bg-green-600 text-green-700 hover:text-white border border-green-100 font-semibold py-4 px-6 rounded-xl transition-all text-center">
              PNG (Transparent)
            </button>
            <button onClick={() => downloadIcon('jpg')} className="flex-1 bg-yellow-50 hover:bg-yellow-500 text-yellow-700 hover:text-white border border-yellow-100 font-semibold py-4 px-6 rounded-xl transition-all text-center">
              JPG (White BG)
            </button>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider mt-4">CDN Links</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">HTML Image Tag</span>
                <button onClick={() => copyToClipboard(imgTag, 'img')} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  {copiedImg ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto whitespace-nowrap">
                {imgTag}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">React / JSX</span>
                <button onClick={() => copyToClipboard(jsxTag, 'jsx')} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  {copiedJsx ? <><CheckCircle size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="bg-gray-800 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto whitespace-nowrap">
                {jsxTag}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 mb-2 block">Direct SVG URL</span>
              <a href={cdnUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:underline break-all">
                {cdnUrl}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <SEOHelmet 
         title="About - Open Crypto Icons" 
         description="Learn about Open Crypto Icons, the most comprehensive open-source repository for cryptocurrency logos and icons."
         image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
         url="https://essamamdani.github.io/open-crypto-icons/about"
       />
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">About Open Crypto Icons</h2>
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 md:p-12 prose prose-blue prose-lg text-gray-600 max-w-none">
        <p>Welcome to <strong>Open Crypto Icons</strong>, the most comprehensive open-source repository for cryptocurrency logos and icons.</p>
        <p>Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.</p>
        <h3 className="text-gray-900 font-bold mt-8 mb-4">Features:</h3>
        <ul className="space-y-2">
          <li><span className="font-semibold text-gray-800">Free to use</span> in personal and commercial projects.</li>
          <li><span className="font-semibold text-gray-800">Multiple Formats:</span> Instantly download in SVG, PNG, and JPG formats.</li>
          <li><span className="font-semibold text-gray-800">Constantly Updated:</span> Synchronized regularly with CoinGecko and TradingView.</li>
          <li><span className="font-semibold text-gray-800">High Availability:</span> Hosted on GitHub Pages with robust CDN infrastructure ensuring fast delivery.</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [icons, setIcons] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
             <Zap className="text-yellow-500 fill-current" /> Open Crypto Icons
          </Link>
          <nav>
            <Link to="/" className="mx-3 font-medium text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/about" className="mx-3 font-medium text-gray-600 hover:text-gray-900">About Us</Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home icons={icons} loading={loading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/:symbol" element={<IconDetail icons={icons} />} />
        </Routes>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center text-sm text-gray-500 font-medium">
          Built with ❤️ for the Web3 Community. Open Source on GitHub.
        </div>
      </footer>
    </div>
  );
}

export default App;
