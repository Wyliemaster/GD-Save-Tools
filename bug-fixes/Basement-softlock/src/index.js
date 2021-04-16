const crypto = require(__dirname + '/crypto.js')
const fs = require('fs')

//decoding save
let save = crypto.decodeSave('CCGameManager.dat')

//looking for the flag so i don't write it into save data twice
if (save.search('ugv_13') != '-1') {
    return console.log('[LOG] The Demon Freed flag is already set')
}

//looking for the keys to unlock the door
if (save.search('ugv_14') == '-1' || save.search('ugv_15') == '-1' || save.search('ugv_16') == '-1') {
    return console.log('[LOG] You have not collected each demon key')
}

//injection into the save file
injection = save.replace('<k>ugv_16</k><s>1</s>', '<k>ugv_16</k><s>1</s><k>ugv_13</k><s>1</s>')

//writing fixes into a new file
fs.writeFileSync('build/CCGameManager.dat', injection)
