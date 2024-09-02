const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("rabbitmq.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const rabbitMQPackage = grpcObject.rabbitMQPackage;
var amqp = require("amqplib/callback_api");

const server = new grpc.Server();

let rabbitmq = [
  { id: 1, queue: 'Note 1', send : ""}
]

server.addService(rabbitMQPackage.RabbitMQ.service,
  {
      "CreaterabbitMQ": CreaterabbitMQ,
   });

function CreaterabbitMQ (call, callback) {
  const rabbitMQ = call.request;
  console.log(13232123,rabbitMQ.send);
  console.log(13232123,rabbitMQ.queue);
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = rabbitMQ.queue;

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(rabbitMQ.send));
      console.log(" [x] Sent %s", rabbitMQ.send);
    });
  });
  callback(null, { rabbitmq });
}

  server.bindAsync(
    "127.0.0.1:50000",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server at port:", port);
      console.log("Server running at http://127.0.0.1:50000");
      // server.start();
    }
  );
