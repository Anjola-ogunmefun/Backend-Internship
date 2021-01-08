const express = require('express');
const bodyParser = require('body-parser')
const download = require('download')
const FileType = require('file-type');
const path = require('path')
const mime = require('mime-types')

const app = express();

const port = 6000;
const csv = require('csvtojson')
const fs = require('fs-extra')
const results = [];

app.use(bodyParser.json());
app.use(express.json());

// app.get('/', (req, res) => {
//     console.log('it works')
//     res.send("hey")
// })

app.post('/', async (req, res) => {
    const { select_field, url }= req.body.csv
    if(!url){
        return res.send({
            error: true,
            message:"url cannot be empty!"
        })
    }
    await download(url, "downloads" , {
        filename:"data.csv"
    });

  const mimeType = mime.contentType('downloads/data.csv') 
  console.log('feed back', mimeType);
    if(mimeType !== 'text/csv'){
        return res.send({
            error: true,
            message: "Url does not contain a valid csv file"
        })
    }

    const jsonArray=await csv().fromFile('downloads/data.csv');
    console.log({jsonArray})


    console.log('result', req.body.csv)
})

app.listen(port, () => {
    console.log(`App is listening now on port ${port}`)
})