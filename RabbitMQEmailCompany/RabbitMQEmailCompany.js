const express = require("express");

const app = express();

var receiver = require("./receiverEmailCompany.js");
receiver.load();

app.listen(process.env.PORT || 8011, function () {
  console.log("server running on port 8011", "");
});
