const express = require("express");
const router = express.Router();
const apicontroller = require('./api');

router.post('/addpoints', apicontroller.addpoints);
router.delete('/deletepoints/:points_to_deduct', apicontroller.deletepoints);
router.get('/balance', apicontroller.balance);


module.exports = router;