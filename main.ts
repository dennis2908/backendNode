//use path module
const path = require("path");
//use express module
const express = require("express");

//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database

const expressGraphQL = require("express-graphql").graphqlHTTP;

const { buildSchema } = require("graphql"); // GraphQL schema

const app = express();

global.Promise = require("bluebird");

const jwt = require("jsonwebtoken");
const fs = require("fs");

var engine = require("ejs-blocks");

var ejs = require("ejs");

ejs.open = "{{";
ejs.close = "}}";

var session = require("express-session");

import { Send } from "./send/send.js";

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

app.use(cors());

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine

app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(bodyParser.json({ limit: "999990mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "999990mb", extended: true }));
//set folder public sebagai static folder untuk static file
app.use("/assets", express.static(__dirname + "/public"));

//route untuk homepage

var crud = require("./routes/crud");

var role = require("./routes/role");

var user = require("./routes/user");

var branch = require("./routes/branch");

var company = require("./routes/company");

var assignment = require("./routes/assignment");

// app.use('/graphql', expressGraphQL({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));

app.use("/crud", crud);

app.use("/role", role);

app.use("/user", user);

app.use("/branch", branch);

app.use("/company", company);

app.use("/assignment", assignment);

app.get("/login", (req, res) => {
  res.render("Login/index.ejs");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.post("/send", function (req, res) {
  const rabbit = new Send().execute(req.body);

  res.json({
    status: "OKE",
    statusCode: 201,
    message: "Message success send to rabbitmq server."
  });
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username == "console" && password == "myconsole") {
    req.session.username = username;
  }

  res.redirect("/");
});

app.post("/loginFrontEnd", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == "console" && password == "myconsole") {
    res.json(username);
  } else {
    res.json(false);
  }
});

app.listen(process.env.PORT || 8000, function () {
  console.log("server running on port 8000", "");
});
