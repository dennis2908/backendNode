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
      var queue = "update.company";

      channel.assertQueue(queue, {
        durable: false
      });

      channel.consume(
        queue,
        async function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          const data = JSON.parse(msg.content);

          const UpdateCompany = new Queue("UpdateCompany", {
            connection: redisOptions
          });

          const job = await UpdateCompany.add("UpdateCompany", data, {
            delay: 2000
          });

          const worker = new Worker(
            "UpdateCompany",
            async (data) => {
              pool.query(
                "update company set company_name=$1,address=$2,email=$3,m_branch=$4,phone=$5 where id = $6",
                [
                  data.data.company_name,
                  data.data.address,
                  data.data.email,
                  data.data.m_branch,
                  data.data.phone,
                  data.data.id
                ],
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
