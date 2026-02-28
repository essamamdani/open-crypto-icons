import { useState, useEffect } from 'react';
import { Search, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface Coin {
  id: string;
  symbol: string;
  name: string;
}

function App() {
  const [icons, setIcons] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("home");
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    fetch('/open-crypto-icons/coins.json')
      .then(res => res.json())
      .then(data => {
        // Data is already sorted and filtered (only valid SVGs) from backend
        setIcons(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load coins.json", err);
        setLoading(false);
      });
  }, []);

  // Reset to page 1 on new search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const downloadIcon = (symbol: string, format: string) => {
    const svgPath = `/open-crypto-icons/icons_svg/${symbol.toLowerCase()}.svg`;
    
    if (format === 'svg') {
      const link = document.createElement('a');
      link.href = svgPath;
      link.download = `${symbol.toLowerCase()}.svg`;
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
        link.download = `${symbol.toLowerCase()}.${format}`;
        link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 1.0);
        link.click();
      }
    };
  };

  const filteredIcons = icons.filter(icon => 
    icon.symbol.toLowerCase().includes(search.toLowerCase()) || 
    icon.name.toLowerCase().includes(search.toLowerCase()) ||
    icon.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
  const currentIcons = filteredIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
             <Zap className="text-yellow-500 fill-current" /> Open Crypto Icons
          </h1>
          <nav>
            <button onClick={() => setView('home')} className={`mx-3 font-medium ${view === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
            <button onClick={() => setView('about')} className={`mx-3 font-medium ${view === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>About Us</button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {view === 'home' ? (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
                      <div key={`${icon.symbol}-${index}`} className="bg-white border border-gray-100 p-6 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-20 h-20 mb-4 flex items-center justify-center overflow-hidden p-2 group-hover:scale-110 transition-transform duration-300">
                          <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={`${icon.name} logo`} 
                               className="w-full h-full object-contain" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 uppercase">{icon.symbol}</span>
                        <span className="text-xs text-gray-500 mb-5 text-center truncate w-full" title={icon.name}>{icon.name}</span>
                        <div className="mt-auto flex flex-wrap justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button onClick={() => downloadIcon(icon.symbol, 'svg')} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-100 font-semibold transition-colors">SVG</button>
                          <button onClick={() => downloadIcon(icon.symbol, 'png')} className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded hover:bg-green-100 font-semibold transition-colors">PNG</button>
                          <button onClick={() => downloadIcon(icon.symbol, 'jpg')} className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded hover:bg-yellow-100 font-semibold transition-colors">JPG</button>
                        </div>
                      </div>
                    ))}
                 </div>
                 
                 {filteredIcons.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                       No icons found matching "{search}".
                    </div>
                 )}

                 {/* Pagination Controls */}
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
        ) : (
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">About Open Crypto Icons</h2>
            <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 md:p-12 prose prose-blue prose-lg text-gray-600 max-w-none">
              <p>Welcome to <strong>Open Crypto Icons</strong>, the most comprehensive open-source repository for cryptocurrency logos and icons.</p>
              <p>Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.</p>
              <h3 className="text-gray-900 font-bold mt-8 mb-4">Features:</h3>
              <ul className="space-y-2">
                <li><span className="font-semibold text-gray-800">Free to use</span> in personal and commercial projects.</li>
                <li><span className="font-semibold text-gray-800">Multiple Formats:</span> Instantly download in SVG, PNG, and JPG formats.</li>
                <li><span className="font-semibold text-gray-800">Constantly Updated:</span> Synchronized regularly with CoinGecko and TradingView.</li>
                <li><span className="font-semibold text-gray-800">SEO & Developer Friendly:</span> Comprehensive search by coin name (e.g., Bitcoin) or symbol (e.g., BTC).</li>
                <li><span className="font-semibold text-gray-800">High Availability:</span> Hosted on GitHub Pages with robust CDN infrastructure ensuring fast delivery.</li>
              </ul>
              <p className="mt-8 border-t pt-8">This project is maintained as an open-source initiative. Contributions are welcome on our GitHub repository.</p>
            </div>
          </div>
        )}
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
