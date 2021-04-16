const { once } = require('events');
const fs = require('fs');
const crypto = require('./crypto.js')

const save = crypto.decodeCCFile('CCGameManager.dat')

let GS_Completed = save.slice(save.search('<k>GS_completed</k>'), save.length)
GS_Completed = GS_Completed.slice(0, GS_Completed.search('</d>') + 4)

let GSGauntlet = save.slice(save.search('<k>GLM_16'), save.length)
GSGauntlet = GSGauntlet.slice(0, GSGauntlet.search('</d></d>') + 8)

GSGauntlet = GSGauntlet.replace(/<\/d><k>/g, '</d>,+,<k>')
GSGauntlet = GSGauntlet.replace('<k>GLM_16</k><d>', '')
let gauntletLevelsArr = GSGauntlet.split(',+,')

let level = '';
let percent = '';
let beatenLevels = [];

for (let i = 0; i < gauntletLevelsArr.length; i++) {
    level = gauntletLevelsArr[i].slice(3, gauntletLevelsArr[i].search('</k>'))
    percent = gauntletLevelsArr[i].slice(gauntletLevelsArr[i].search('>k19') + 11)
    percent = percent.slice(0, percent.search('</i>'))
    if (percent === '100') {
        beatenLevels.push(level)
    }

}

var string = ''
for (let i = 0; i < beatenLevels.length; i++) {
    if (GS_Completed.search(`g_${beatenLevels[i]}`) == -1) {
        string += `<k>g_${beatenLevels[i]}</k><s>1</s>`
        if (GS_Completed.search(`gstar_${beatenLevels[i]}`) == -1) {
            string += `<k>gstar_${beatenLevels[i]}</k><s>1</s>`
        }
    }

}

let fix = save.replace('<k>GS_completed</k><d>', `<k>GS_completed</k><d>${string}`)
fs.writeFileSync('build/CCGameManager.dat', fix)
