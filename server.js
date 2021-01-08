require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const download = require("download");
const { nanoid } = require("nanoid");
const csv = require("csvtojson");

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send({
    message: "Welcome to the app!",
  });
});

app.post("/", async (req, res) => {
  const { select_fields, url } = req.body.csv;
  if (!url) {
    return res.send({
      message: "url cannot be empty!",
    });
  }
  await download(url, "downloads", {
    filename: "data.csv",
  });

  let json = await csv().fromFile("downloads/data.csv");

  const conversion_key = nanoid();
  if (!select_fields) {
    return res.send({
      conversion_key,
      json,
    });
  }

  json = json.map((obj) => {
    const data = {};

    select_fields.forEach((field) => {
      data[field] = obj[field];
    });

    Object.keys(data).forEach((key) => !data[key] && delete data[key]);
    return data;
  });

  return res.send({
    conversion_key,
    json,
  });
});

app.listen(port, () => {
  console.log(`App is listening now on port ${port}`);
});
