const express = require("express");

const app = express();
var receiver = require("./receiverUpdateCompany.js");
receiver.load();

app.listen(process.env.PORT || 8010, function () {
  console.log("server running on port 8010", "");
});
