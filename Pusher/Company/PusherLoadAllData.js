const pusher = require("../../pusher.js");

exports.load_all_data = async function () {
  pusher.trigger("company-event", "load-all-data-company", {
    notification: "load-all-data-company"
  });
  console.log("successfully trigger pusher");
};
