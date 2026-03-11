exports.load = async function () {
  var amqp = require("amqplib/callback_api");

  const transporter = require("../mailer.js");

  const { Queue, Worker } = require("bullmq");
  const redisOptions = { host: "localhost", port: 6379 };

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
        async function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          const data = JSON.parse(msg.content);

          const EmailCompany = new Queue("EmailCompany", {
            connection: redisOptions
          });

          const job = await EmailCompany.add("EmailCompany", data, {
            delay: 2000
          });

          const worker = new Worker(
            "EmailCompany",
            async (data) => {
              const { company_name, email } = data.data;

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
            { connection }
          );

          worker.on("completed", (job) => {
            console.log(`Job ${job.id} completed successfully`);
          });

          worker.on("failed", (job, err) => {
            console.error(`Job ${job.id} failed with error ${err.message}`);
          });
        },
        {
          noAck: true
        }
      );
    });
  });
};
