import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Terminal, Package, FileCode, CheckCircle } from 'lucide-react';
import SEOHelmet from './SEOHelmet';

export default function Docs() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CodeBlock = ({ code, language }: { code: string, language: string }) => {
    const [copied, setCopied] = React.useState(false);
    return (
      <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 my-6">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
          <span className="text-xs font-mono text-zinc-400">{language}</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="text-zinc-500 hover:text-emerald-400 transition-colors"
          >
            {copied ? <CheckCircle size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-zinc-300 font-mono text-sm">
            {code}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-32 px-4 sm:px-6 w-full">
      <SEOHelmet 
        title="Documentation - Open Crypto Icons"
        description="Learn how to install and use Open Crypto Icons via NPM, React, or directly through our CDN."
        image="https://essamamdani.github.io/open-crypto-icons/vite.svg"
        url="https://essamamdani.github.io/open-crypto-icons/docs"
      />
      
      <button onClick={() => navigate('/')} className="mb-12 text-zinc-500 hover:text-emerald-500 flex items-center gap-2 transition-colors font-medium">
        <ArrowLeft size={20} /> Back to Library
      </button>

      <div className="space-y-16 text-zinc-700 dark:text-zinc-300">
        <section>
          <h1 className="text-4xl md:text-5xl font-black font-display text-zinc-900 dark:text-white mb-6">Documentation</h1>
          <p className="text-lg leading-relaxed mb-8">
            Open Crypto Icons provides a massive collection of high-quality cryptocurrency SVGs. 
            You can use them via our lightweight React component, NPM package, or directly hotlink from our CDN.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
            <Package className="text-emerald-500" /> 1. React / Next.js Installation (NPM)
          </h2>
          <p className="leading-relaxed">
            The easiest way to use these icons in a React project is via our NPM package. 
            It exports a lightweight <code>{'<CryptoIcon />'}</code> component that automatically fetches the vector from our edge CDN, 
            keeping your app bundle size practically zero.
          </p>
          
          <CodeBlock 
            language="bash" 
            code="npm install open-crypto-icons\n# or\nyarn add open-crypto-icons\n# or\npnpm add open-crypto-icons" 
          />

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-8 mb-4">Usage Example</h3>
          <CodeBlock 
            language="jsx" 
            code={`import { CryptoIcon } from 'open-crypto-icons';

export default function MyComponent() {
  return (
    <div className="flex gap-4">
      {/* Default Original Colors */}
      <CryptoIcon symbol="btc" size={32} />
      
      {/* Solid Black Variant */}
      <CryptoIcon symbol="eth" variant="black" size={32} />
      
      {/* Solid White Variant (Great for dark mode) */}
      <CryptoIcon symbol="sol" variant="white" size={32} />
    </div>
  );
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
            <Terminal className="text-emerald-500" /> 2. Props Reference
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                <tr>
                  <th className="p-4 font-medium">Prop</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Default</th>
                  <th className="p-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400">symbol</td>
                  <td className="p-4 font-mono text-xs">string</td>
                  <td className="p-4 font-mono text-xs">"btc"</td>
                  <td className="p-4">The ticker symbol of the coin (e.g. "eth", "usdt"). Case-insensitive.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400">variant</td>
                  <td className="p-4 font-mono text-xs">"colored" | "black" | "white" | "outline"</td>
                  <td className="p-4 font-mono text-xs">"colored"</td>
                  <td className="p-4">Visual style of the icon. "colored" retains original brand colors.</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400">size</td>
                  <td className="p-4 font-mono text-xs">number | string</td>
                  <td className="p-4 font-mono text-xs">24</td>
                  <td className="p-4">Width and height of the icon in pixels or CSS units.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
            <FileCode className="text-emerald-500" /> 3. CDN Hotlinking (HTML / Vanilla JS)
          </h2>
          <p className="leading-relaxed mb-4">
            Not using React? No problem. You can embed the SVGs directly into your HTML using standard image tags. 
            Our GitHub Pages host acts as a globally distributed CDN.
          </p>
          <CodeBlock 
            language="html" 
            code={`<!-- Original Colors -->
<img src="https://essamamdani.github.io/open-crypto-icons/icons/colored/btc.svg" width="32" alt="Bitcoin" />

<!-- Solid Black -->
<img src="https://essamamdani.github.io/open-crypto-icons/icons/black/eth.svg" width="32" alt="Ethereum" />`}
          />
        </section>

        <section className="bg-zinc-100 dark:bg-zinc-800/30 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">JSON Data API</h2>
          <p className="mb-6">Need programmatic access to the list of all available coins? Use our static JSON endpoint.</p>
          <div className="bg-zinc-900 rounded-xl p-4 inline-block mx-auto">
            <code className="text-emerald-400 font-mono text-sm">https://essamamdani.github.io/open-crypto-icons/coins.json</code>
          </div>
        </section>
      </div>
    </div>
  );
}
