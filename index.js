const express = require('express');
const app = express();
const port = 3000;
const { getWordList, getWordListV2 } = require('./businessLogic');

let words;
app.get('/api/v1/words', (req, res) => {
    if (!words) {
        words = getWordList('./data/pg10.txt');
    }
    res.send(words)
});

app.get('/api/v2/words', async (req, res) => {
    res.send(await getWordListV2('./data/pg10.txt'))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));