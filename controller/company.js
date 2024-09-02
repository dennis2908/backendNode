const path = require("path");
var async = require("async");
var flash = require("express-flash-messages");
const express = require("express");
const app = express();
var async = require("async");

const format = require("pg-format");
const pool = require("../database.js");

const userlog = require("../mongo_models/user_log.js");

var amqp = require("amqplib/callback_api");

let redisClient = require("../redis/redis.js");

const crypto = require("crypto");

const excelJS = require("exceljs");

var d = new Date(); // for now

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("rabbitmq/rabbitmq.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const rabbitMQPackage = grpcObject.rabbitMQPackage;

const text = process.argv[2];

let { createRabbitUtil} =  require("../loadBalancer/utils.js");


const client = new rabbitMQPackage.RabbitMQ("localhost:50000", grpc.credentials.createInsecure())


/** Sync */
function randomStringAsBase64Url(size) {
  return crypto.randomBytes(size).toString("base64url");
}

exports.get_data = async function (req, res) {
  const saveuserlog = new userlog({
    type: "Get Data",
    table: "Company",
    createdTime:
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds()
  });
  await saveuserlog.save();
  var searchdata = "";
  //console.log(req.query)
  if (req.query) {
    if (typeof req.query.company_name !== "undefined")
      searchdata = "where company_name like '%" + req.query.company_name + "%'";
    if (typeof req.query.address !== "undefined") {
      if (searchdata !== "")
        searchdata += " AND address like '%" + req.query.address + "%'";
      else searchdata = "where address like '%" + req.query.address + "%'";
    }
    if (typeof req.query.email !== "undefined") {
      if (searchdata !== "")
        searchdata += " AND email like '%" + req.query.email + "%'";
      else searchdata = "where email like '%" + req.query.email + "%'";
    }
    if (typeof req.query.namesort !== "undefined") {
      var ascdesc = " order by " + req.query.namesort;
    } else var ascdesc = " order by id";
    if (typeof req.query.ascdesc !== "undefined") {
      if (req.query.ascdesc === "1") ascdesc += " desc";
      else ascdesc += " asc";
    } else ascdesc += " desc";
  }
  if (parseInt(req.params.offset) < 0) req.params.offset = 0;
  var _sql_rest_url =
    "SELECT company.*,branch_name from company join branch on branch.id = company.m_branch ";
  _sql_rest_url +=
    searchdata +
    ascdesc +
    " limit " +
    req.params.limit +
    " offset " +
    req.params.offset;
  var rows = await pool.query(_sql_rest_url);

  const token = randomStringAsBase64Url(32);
  let dataRet = { data: rows.rows, redisToken: token };

  redisClient.set(token, JSON.stringify(dataRet));
  const dataGet = await redisClient.get(token);
  console.log(dataGet);
  res.json(dataRet);
};
exports.get_data_by_id = async function (req, res) {
  if (typeof req.params.id !== "undefined") {
    const saveuserlog = new userlog({
      type: "Get Data By Id",
      table: "Company",
      createdTime:
        d.getDate() +
        d.getMonth() +
        d.getFullYear() +
        d.getHours() +
        d.getMinutes() +
        d.getSeconds()
    });
    await saveuserlog.save();
    var _sql_rest_url = "SELECT * from company where id = " + req.params.id;
    var rows = await pool.query(_sql_rest_url);
    const token = randomStringAsBase64Url(32);
    let dataRet = { data: rows.rows[0], redisToken: token };

    redisClient.set(token, JSON.stringify(dataRet));
    const dataGet = await redisClient.get(token);
    console.log(dataGet);
    res.json(dataRet);
  }
};

exports.get_all_data = async function (req, res) {
  const saveuserlog = new userlog({
    type: "Get All Data",
    table: "Company",
    createdTime:
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds()
  });
  await saveuserlog.save();
  var _sql_rest_url = "SELECT * from company order by id DESC";
  var rows = await pool.query(_sql_rest_url);
  const token = randomStringAsBase64Url(32);
  let dataRet = { data: rows.rows, redisToken: token };

  redisClient.set(token, JSON.stringify(dataRet));
  const dataGet = await redisClient.get(token);
  console.log(dataGet);
  res.json(dataRet);
};

exports.excel_all_data = async function (req, res) {
  const saveuserlog = new userlog({
    type: "Excel All Data",
    table: "Company",
    createdTime:
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds()
  });
  await saveuserlog.save();
  var _sql_rest_url = "SELECT * from company order by company_name";
  var rows = await pool.query(_sql_rest_url);
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("My Users");
  const path = "./files";
  worksheet.columns = [
    { header: "No", key: "no", width: 10 },
    { header: "Company Name", key: "company_name", width: 10 },
    { header: "Address", key: "address", width: 10 },
    { header: "Email", key: "email", width: 10 },
    { header: "Branch", key: "m_branch", width: 10 },
    { header: "Phone", key: "phone", width: 10 }
  ];
  let counter = 1;
  rows.rows.forEach((row) => {
    row.no = counter;
    worksheet.addRow(row);
    counter++;
  }); // Add data in worksheet  counter++;});
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const fileName =
      "/company" +
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds();

    const data = await workbook.xlsx
      .writeFile(`${path}/` + fileName + `.xlsx`)
      .then(() => {
        res.send({
          status: "success",
          message: "file successfully downloaded",
          path: `${path}/` + fileName + `.xlsx`
        });
      });
  } catch (err) {
    res.send({ status: "error", message: "Something went wrong" });
  }
};

