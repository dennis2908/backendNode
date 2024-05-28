const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379
  }
});

redisClient.on("error", (err) => console.log(err));
redisClient.connect();

module.exports = redisClient;
