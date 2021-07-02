const zlib = require('zlib')
const fs = require('fs')

function Xor(key, string) {
    result = '';
    for (var index = 0; index < string.length; index++) {
        var input = string.charCodeAt(index);
        result += String.fromCharCode(input ^ key);
    }
    return result;
}

var crypto = {
    decodeCCFile: function (save) {
        data = fs.readFileSync(__dirname + '/../' + save, "utf-8")

        //check if the save file is already decoded so i don't try to decode a decoded version
        if (data.startsWith('<?xml')) { console.log('[LOG] your save is already decoded'); return data; }

        //decoding
        Xord = Xor(0xB, data)
        base64 = Xord.replace(/\+/g, '-')
        base64 = base64.replace(/\//g, '_')
        base64 = Buffer.from(base64, 'base64')
        result = zlib.gunzipSync(base64).toString()
        return result
    }
}

module.exports = crypto