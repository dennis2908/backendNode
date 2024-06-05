const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

var pg = require("pg");
var config = {
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  password: process.env.db_password,
  port: process.env.db_port
};
var pool = new pg.Pool(config);
module.exports = pool;
