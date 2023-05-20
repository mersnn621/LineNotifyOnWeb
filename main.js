const express = require("express");
const request = require('request');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    console.log(req.body)
  let options = {
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      'Authorization': `Bearer ${req.body.Token}`
    },
    form: {
        'message':req.body.Message
    }
  };
  console.log(req.body);

  request.post(options, (error, response, body) => {
  });
});

app.listen(3000);
