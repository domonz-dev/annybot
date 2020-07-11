require("./bot.js");

const http = require("http");
const express = require("express");
const app = express();
/*global Set, Map*/
app.use(express.static("public"));

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://testbot906e4.glitch.me/`);
}, 280000)
