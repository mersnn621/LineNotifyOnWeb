const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

function getip(req) {
  if (req.headers["x-forwarded-for"]) {
    return req.headers["x-forwarded-for"];
  }
  if (req.connection && req.connection.remoteAddress) {
    return req.connection.remoteAddress;
  }
  if (req.connection.socket && req.connection.socket.remoteAddress) {
    return req.connection.socket.remoteAddress;
  }
  if (req.socket && req.socket.remoteAddress) {
    return req.socket.remoteAddress;
  }
  return "0.0.0.0";
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(`${req.body},IP:${getip(req)}`);
  let options = {
    url: "https://notify-api.line.me/api/notify",
    headers: {
      Authorization: `Bearer ${req.body.token}`,
    },
    form: {
      message: req.body.message,
    },
  };
  console.log(req.body);

  request.post(options, (error, response, body) => {});
});

app.listen(80);
