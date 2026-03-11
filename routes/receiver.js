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
    var queue = "hello";
    var msg = "Hello world";

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        const data = JSON.parse(msg.content);

        pool.query(
          "insert into company(company_name,address,email,m_branch,phone) values ($1,$2,$3,$4,$5)",
          [
            data.company_name,
            data.address,
            data.email,
            data.m_branch,
            data.phone
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
