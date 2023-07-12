var express = require('express'),
    router = express.Router(),
    role = require('../controller/role');

router.get('/get_data/:offset/:limit/:sort', role.get_data);
router.get('/get_data_by_id/:id', role.get_data_by_id);
router.get('/get_all_data', role.get_all_data);
router.post('/save_data', role.save_data);
router.put('/update_data/:id', role.update_data);
router.put('/update_assign/:id', role.update_assign);
router.delete('/delete_data/:id', role.delete_data);
module.exports = router;