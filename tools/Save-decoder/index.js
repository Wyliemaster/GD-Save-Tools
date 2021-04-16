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

function decodeSave(fileName) {
    data = fs.readFileSync(__dirname + '/' + fileName, "utf-8") // Reads file and stores it in data
    Xord = Xor(0xB, data) // applies Xor to it
    base64 = Xord.replace(/\+/g, '-')
    base64 = base64.replace(/\//g, '_')
    base64 = Buffer.from(base64, 'base64') //buffers it from base64
    result = zlib.gunzipSync(base64).toString() //unzips with Gzip
    fs.writeFileSync(fileName + ' - decoded.xml', result) //writes a file with the unzipped file
    return console.log(Xord)
}

function decodeLevel(fileName) {
    data = fs.readFileSync(__dirname + '/' + fileName, "utf-8") // Reads file and stores it in data 
    base64 = data.replace(/\+/g, '-')
    base64 = base64.replace(/\//g, '_')
    base64 = Buffer.from(base64, 'base64') //buffers it from base64
    result = zlib.gunzipSync(base64).toString() //unzips with Gzip
    fs.writeFileSync(fileName + ' - decoded.xml', result) //writes a file with the unzipped file
}

/*function encodeSave(fileName) {
    data = fs.readFileSync(__dirname + '/' + fileName, "utf8");
    zipped = zlib.gzipSync(data, 'base64')
    base64 = new Buffer.from(zipped, "utf-8").toString('base64')
    base64 = base64.replace(/-/g, '+')
    base64 = base64.replace(/_/g, '/')
    done = Xor(0xB, base64)
    fs.writeFileSync(fileName + 'New.dat', done)
    return console.log('Save File Generated')
}

Encoding saves is broken :( will fix soon

*/

decodeSave('CCGameManager.dat')
decodeLevel('level.txt')
