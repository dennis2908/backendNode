//use path module
const path = require("path");
//use express module
const express = require("express");

//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database

const expressGraphQL = require("express-graphql").graphqlHTTP;

const { buildSchema } = require("graphql"); // GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);
var coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/"
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/"
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/"
  }
];
var getCourse = function (args) {
  var id = args.id;
  return coursesData.filter((course) => {
    return course.id == id;
  })[0];
};
var getCourses = function (args) {
  if (args.topic) {
    var topic = args.topic;
    return coursesData.filter((course) => course.topic === topic);
  } else {
    return coursesData;
  }
};
var root = {
  course: getCourse,
  courses: getCourses
};
const app = express();

global.Promise = require("bluebird");

const jwt = require("jsonwebtoken");
const fs = require("fs");

var engine = require("ejs-blocks");

var ejs = require("ejs");

ejs.open = "{{";
ejs.close = "}}";

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

var crud = require("./routes/crud.js");

var role = require("./routes/role.js");

var user = require("./routes/user.js");

var branch = require("./routes/branch.js");

var company = require("./routes/company.js");

var assignment = require("./routes/assignment.js");

var receiver = require("./routes/receiver.js");

app.post("/send", function (req, res) {
  const rabbit = new Send().execute(req.body);

  res.json({
    status: "OKE",
    statusCode: 201,
    message: "Message success send to rabbitmq server."
  });
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.use("/", receiver);

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

app.listen(process.env.PORT || 8009, function () {
  console.log("server running on port 8009", "");
});
