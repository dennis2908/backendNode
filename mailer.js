const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });
var nodemailer = require("nodemailer"); //create a instance of pusher using your credentials
console.log(process.env.MAIL_PORT);
const transporter = nodemailer.createTransport({
  port: process.env.MAIL_PORT, // true for 465, false for other ports
  host: process.env.MAIL_HOST,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = transporter;
