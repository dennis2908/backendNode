//use express module
const express = require("express");

//use bodyParser middleware

const app = express();

var receiver = require("./cronJobFunc.js");

receiver.load();

app.listen(process.env.PORT || 8013, function () {
  console.log("server running on port 8013", "");
});