exports.excel_to_db = async function (req, res) {
  const xlsx = require("xlsx");
  const workbook = xlsx.readFile("upload/company252024181837.xlsx");
  const workbook_sheet = workbook.SheetNames;
  let workbook_response = xlsx.utils.sheet_to_json(
    // Step 4
    workbook.Sheets[workbook_sheet[0]]
  );
  for (let i = 0; i < workbook_response.length; i++) {
    var saveuserlog = new userlog({
      type: "Save Data",
      table: "Company",
      createdTime:
        d.getDate() +
        d.getMonth() +
        d.getFullYear() +
        d.getHours() +
        d.getMinutes() +
        d.getSeconds()
    });
    await saveuserlog.save();

    await amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = "save.company";

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(
          queue,
          Buffer.from(JSON.stringify(workbook_response[i]))
        );
        console.log(" [x] Sent %s", JSON.stringify(workbook_response[i]));
      });
    });
  }

  await res.json("data excel has been load to database");
};

exports.save_data = async function (req, res) {
  // pool.query(
  //   "insert into company(company_name,address,email,m_branch,phone) values ($1,$2,$3,$4,$5)",
  //   [
  //     req.body.company_name,
  //     req.body.address,
  //     req.body.email,
  //     req.body.m_branch,
  //     req.body.phone
  //   ],
  //   (err, res) => {
  //     if (err) console.log(err);
  //   }
  // );

  const saveuserlog = new userlog({
    type: "Save Data",
    table: "Company",
    createdTime:
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds()
  });
  await saveuserlog.save();

  try {
        await createRabbitUtil(req.body);
       } catch (error) {
        console.log(error);
        throw error;
    }


  // client.CreaterabbitMQ({
  //   "queue": "save.company",
  //   "send" : JSON.stringify(req.body)
  // }, () => {
  
  //   console.log("sent data company rabbitmq GRPC server to save the data " + JSON.stringify(req.body))
  
  // })

  // client.CreaterabbitMQ({
  //   "queue": "email.company",
  //   "send" : JSON.stringify(req.body)
  // }, () => {
  
  //   console.log("sent data company rabbitmq GRPC server to email" + JSON.stringify(req.body))
  
  // })

  res.json(true);
};

exports.update_data = async function (req, res) {
  const saveuserlog = new userlog({
    type: "Update Data",
    table: "Company",
    createdTime:
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds()
  });
  await saveuserlog.save();
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
      req.body.id = req.params.id;

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
      console.log(" [x] Sent %s", JSON.stringify(req.body));
    });
  });

  res.json(true);
};

exports.delete_data = async function (req, res) {
  const saveuserlog = new userlog({
    type: "Delete Data",
    table: "Company",
    createdTime:
      d.getDate() +
      d.getMonth() +
      d.getFullYear() +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds()
  });
  await saveuserlog.save();
  pool.query(
    "delete from company where id = $1",
    [req.params.id],
    (err, res) => {
      if (err) console.log(err);
    }
  );

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
      req.body.id = req.params.id;

      channel.sendToQueue(queue, Buffer.from(req.params.id));
      console.log(" [x] Sent %s", req.params.id);
    });
  });
  res.json(true);
};
