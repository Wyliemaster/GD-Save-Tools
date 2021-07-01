const fs = require('fs')
const crypto = require('./crypto.js')

const save = crypto.decodeCCFile('CCGameManager.dat')

let build = save.replace(/<k>GS_11<\/k><d>(.*?)<\/d><\/d><\/d><\/d>/g, '<k>GS_11</k><d />')

fs.writeFileSync('build/CCGameManager.dat', build)