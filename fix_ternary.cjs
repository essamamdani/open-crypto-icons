const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 pb-20">`;

const newStr = `        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6 pb-20">`;

const targetStr2 = `            </div>
          )}

        )}
      </div>`;

const newStr2 = `            </div>
          )}
          </>
        )}
      </div>`;

code = code.replace(targetStr, newStr);
code = code.replace(targetStr2, newStr2);
fs.writeFileSync('src/App.tsx', code);
