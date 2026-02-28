import React, { useState, useEffect } from 'react';
import { Search, Download, Info } from 'lucide-react';

function App() {
  const [icons, setIcons] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // In a real app we'd fetch the list of generated SVGs or a metadata JSON.
    // Assuming icons are loaded here.
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
             Open Crypto Icons
          </h1>
          <nav>
            <a href="#" className="text-gray-600 hover:text-gray-900 mx-3">Home</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 mx-3">About Us</a>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
           <div className="px-4 py-6 sm:px-0">
             <h2 className="text-xl font-semibold mb-4 text-center">Free High-Quality Crypto SVGs</h2>
             <div className="max-w-md mx-auto mb-8 relative">
               <Search className="absolute left-3 top-3 text-gray-400" />
               <input type="text" placeholder="Search coins..." 
                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:outline-none" 
                 onChange={e => setSearch(e.target.value)} />
             </div>
             
             {/* Grid */}
             <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {/* Icons will go here */}
                <div className="bg-white border p-4 rounded-lg flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center text-gray-400">SVG</div>
                  <span className="text-sm font-medium">BTC</span>
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">SVG</button>
                    <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">PNG</button>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </main>
    </div>
  );
}

export default App;
