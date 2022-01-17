// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFileSync, writeFileSync } = require('fs');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { scripts, ...safePackageJson } = JSON.parse(readFileSync('package.json', 'utf8'));

writeFileSync('package.json', JSON.stringify(safePackageJson, null, 4), 'utf8');
