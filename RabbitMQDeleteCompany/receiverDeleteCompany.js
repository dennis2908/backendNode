var amqp = require("amqplib/callback_api");

var express = require("express");

router = express.Router();

const pool = require("../database.js");

company = require("../Pusher/Company/PusherLoadAllData.js");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "delete.company";

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        const id = msg.content;

        pool.query("delete from company where id = " + id, (err, res) => {
          if (err) console.log(err);
        });
        company.load_all_data();
      },
      {
        noAck: true
      }
    );
  });
});

module.exports = router;
