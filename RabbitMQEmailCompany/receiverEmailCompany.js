var amqp = require("amqplib/callback_api");

var express = require("express");

router = express.Router();

const transporter = require("../mailer.js");

amqp.connect("amqp://localhost", async function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(async function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "email.company";

    channel.assertQueue(queue, {
      durable: false
    });

    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        const data = JSON.parse(msg.content);

        const { company_name, email } = data;
        const mailData = {
          from: "manullang_d@yahoo.com",
          to: email,
          subject: "Hello, " + company_name,
          text: "Hello, " + company_name,
          html:
            "<b>Hello " +
            company_name +
            "! </b><br> Welcome to our company<br/>"
        };

        transporter.sendMail(mailData, (error, info) => {
          if (error) {
            return console.log(error);
          }
          res
            .status(200)
            .send({ message: "Mail send", message_id: info.messageId });
        });
      },
      {
        noAck: true
      }
    );
  });
});

module.exports = router;
