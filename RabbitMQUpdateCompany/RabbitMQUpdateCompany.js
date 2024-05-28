//use path module
const path = require("path");
//use express module
const express = require("express");

//use bodyParser middleware

const app = express();

const fs = require("fs");

var session = require("express-session");

app.use(
  session({
    secret: "32832113209138209132890oaejlkewjlkweqjlkweqjlkqewqewljkljk",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(253402300000000)
    }
  })
);

app.use(express.static(__dirname + "/public"));
var cors = require("cors");

var corsMiddleware = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );

  next();
};

app.use(cors());

app.use(corsMiddleware);

//route untuk homepage

var receiver = require("./receiverUpdateCompany.js");

app.use("/", receiver);

app.listen(process.env.PORT || 8010, function () {
  console.log("server running on port 8010", "");
});
