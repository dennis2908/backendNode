const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

console.log(process.env);

var Pusher = require("pusher"); //create a instance of pusher using your credentials
var pusher = new Pusher({
  appId: process.env.pusher_appId,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  useTLS: true
});

module.exports = pusher;
