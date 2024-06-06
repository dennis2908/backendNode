exports.load = async function () {
  var amqp = require("amqplib/callback_api");

  const pool = require("../database.js");

  company = require("../Pusher/Company/PusherLoadAllData.js");

  amqp.connect("amqp://localhost", async function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(async function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "save.company";

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
          company.load_all_data();
        },
        {
          noAck: true
        }
      );
    });
  });
};
