var pg = require("pg");
var config = {
  user: "postgres",
  host: "127.0.0.1",
  database: "projectdb",
  password: "123456",
  port: 5432
};
var pool = new pg.Pool(config);
module.exports = pool;
