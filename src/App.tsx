import React, { useState, useEffect } from 'react';
import { Search, Info, Download } from 'lucide-react';

function App() {
  const [icons, setIcons] = useState<{symbol: string, name: string}[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("home");

  useEffect(() => {
    // For now we mock the icons. In production we will load them dynamically.
    setIcons([
      { symbol: "BTC", name: "Bitcoin" },
      { symbol: "ETH", name: "Ethereum" },
      { symbol: "USDT", name: "Tether" },
      { symbol: "BNB", name: "BNB" },
      { symbol: "SOL", name: "Solana" },
      { symbol: "XRP", name: "XRP" },
      { symbol: "ADA", name: "Cardano" },
      { symbol: "DOGE", name: "Dogecoin" }
    ]);
  }, []);

  const downloadIcon = (symbol: string, format: string) => {
    const svgPath = `/icons_svg/${symbol.toLowerCase()}.svg`;
    
    if (format === 'svg') {
      const link = document.createElement('a');
      link.href = svgPath;
      link.download = `${symbol.toLowerCase()}.svg`;
      link.click();
      return;
    }

    const img = new Image();
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

  const filteredIcons = icons.filter(icon => icon.symbol.toLowerCase().includes(search.toLowerCase()) || icon.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
             🪙 Open Crypto Icons
          </h1>
          <nav>
            <button onClick={() => setView('home')} className={`mx-3 font-medium ${view === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
            <button onClick={() => setView('about')} className={`mx-3 font-medium ${view === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>About Us</button>
          </nav>
        </div>
      </header>
      <main>
        {view === 'home' ? (
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
             <div className="px-4 py-6 sm:px-0">
               <div className="text-center mb-10">
                 <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">High-Quality Crypto Icons</h2>
                 <p className="mt-4 text-xl text-gray-500">Free to download in SVG, PNG, and JPG formats.</p>
               </div>
               <div className="max-w-2xl mx-auto mb-12 relative shadow-sm rounded-lg">
                 <Search className="absolute left-4 top-4 text-gray-400" />
                 <input type="text" placeholder="Search for Bitcoin, Ethereum, etc..." 
                   className="w-full pl-12 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg" 
                   onChange={e => setSearch(e.target.value)} />
               </div>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {filteredIcons.map(icon => (
                    <div key={icon.symbol} className="bg-white border p-6 rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition group">
                      <div className="w-20 h-20 bg-gray-50 rounded-full mb-4 flex items-center justify-center text-gray-400 overflow-hidden p-2 group-hover:scale-110 transition-transform">
                        <img src={`/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={icon.name} onError={(e) => { e.currentTarget.src = '/vite.svg' }} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">{icon.symbol}</span>
                      <span className="text-sm text-gray-500 mb-4">{icon.name}</span>
                      <div className="mt-auto flex flex-wrap justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => downloadIcon(icon.symbol, 'svg')} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 font-medium">SVG</button>
                        <button onClick={() => downloadIcon(icon.symbol, 'png')} className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-md hover:bg-green-100 font-medium">PNG</button>
                        <button onClick={() => downloadIcon(icon.symbol, 'jpg')} className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1.5 rounded-md hover:bg-yellow-100 font-medium">JPG</button>
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">About Open Crypto Icons</h2>
            <div className="prose prose-blue prose-lg text-gray-500">
              <p>Welcome to Open Crypto Icons, the most comprehensive open-source repository for cryptocurrency logos and icons.</p>
              <p>Our goal is to provide developers, designers, and creators with high-quality, up-to-date cryptocurrency icons that can be seamlessly integrated into any project. No more hunting for the right logo format.</p>
              <h3>Features:</h3>
              <ul>
                <li>Free to use in personal and commercial projects.</li>
                <li>Available in SVG, PNG, and JPG formats.</li>
                <li>Updated regularly via our automated background workers pulling from CoinGecko and TradingView sources.</li>
                <li>Hosted on GitHub Pages with a robust CDN infrastructure ensuring fast delivery.</li>
              </ul>
              <p>This project is maintained as an open-source initiative. Contributions are welcome on our GitHub repository.</p>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center text-sm text-gray-500">
          Built with ❤️ for the Crypto Community.
        </div>
      </footer>
    </div>
  );
}

export default App;
