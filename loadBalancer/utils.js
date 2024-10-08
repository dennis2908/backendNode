

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("rabbitmq/rabbitmq.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const rabbitMQPackage = grpcObject.rabbitMQPackage;
const cluster = require("cluster")
const cpu = require("os").cpus().length

const dotenv = require("dotenv");



function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

exports.createRabbitUtil = (payload) => {
    ran_number = randomInteger(0,parseInt(process.env.grpc_clone_total)-1)

    let host = "localhost:"+(parseInt(process.env.grpc_start_server)+ran_number)

    const client = new rabbitMQPackage.RabbitMQ(host, grpc.credentials.createInsecure())

    client.CreaterabbitMQ({
        "queue": "save.company",
        "send" : JSON.stringify(payload)
      }, () => {
      
        console.log(host+" sent data company rabbitmq GRPC server to save the data " + JSON.stringify(payload))
      
      })
    
      client.CreaterabbitMQ({
        "queue": "email.company",
        "send" : JSON.stringify(payload)
      }, () => {
      
        console.log(host+"sent data company rabbitmq GRPC server to email" + JSON.stringify(payload))
      
      })

};

    