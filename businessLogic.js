const { isPrime, removeNonChars, readFile } = require('./utils');
const fs = require('fs');

function buildDict(words) {
    const dict = {};
    words.forEach(word => {
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

const dictOf = {};
module.exports.getWordListV2 = async filePath => {
    if (fs.existsSync(filePath)) {
        dictOf[filePath] = dictOf[filePath] || {};
        const { promise, dict } = dictOf[filePath];
        if (!promise && !dict) {
            let resolver;
            dictOf[filePath].promise = new Promise((resolve) => resolver = resolve);
            const txt = await readFile(filePath);
            const words = txt.split(/[\s]/).map(removeNonChars)
            const dict = buildDict(words)
            const res = dictOf[filePath].dict = Object.values(dict);
            setTimeout(() => resolver(res));
            return res;
        } else if (dict) {
            return dict;
        } else {
            return await promise;
        }
    } else {
        throw new Error('File not found');
    }
}