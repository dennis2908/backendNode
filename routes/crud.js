var express = require("express"),
  router = express.Router(),
  crud_zone = require("../controller/crud_zone");

router.get("/get_data/:offset/:limit/:sort", crud_zone.get_data);
router.get("/get_data_by_id/:id", crud_zone.get_data_by_id);
router.get("/get_all_data", crud_zone.get_all_data);
router.post("/save_data", crud_zone.save_data);
router.put("/update_data/:id", crud_zone.update_data);
router.delete("/delete_data/:id", crud_zone.delete_data);
module.exports = router;
