import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add useState if not present (already imported probably, but let's check)
# Actually, let's just use string replacements.

# 1. Add selectedVariant state
state_match = re.search(r'const \[copiedType, setCopiedType\] = useState<string \| null>\(null\);', content)
if state_match:
    content = content.replace(
        'const [copiedType, setCopiedType] = useState<string | null>(null);',
        "const [copiedType, setCopiedType] = useState<string | null>(null);\n  const [selectedVariant, setSelectedVariant] = useState<'colored' | 'black' | 'white' | 'outline'>('colored');\n\n  const getVariantDir = (v: string) => {\n    if (v === 'black') return 'icons/black';\n    if (v === 'white') return 'icons/white';\n    if (v === 'outline') return 'icons/outline';\n    return 'icons_svg';\n  };"
    )

# 2. Update cdnUrl and downloadIcon
content = content.replace(
    'const cdnUrl = `https://essamamdani.github.io/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`;',
    'const cdnUrl = `https://essamamdani.github.io/open-crypto-icons/${getVariantDir(selectedVariant)}/${icon.symbol.toLowerCase()}.svg`;'
)

content = content.replace(
    'const svgPath = `/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`;',
    'const svgPath = `/open-crypto-icons/${getVariantDir(selectedVariant)}/${icon.symbol.toLowerCase()}.svg`;'
)

# 3. Update the large preview image
old_large_preview = '''<div className="w-40 h-40 lg:w-64 lg:h-64 p-6 lg:p-10 bg-white dark:bg-zinc-900 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-zinc-200 dark:border-zinc-800 mb-6 lg:mb-8 relative z-10 group">
            <img src={`/open-crypto-icons/icons_svg/${icon.symbol.toLowerCase()}.svg`} alt={icon.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
          </div>'''
new_large_preview = '''<div className={`w-40 h-40 lg:w-64 lg:h-64 p-6 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] shadow-xl shadow-emerald-500/5 border border-zinc-200 dark:border-zinc-800 mb-6 lg:mb-8 relative z-10 group transition-colors ${
            selectedVariant === 'white' ? 'bg-zinc-900 dark:bg-black' :
            selectedVariant === 'black' ? 'bg-zinc-50 dark:bg-zinc-200' :
            'bg-white dark:bg-zinc-900'
          }`}>
            <img src={`/open-crypto-icons/${getVariantDir(selectedVariant)}/${icon.symbol.toLowerCase()}.svg`} alt={icon.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
          </div>'''
content = content.replace(old_large_preview, new_large_preview)

# 4. Update the small variant boxes
old_variant_boxes = '''<div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <CryptoIcon symbol={icon.symbol.toLowerCase()} variant="colored" size={48} className="drop-shadow-sm mb-3" />
                <span className="text-xs font-mono text-zinc-500">colored</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <CryptoIcon symbol={icon.symbol.toLowerCase()} variant="black" size={48} className="mb-3 opacity-80" />
                <span className="text-xs font-mono text-zinc-500">black</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-900 dark:bg-zinc-950 rounded-xl border border-zinc-800 shadow-inner">
                <CryptoIcon symbol={icon.symbol.toLowerCase()} variant="white" size={48} className="mb-3" />
                <span className="text-xs font-mono text-zinc-400">white</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <CryptoIcon symbol={icon.symbol.toLowerCase()} variant="outline" size={48} className="mb-3 opacity-70" />
                <span className="text-xs font-mono text-zinc-500">outline</span>
              </div>
            </div>'''
new_variant_boxes = '''<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {['colored', 'black', 'white', 'outline'].map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v as any)}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border shadow-inner transition-all hover:scale-105 active:scale-95 ${
                    selectedVariant === v ? 'ring-2 ring-emerald-500 border-emerald-500 dark:border-emerald-500' : 'border-zinc-200 dark:border-zinc-700'
                  } ${
                    v === 'white' ? 'bg-zinc-900 dark:bg-zinc-950' : 
                    v === 'black' ? 'bg-zinc-50 dark:bg-zinc-200' : 
                    'bg-white dark:bg-zinc-900'
                  }`}
                >
                  <CryptoIcon symbol={icon.symbol.toLowerCase()} variant={v as any} size={40} className={`mb-3 ${v==='black'?'opacity-80':''} ${v==='outline'?'opacity-70':''}`} />
                  <span className={`text-xs font-mono ${v==='white'?'text-zinc-400': v==='black'?'text-zinc-600 dark:text-zinc-800':'text-zinc-500'}`}>{v}</span>
                </button>
              ))}
            </div>'''
content = content.replace(old_variant_boxes, new_variant_boxes)

# 5. Update the code snippet string
old_code_snippet = '''{'<'}<span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> symbol="<span className="text-emerald-600 dark:text-green-400">{icon.symbol.toLowerCase()}</span>" variant="<span className="text-emerald-600 dark:text-green-400">colored</span>" size={'{'}48{'}'} {'/>'}'''
new_code_snippet = '''{'<'}<span className="text-blue-600 dark:text-blue-400">CryptoIcon</span> symbol="<span className="text-emerald-600 dark:text-green-400">{icon.symbol.toLowerCase()}</span>" variant="<span className="text-emerald-600 dark:text-green-400">{selectedVariant}</span>" size={'{'}48{'}'} {'/>'}'''
content = content.replace(old_code_snippet, new_code_snippet)

old_copy_code = '''navigator.clipboard.writeText(`import { CryptoIcon } from 'open-crypto-icons/react';\\n\\n<CryptoIcon symbol="${icon.symbol.toLowerCase()}" variant="colored" size={48} />`)'''
new_copy_code = '''navigator.clipboard.writeText(`import { CryptoIcon } from 'open-crypto-icons/react';\\n\\n<CryptoIcon symbol="${icon.symbol.toLowerCase()}" variant="${selectedVariant}" size={48} />`)'''
content = content.replace(old_copy_code, new_copy_code)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Replaced!")
