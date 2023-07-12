var express = require('express'),
    router = express.Router(),
    branch = require('../controller/branch');

router.get('/get_data/:offset/:limit/:sort', branch.get_data);
router.get('/get_data_by_id/:id', branch.get_data_by_id);
router.get('/get_all_data/', branch.get_all_data);
router.post('/save_data', branch.save_data);
router.put('/update_data/:id', branch.update_data);
router.delete('/delete_data/:id', branch.delete_data);
module.exports = router;