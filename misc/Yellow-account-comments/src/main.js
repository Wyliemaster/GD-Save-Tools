const crypto = require(__dirname + '/crypto.js')
const fs = require('fs')

try {
    let save = crypto.decodeSave('CCGameManager.dat')

    if (save.search('<k>0</k><d><k>kCEK</k><i>4</i><k>k2</k><s>Unknown</s><k>k5</k><s>-</s>') != '-1') {

        let start = save.slice(save.search('<k>0</k><d><k>kCEK</k><i>4</i><k>k2</k><s>Unknown</s>'), save.length)
        let end = start.search('</d>') + 4;
        let data = start.slice(0, end)

        console.log('Removing Yellow Account Comments...')

        let saveEdit = save.replace(data, '')

        fs.writeFileSync('build/CCGameManager.dat', saveEdit)
        return console.log('Yellow Account Comments removed successfully!')

    } else {

        let saveEdit = save.replace('<k>GLM_03</k><d>', '<k>GLM_03</k><d><k>0</k><d><k>kCEK</k><i>4</i><k>k2</k><s>Unknown</s></d>')
        fs.writeFileSync('build/CCGameManager.dat', saveEdit)
        return console.log('Yellow account comments injected')

    }
}
catch (e) {
    if (e) return console.log('Please supply a valid save file\n\n', e)
}
