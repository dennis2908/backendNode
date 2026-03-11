const express = require("express");

const app = express();

var receiver = require("./receiverSaveCompany.js");
receiver.load();

app.listen(process.env.PORT || 8009, function () {
  console.log("server running on port 8009", "");
});
