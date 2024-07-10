exports.load = async function () {
  var amqp = require("amqplib/callback_api");

  const pool = require("../database.js");

  company = require("../Pusher/Company/PusherLoadAllData.js");

  const { Queue, Worker } = require("bullmq");
  const redisOptions = { host: "localhost", port: 6379 };

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

          const DeleteCompany = new Queue("DeleteCompany", {
            connection: redisOptions
          });

          console.log(12122, id);

          const job = await DeleteCompany.add("DeleteCompany", id, {
            delay: 2000
          });

          const worker = new Worker(
            "DeleteCompany",
            async (data) => {
              pool.query(
                "delete from company where id = " + data.data,
                (err, res) => {
                  if (err) console.log(err);
                }
              );
            },
            { connection }
          );

          worker.on("completed", (job) => {
            console.log(`Job ${job.id} completed successfully`);
          });

          worker.on("failed", (job, err) => {
            console.error(`Job ${job.id} failed with error ${err.message}`);
          });

          company.load_all_data();
        },
        {
          noAck: true
        }
      );
    });
  });
};
