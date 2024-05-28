var express = require("express"),
  router = express.Router(),
  user = require("../controller/user");

router.get("/get_data/:offset/:limit/:sort", user.get_data);
router.get("/get_data_by_id/:id", user.get_data_by_id);
router.post("/save_data", user.save_data);
router.post("/doLogin", user.doLogin);
router.put("/update_data/:id", user.update_data);
router.delete("/delete_data/:id", user.delete_data);
module.exports = router;
