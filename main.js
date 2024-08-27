//use path module
const path = require("path");
//use express module
const express = require("express");

//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database


const client = require("prom-client");

const memoryUsage = require("process").memoryUsage;
const cpus = require("os").cpus;


const metric_label_enum = {
  PATH: "path",
  METHOD: "method",
  STATUS_CODE: "status_code",
};
// * CREATES A NEW CLASS FOR ASSIGNING LABELS TO VARIOUS METRICS
class MetricLabelClass {
  constructor(method, pathname, statusCode) {
    this.method = method;
    this.path = pathname;
    this.status_code = statusCode;
  }
}
// * REGISTERS A NEW PROMETHEUS CLIENT
const register = new client.Registry();
// * The http_request counter for measuring the total no of requests made to the application
const http_request_total = new client.Counter({
  name: "node_http_request_total",
  help: "The total number of HTTP requests received",
  labelNames: [
    metric_label_enum.PATH,
    metric_label_enum.METHOD,
    metric_label_enum.STATUS_CODE,
  ],
});
// * The http_response rate histogram for measuring the response rates for each http request
const http_response_rate_histogram = new client.Histogram({
  name: "node_http_duration",
  labelNames: [
    metric_label_enum.PATH,
    metric_label_enum.METHOD,
    metric_label_enum.STATUS_CODE,
  ],
  help: "The duration of HTTP requests in seconds",
  buckets: [
    0.0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3,
    1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 10,
  ],
});

const dataPrometheus = require("./utils/metrics");
// * The node_js memory guage for measuring the memory of the application in use
const nodejs_memory = new client.Gauge({
  name: "node_memory_usage_bytes",
  help: "Current memory usage of the Node.js process in bytes",
});
// * The node_js CPU usage guage for measuring the memory of the application in use
const nodejs_cpu_usage = new client.Gauge({
  name: "node_cpu_usage_percent",
  help: "CPU utilization of the Node.js process in percentage",
});

client.collectDefaultMetrics({
  register: register,
  prefix: "node_", // * Prefixes the default app metrics name with the specified string
});

// * Registers the HTTP request counter metric
register.registerMetric(http_request_total);
// * Registers the HTTP response rate metric
register.registerMetric(http_response_rate_histogram);
// * Registers the Node Js memory guage metric
register.registerMetric(nodejs_memory);
// * Registers the Node Js cpu usage guage metric
register.registerMetric(nodejs_cpu_usage);

register.registerMetric(dataPrometheus.restResponseTimeHistogram);

/**
 * Calculates the current CPU usage
 * @returns number
 */
const calculate_cpu_usage = () => {
  const previousTotalTime = process.hrtime()[0]; // Store previous total CPU time

  // Get current CPU usage data
  const cpusData = cpus();

  // Calculate cumulative CPU times
  const currentTotalTime = cpusData.reduce(
    (acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0),
    0
  );

  // Calculate CPU usage based on time elapsed and total CPU time
  const idleTime = currentTotalTime - previousTotalTime;
  const cpuUsage = 100 - (idleTime / currentTotalTime) * 100;

  // Store current total CPU time for the next calculation
  process.hrtime()[0] = currentTotalTime;

  return cpuUsage;
};


require("dotenv").config();

const mongoose = require("mongoose");
const mongoString = process.env.MONGO_URL;

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));

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

app.post("/send", function (req, res) {
  const rabbit = new Send().execute(req.body);

  res.json({
    status: "OKE",
    statusCode: 201,
    message: "Message success send to rabbitmq server."
  });
});

app.get("/metrics", async (req, res, next) => {
  res.setHeader("Content-type", register.contentType);
  res.send(await register.metrics());
  next();
});

app.use("/crud", crud);

app.use("/role", role);

app.use("/user", user);

app.use("/branch", branch);

app.use("/company", company);

app.use("/assignment", assignment);

app.use((req, res, next) => {
  // Get's the Req URL object
  const req_url = new URL(req.url, `http://${req.headers.host}`);
  // Start's the prom-client histogram timer for the request
  const endTimer = http_response_rate_histogram.startTimer();

  //Collect's the memory usage before processing the requests
  const used_memory_before = memoryUsage().rss;
  //Collect's the CPU usage before processing the requests
  const used_cpu_before = calculate_cpu_usage();

  // Copies the original res.send function to a variable
  const original_res_send_function = res.send;

  // Creates a new send function with the functionality of ending the timer, and incrementing the http_request_total metric whenever the response.send function is called
  const res_send_interceptor = function (body) {
    // Ends the histogram timer for the request
    const timer = endTimer(
      new MetricLabelClass(req.method, req_url.pathname, res.statusCode)
    );
    console.log(`HTTP request took ${timer} seconds to process`);

    //Collect's the memory usage after processing the requests
    const used_memory_after = memoryUsage().rss;
    //Collect's the CPU usage after processing the requests
    const used_cpu_after = calculate_cpu_usage();

    // Increment the http_request_total metric
    http_request_total.inc(
      new MetricLabelClass(req.method, req_url.pathname, res.statusCode)
    );

    // Update the nodejs_memory guage with the differences in the memory usage
    nodejs_memory.set(used_memory_after - used_memory_before);
    // Update the nodejs_cpu_usage guage with the differences in the cpu usage
    nodejs_cpu_usage.set(used_cpu_after - used_cpu_before);

    // Calls the original response.send function
    original_res_send_function.call(this, body);
  };

  // Overrides the existing response.send object/property with the function defined above
  res.send = res_send_interceptor;
  next();
});

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

app.listen(process.env.PORT || 8000, function () {
  console.log("server running on port 8000", "");
});
