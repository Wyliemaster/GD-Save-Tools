const fs = require('fs')
const crypto = require('./crypto.js')
const robtop = require('./parseString.js')

const save = crypto.decodeCCFile('CCGameManager.dat')

if (save.search('<k>GLM_03</k><d />') != -1) return console.log("[LOG] Cant find any online levels")
// wanted to use this RegExp but larger OnlineLevelDicts seem to break
// let data = save.match(/<k>GLM_03<\/k>(.*?)(?=<k>GLM_)/)
let onlineLevels = save.slice(save.search("<k>GLM_03</k>"), save.search("<k>GLM_10</k>"))
let onlineLevelsArr = onlineLevels.split(/<k>([0-9]*?)<\/k>/)

let levelData = [];
let lvlTrim = []
let string = ''

for (let i = 1; i < onlineLevelsArr.length; i++) {
    //popping all the elements from the varible to stop duplicates
    lvlTrim = []; string = ''
    //get an array element for each key:value pair
    lvl = onlineLevelsArr[i + 1].match(/<k>k([0-9]*?)<\/k><[a-z]>(.*?)<\/[a-z]>/g)

    //converting them to roberts scheme (sorry i couldnt think of a way to make it an object)
    for (let o = 0; o < lvl.length; o++) {
        regex = lvl[o].match(/<k>k([0-9]*?)<\/k><[a-z]>(.*?)<\/[a-z]>/)
        lvlTrim.push(`k${regex[1]}:${regex[2]}`)
    }
    //combining the elements
    for (let p = 0; p < lvlTrim.length; p++) {
        string += `${lvlTrim[p]}:`
    }
    //add to the big boi array

    levelObj = robtop.parseString(string)

    levelData.push({
        ID: onlineLevelsArr[i],
        levelData: levelObj
    })
    i++
}

console.log(`[LOG] Parsing finished - writing OnlineLevels.json`)

let theJSON = JSON.stringify(levelData, null, 4)
fs.writeFileSync('./OnlineLevels.json', theJSON)


