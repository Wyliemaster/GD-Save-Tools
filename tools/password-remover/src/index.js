const fs = require('fs');
const crypto = require('./crypto.js')

const data = crypto.decodeCCFile('CCGameManager.dat');

if (data.search('GJA_002') == -1)
    return console.log('[LOG] GJA_002 cannot be found')

let build = data.replace(/<k>GJA_002<\/k><s>(.*?)<\/s>/g, '<k>GJA_002</k><s></s>')



console.log(`[LOG] Your save can be found in 'build/safe_CCGameManager.dat'`)

fs.writeFileSync('build/safe_CCGameManager.dat', build)
