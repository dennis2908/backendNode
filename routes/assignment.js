var express = require('express'),
    router = express.Router(),
    assignment = require('../controller/assignment');

router.get('/get_data/:offset/:limit/:sort', assignment.get_data);
router.get('/get_data_by_id/:id', assignment.get_data_by_id);
router.post('/save_data', assignment.save_data);
router.put('/update_data/:id', assignment.update_data);
router.delete('/delete_data/:id', assignment.delete_data);
module.exports = router;