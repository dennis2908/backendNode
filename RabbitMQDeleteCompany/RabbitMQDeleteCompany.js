const express = require("express");

const app = express();

var receiver = require("./receiverDeleteCompany.js");
receiver.load();

app.listen(process.env.PORT || 8012, function () {
  console.log("server running on port 8012", "");
});
