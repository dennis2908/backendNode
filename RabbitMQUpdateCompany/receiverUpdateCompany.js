var amqp = require("amqplib/callback_api");

var express = require("express");

router = express.Router();

const pool = require("../database.js");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "update.company";

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        const data = JSON.parse(msg.content);

        pool.query(
          "update company set company_name=$1,address=$2,email=$3,m_branch=$4,phone=$5 where id = $6",
          [
            data.company_name,
            data.address,
            data.email,
            data.m_branch,
            data.phone,
            data.id
          ],
          (err, res) => {
            if (err) console.log(err);
          }
        );
      },
      {
        noAck: true
      }
    );
  });
});

module.exports = router;
