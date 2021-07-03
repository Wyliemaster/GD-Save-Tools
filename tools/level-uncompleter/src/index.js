const fs = require('fs');
const crypto = require('./crypto.js')
const config = require('../levels.json')

let data = crypto.decodeCCFile('CCGameManager.dat');

GSRegex = new RegExp(`<k>GS_completed</k><d>(.*?)</d>`)
GS_completed = data.match(GSRegex)[1]

for (let i = 0; i < config.levelIDs.length; i++) {
    try {
        // find GJGameLevel entries
        let regex = new RegExp(`<k>${config.levelIDs[i]}</k><d>(.*?)</d>`, 'g')
        let level = data.match(regex)


        // remove all GJGameLevel entries
        for (let l = 0; l < level.length; l++) {
            if (config.keepMetaData) {
                let percentages = level[l].replace(/<k>(k19|k20|k71|k90)<\/k><i>\d+<\/i>/g, '<k>$1</k><i>0</i>')
                percentages = percentages.replace(/<k>k88<\/k><s>(.*?)<\/s>/g, '<k>k88</k><s>0</s>')
                data = data.replace(level[l], percentages)
            } else {

                data = data.replace(level[l], '')
            }
        }

        let completedRegex = new RegExp(`<k>([a-z]*?)_${config.levelIDs[i]}</k><s>1</s>`, 'g')
        let levels = GS_completed.match(completedRegex)

        // remove from GSCompleted

        for (let c = 0; c < levels.length; c++) {
            data = data.replace(levels[c], '')
        }

        // removing stars if they exist
        try {
            let starRegex = new RegExp(`<k>${config.levelIDs[i]}</k><s>([0-9]*?)</s>`, 'g')
            let starLevels = data.match(starRegex)

            for (let s = 0; s < starLevels.length; s++) {
                data = data.replace(starLevels[s], '')
            }

        } catch {
            console.log(`[LOG]: Unable to find stars for: ${config.levelIDs}`)
        }

        console.log(`[LOG]: successfully uncompleted: ${config.levelIDs[i]}`)

    } catch {
        console.log(`[ERROR]: unable to uncomplete: ${config.levelIDs[i]}`)
        continue;
    }
}
fs.writeFileSync(`${__dirname}/../build/CCGameManager.dat`, data)
