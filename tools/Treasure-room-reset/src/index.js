const fs = require('fs')
const crypto = require('./crypto.js')

const save = crypto.decodeCCFile('CCGameManager.dat')

console.log('[LOG] searching Treasure Room')

let GS_19 = save.slice(save.search('<k>GS_19</k>'), save.search('<k>GS_20</k>'))

// The Games stat calculation will fix it and give you all your demon keys back with no chest
console.log('[LOG] Reverting Chests')
let fix = save.replace(GS_19, '<k>GS_19</k><d />')

console.log('[LOG] Generating New CCGameManager.dat')
fs.writeFileSync('build/CCGameManager.dat', fix)

