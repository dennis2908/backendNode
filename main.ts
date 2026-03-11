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

const dotenv = require('dotenv');

dotenv.config();

const passport    = require('passport');

require('./passport');

var session = require("express-session");

const cookieParser = require('cookie-parser');

app.use(cookieParser('MY SECRET'));


app.use(session({
	secret: process.env.SESSION_SECRET_KEY,
	resave: false,
	saveUninitialized: false,
  }));
app.use(express.static(__dirname + "/public"));
var cors = require("cors");

app.use(cors({ origin:true, credentials:true }))

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

app.use("/branch", passport.authenticate('jwt', {session: false}),branch);

app.use("/company", company);

app.use("/assignment", assignment);


app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


app.listen(process.env.PORT || 8000, function () {
  console.log("server running on port 8000", "");
});
