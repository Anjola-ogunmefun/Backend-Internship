const express = require('express');
const app = express();

const port = 6000;
const csv = require('csv-parser')
const fs = require('fs-extra')
const results = [];

app.use(express.json());

app.get('/', (req, res) => {
    console.log('it works')
    res.send("hey")
})

app.post('/')



// fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//     // [
//     //   { NAME: 'Daffy Duck', AGE: '24' },
//     //   { NAME: 'Bugs Bunny', AGE: '22' }
//     // ]
//   });

app.listen(port, () => {
    console.log(`App is listening now on port ${port}`)
})