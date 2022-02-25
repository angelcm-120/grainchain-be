const express = require('express');
const statusController = require('../../controllers/status.controller');
const router = express.Router();

router.route('/').get(statusController.getStatus);


module.exports = router;
