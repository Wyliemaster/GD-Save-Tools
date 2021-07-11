const fs = require('fs');;
const zlib = require('zlib');
const config = require('../levels.json');

function Xor(key, string) {
    result = '';
    for (var index = 0; index < string.length; index++) {
        var input = string.charCodeAt(index);
        result += String.fromCharCode(input ^ key);
    }
    return result;
}

function decodeCCFile(save) {
    if (config.useAppData) {
        saveData = fs.readFileSync(`${process.env.LOCALAPPDATA}/GeometryDash/${save}`, 'utf-8')
        if (!fs.existsSync(`${process.env.LOCALAPPDATA}/GeometryDash/backup`))
            fs.mkdirSync(`${process.env.LOCALAPPDATA}/GeometryDash/backup`)
        fs.writeFileSync(`${process.env.LOCALAPPDATA}/GeometryDash/backup/${Date.now()}.CCGameManager.dat.bak`, saveData)
    }
    else {
        saveData = fs.readFileSync(`${__dirname}/../${save}`, "utf-8");
    }

    //check if the save file is already decoded so i don't try to decode a decoded version
    if (saveData.startsWith('<?xml')) { console.log('[LOG] your save is already decoded'); return saveData; }

    //decoding
    Xord = Xor(0xB, saveData)
    base64 = Xord.replace(/\+/g, '-')
    base64 = base64.replace(/\//g, '_')
    base64 = Buffer.from(base64, 'base64')
    result = zlib.gunzipSync(base64).toString()
    return result
}

function calculateLevelSeed(hasPlayed, clicks, percentage, seconds) {
    return 1482 * (hasPlayed + 1) + (clicks + 3991) * (percentage + 8354) + ((seconds + 4085) ** 2) - 50028039
}


let data = decodeCCFile('CCGameManager.dat');
GSRegex = new RegExp(`<k>GS_completed</k><d>(.*?)</d>`)
GS_completed = data.match(GSRegex)[1]

var starLoss = 0;
var demonLoss = 0;

for (let i = 0; i < config.levelIDs.length; i++) {
    try {
        // find GJGameLevel entries
        let regex = new RegExp(`<k>${config.levelIDs[i]}</k><d>(.*?)</d>`, 'g')
        let level = data.match(regex)


        // remove all GJGameLevel entries
        for (let l = 0; l < level.length; l++) {
            //get stats to deduct
            let stars = level[l].match(/<k>k26<\/k><i>([0-9]*?)<\/i>/)
            starLoss += parseInt(stars[1]);
            if (stars[1] == 10) demonLoss++;

            if (config.keepMetaData) {
                let percentages = level[l].replace(/<k>(k19|k20|k71|k90)<\/k><i>\d+<\/i>/g, '<k>$1</k><i>0</i>')
                percentages = percentages.replace(/<k>k88<\/k><s>(.*?)<\/s>/g, '<k>k88</k><s>0</s>')

                //getting level seed stats
                let clicks = level[l].match(/<k>k85<\/k><i>([0-9]*?)<\/i>/)[1]
                let attemptTime = level[l].match(/<k>k86<\/k><i>([0-9]*?)<\/i>/)[1]
                percentages = percentages.replace(/<k>k87<\/k><i>(.*?)<\/i>/g, `<k>k87</k><i>${calculateLevelSeed(1, clicks, 0, attemptTime)}</i>`)

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

try {
    console.log(`[LOG]: ${config.levelIDs.length} levels have been uncompleted | recalculating stats...`);

    GSValue = data.match(/<k>GS_value<\/k><d>(.*?)<\/d>/)[1]

    //lazy solution ik but idk
    oldStars = GSValue.match(/<k>6<\/k><s>(.*?)<\/s>/)[1]
    oldDemons = GSValue.match(/<k>5<\/k><s>(.*?)<\/s>/)[1]
    GSValue = GSValue.replace(`<k>6</k><s>${oldStars}</s>`, `<k>6</k><i>${oldStars - starLoss}</i>`)
    GSValue = GSValue.replace(`<k>5</k><s>${oldDemons}</s>`, `<k>5</k><i>${oldDemons - demonLoss}</i>`)


    data = data.replace(/<k>GS_value<\/k><d>(.*?)<\/d>/g, `<k>GS_value</k><d>${GSValue}</d>`)
} catch {
    return console.log(`[ERROR]: stat recalculation failed`)
}

console.log(`[LOG]: Stars Deducted: ${starLoss} | Demons Deducted: ${demonLoss}`)

if (config.useAppData) {
    fs.writeFileSync(`${process.env.LOCALAPPDATA}/GeometryDash/CCGameManager.dat`, data);
    if (fs.existsSync(`${process.env.LOCALAPPDATA}/GeometryDash/CCGameManager2.dat`))
        fs.unlinkSync(`${process.env.LOCALAPPDATA}/GeometryDash/CCGameManager2.dat`);
} else
    fs.writeFileSync(`${__dirname}/../build/CCGameManager.dat`, data);
