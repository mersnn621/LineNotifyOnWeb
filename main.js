const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');
const { RateLimiterMemory } = require("rate-limiter-flexible");
const app = express();



app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json());

const opts = {
  points: 3, 
  duration: 60, 
};

const rateLimiter = new RateLimiterMemory(opts);

function getip(req) {
  if (req.headers['x-forwarded-for']) {
    return req.headers['x-forwarded-for'];
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
  return '0.0.0.0';
};

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  
  rateLimiter.consume(getip(req), 1)
    console.log(req.body)
  let options = {
    url: 'https://notify-api.line.me/api/notify',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    },
    form: {
        'message':req.body.message
    }
  };
  console.log(req.body);

  request.post(options, (error, response, body) => {
  });
});

app.listen(80);
