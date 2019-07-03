const express = require('express');
const app = express();
const port = 3000;
const { getWordList } = require('./businessLogic');

let words;
app.get('/api/words', (req, res) => {
    if (!words) {
        words = getWordList('./data/pg10.txt');
    }
    res.send(words)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));