var express = require("express"),
  router = express.Router(),
  company = require("../controller/company"),
  token = require("../controller/token");

router.get("/get_data/:offset/:limit/:sort", token.validateToken,company.get_data);
router.get("/get_data_by_id/:id", token.validateToken,company.get_data_by_id);
router.get("/get_all_data", token.validateToken,company.get_all_data);
router.get("/excel_all_data", token.validateToken,company.excel_all_data);
router.get("/excel_to_db", token.validateToken,company.excel_to_db);
router.post("/save_data", token.validateToken,company.save_data);
router.put("/update_data/:id", token.validateToken,company.update_data);
router.delete("/delete_data/:id", token.validateToken,company.delete_data);
module.exports = router;
