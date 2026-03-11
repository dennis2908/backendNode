const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const operationSchema = new Schema({
  type: {
    required: true,
    type: String
  },
  table: {
    required: true,
    type: String
  },
  createdTime: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model("operation", operationSchema);
