require("dotenv").config();

const mongoose = require("mongoose");
const mongoString = process.env.MONGO_URL;

mongoose
  .connect(mongoString)
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));
module.exports = mongoose;
