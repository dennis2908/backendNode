exports.load = async function () {
  var amqp = require("amqplib/callback_api");

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
        async function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          const id = msg.content.toString();

          const deleteComp = async function (data) {
            await sleep(3000);
            console.log(1212, data);
            pool.query("delete from company where id = " + data, (err, res) => {
              if (err) console.log(err);
            });
          };

          const celery = require("celery-node");

          const sleep = require("sleep-promise");

          const worker = celery.createWorker(
            "amqp://guest:guest@localhost:5672//",
            "amqp://localhost"
          );
          worker.register("delete.company", deleteComp(id));
          worker.start();

          company.load_all_data();
        },
        {
          noAck: true
        }
      );
    });
  });
};
