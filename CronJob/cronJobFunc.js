const cron = require("node-cron");
function logMessage() {
  console.log("Cron job executed at:", new Date().toLocaleString());
}

exports.load = async function () {
  cron.schedule("* * * * *", () => {
    logMessage();
  });
};
