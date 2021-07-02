const zlib = require('zlib')
const fs = require('fs')

function decodeLevelString(string) {
    try {
        base64 = string.replace(/\+/g, '-')
        base64 = base64.replace(/\//g, '_')
        base64 = Buffer.from(base64, 'base64')
        return zlib.gunzipSync(base64).toString()
    } catch {
        return string
    }
}

function decodeLevelDesc(description) {
    try {
        return new Buffer.from(description, 'base64').toString('utf-8')
    } catch {
        return description
    }
}

function getLength(len) {
    switch (len) {
        case '0':
            return "tiny"
            break;
        case '1':
            return "Short"
            break;
        case '2':
            return "Medium"
            break;
        case '3':
            return "Long"
            break;
        case '4':
            return "XL"
            break;
        default:
            return null
    }
}

function calcLvlPass(pass) {
    if (!pass || pass == 0) return "No Pass";
    if (pass.length == 7) return pass.slice(1, 7)
    else return "Free copy"
}

var robtop = {
    parseString: function (string) {
        let response = string.split(':');
        let res = {};
        for (let i = 0; i < response.length; i += 2) {
            res[response[i]] = response[i + 1]
        }

        console.log(`[LOG] Converting ${res['k1'] ? res['k1'] : undefined} into a levelObject`)

        return {
            levelID: res['k1'],
            levelName: res['k2'],
            levelDescription: decodeLevelDesc(res['k3']),
            levelString: decodeLevelString(res['k4']),
            creator: res['k5'],
            creatorUserID: res['k6'],
            levelDifficulty: res['k7'],
            songIndex: res['k8'],
            rating: res['k9'],
            ratingSum: res['k10'],
            downloads: res['k11'],
            completes: res['k12'],
            isEditable: res['k13'],
            isVerified: res['k14'],
            isPublished: res['k15'],
            levelVersion: res['k16'],
            gameVersion: res['k17'],
            attempts: res['k18'],
            normalModePercentage: res['k19'],
            practiceModePercentage: res['k20'],
            levelType: res['k21'],
            likes: res['k22'],
            length: getLength(res['k23']),
            dislikes: res['k24'],
            demon: res['k25'],
            stars: res['k26'],
            featureScore: res['k27'],
            auto: res['k33'],
            replayString: decodeLevelString(res['k34']),
            isPlayable: res['k35'],
            jumps: res['k36'],
            requiredCoinsToUnlockLevel: res['k37'],
            isUnlocked: res['k38'],
            levelSize: res['k39'],
            buildVersion: res['k40'],
            levelPassword: calcLvlPass(res['k41']),
            uploadedLevelID: res['k42'],
            isTwoPlayer: res['k43'],
            songID: res['k45'],
            levelRevision: res['k46'],
            hasBeenAltered: res['k47'],
            objectCount: res['k48'],
            binaryVersion: res['k50'],
            Capacity001: res['k51'],
            Capacity002: res['k52'],
            Capacity003: res['k53'],
            Capacity004: res['k54'],
            creatorAccountID: res['k60'],
            totalCoins: res['k64'],
            areCoinsVerified: res['k65'],
            hasCoin1: res['k61'],
            hasCoin2: res['k62'],
            hasCoin3: res['k63'],
            requestedStars: res['k66'],
            capacityString: res['k67'],
            triggeredAntiCheat: res['k68'],
            containsHighObjectCount: res['k69'],
            newNormalModePercentage: res['k71'],
            LDM: res['k72'],
            toggleLDM: res['k73'],
            timelyID: res['k74'],
            isEpic: res['k75'],
            demonType: res['k76'],
            isGauntlet: res['k77'],
            isGauntlet2: res['k78'],
            unlisted: res['k79'],
            editorTimeCurrent: res['k80'],
            editorTimeCopies: res['k81'],
            levelFavourited: res['k82'],
            levelOrder: res['k83'],
            folder: res['k84'],
            clicks: res['k85'],
            attemptTime: res['k86'],
            levelSeed: res['k87'],
            personalBests: res['k88'],
            validCHK: res['k89'],
            newNormalModePercentage2: res['k90']



        }
    }
}

module.exports = robtop
