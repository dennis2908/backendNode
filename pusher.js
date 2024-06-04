var Pusher = require("pusher"); //create a instance of pusher using your credentials
var pusher = new Pusher({
  appId: "705473",
  key: "b9e4d6190581d989a6e2",
  secret: "629f95f4aa4563d80845",
  cluster: "ap1",
  encrypted: true
});

module.exports = pusher;
