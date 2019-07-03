const { isPrime, removeNonChars } = require('./utils');
const fs = require('fs');

function buildDict(words) {
    const dict = {};
    words.forEach((word, i) => {
        if (word) {
            word = word.toLowerCase();
            let obj = dict[word];
            if (!obj) {
                dict[word] = obj = { word, count: 0, isPrime: false };
            }
            obj.count++;
        }
    });

    for (const obj of Object.values(dict)) {
        obj.isPrime = isPrime(obj.count);
    }
    return dict;
}

module.exports.getWordList = filePath => {
    if (fs.existsSync(filePath)) {
        const txt = fs.readFileSync(filePath, 'utf8');
        const words = txt.split(/[\s]/).map(removeNonChars);
        const dict = buildDict(words);
        return Object.values(dict)
    } else {
        throw new Error('File not found');
    }
}