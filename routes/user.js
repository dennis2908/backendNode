var express = require("express"),
  router = express.Router(),
  user = require("../controller/user"),
  validateToken = require("../controller/validateToken");

router.get("/get_data/:offset/:limit/:sort", validateToken.validateToken, user.get_data);
router.get("/get_data_by_id/:id", validateToken.validateToken, user.get_data_by_id);
router.post("/save_data", user.save_data);
router.put("/update_data/:id", validateToken.validateToken, user.update_data);
router.post("/doLogin", user.doLogin);
router.delete("/delete_data/:id", validateToken.validateToken, user.delete_data);
module.exports = router;
