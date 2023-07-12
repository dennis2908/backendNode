var pg = require('pg')
var config = {
  user: 'postgres',
  host: 'localhost',
  database: 'angular',
  password: '12345',
  port: 5432
 }
var pool = new pg.Pool(config);
module.exports = pool;