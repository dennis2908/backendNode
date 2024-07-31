var express = require("express"),
  router = express.Router(),
  company = require("../controller/company"),
  validateToken = require("../controller/validateToken");

router.get("/get_data/:offset/:limit/:sort", validateToken.validateToken,company.get_data);
router.get("/get_data_by_id/:id", validateToken.validateToken,company.get_data_by_id);
router.get("/get_all_data", validateToken.validateToken,company.get_all_data);
router.get("/excel_all_data", validateToken.validateToken,company.excel_all_data);
router.get("/excel_to_db", validateToken.validateToken,company.excel_to_db);
router.post("/save_data", validateToken.validateToken,company.save_data);
router.put("/update_data/:id", validateToken.validateToken,company.update_data);
router.delete("/delete_data/:id", validateToken.validateToken,company.delete_data);
module.exports = router;
