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
    decodeSave: function (save) {
        //check if the save file is already decoded so i don't try to decode a decoded version
        if (save.slice(0, 20) == '<?xml version="1.0"?>') { console.log('[LOG] your save is already decoded'); return save; }

        //decoding
        data = fs.readFileSync(__dirname + '/../' + save, "utf-8")
        Xord = Xor(0xB, data)
        base64 = Xord.replace(/\+/g, '-')
        base64 = base64.replace(/\//g, '_')
        base64 = Buffer.from(base64, 'base64')
        result = zlib.gunzipSync(base64).toString()
        return result
    }
}

module.exports = crypto