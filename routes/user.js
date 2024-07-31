var express = require("express"),
  router = express.Router(),
  user = require("../controller/user"),
  token = require("../controller/token");

router.get("/get_data/:offset/:limit/:sort", token.validateToken, user.get_data);
router.post("/refresh/token", token.refreshToken);
router.get("/get_data_by_id/:id", token.validateToken, user.get_data_by_id);
router.post("/save_data", user.save_data);
router.put("/update_data/:id", token.validateToken, user.update_data);
router.post("/doLogin", user.doLogin);
router.delete("/delete_data/:id", token.validateToken, user.delete_data);
module.exports = router;
