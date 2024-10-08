var express = require("express");
var client = require("prom-client");

const app = express();

exports.restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: [ "operation", "success", "method", "route", "status_code"],
});

exports.databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});


  exports.startMetricsServer  = (async function(req, res){
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    // log.info("Metrics server started at http://localhost:9100");
  });
})