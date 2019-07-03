const fs = require('fs');

module.exports.isPrime = num => {
    if (num < 2) {
        return false;
    }
    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

module.exports.removeNonChars = word => {
    const regex = /[_\W0-9]/g;
    let result = word.replace(regex, '');
    return result;
}

module.exports.readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        let words = [];
        const readStream = fs.createReadStream(filePath);
        readStream.on('data', chunk => words.push(chunk.toString()));
        readStream.on('close', () => resolve(words.join(' ')));
    });
}