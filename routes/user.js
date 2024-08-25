var express = require("express"),
  router = express.Router(),
  user = require("../controller/user"),
  token = require("../controller/token");
  var passport =  require("passport");
  require("../controller/passport");

router.get("/get_data/:offset/:limit/:sort", passport.authenticate("jwt", { session: false }), user.get_data);
router.post("/refresh/token", token.refreshToken);
router.get("/get_data_by_id/:id", passport.authenticate("jwt", { session: false }), user.get_data_by_id);
router.post("/save_data", user.save_data);
router.put("/update_data/:id", passport.authenticate("jwt", { session: false }), user.update_data);
router.post("/doLogin", user.doLogin);
router.delete("/delete_data/:id", passport.authenticate("jwt", { session: false }), user.delete_data);
module.exports = router;
