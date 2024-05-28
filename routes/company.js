var express = require("express"),
  router = express.Router(),
  company = require("../controller/company");

router.get("/get_data/:offset/:limit/:sort", company.get_data);
router.get("/get_data_by_id/:id", company.get_data_by_id);
router.get("/get_all_data", company.get_all_data);
router.post("/save_data", company.save_data);
router.put("/update_data/:id", company.update_data);
router.delete("/delete_data/:id", company.delete_data);
module.exports = router;
