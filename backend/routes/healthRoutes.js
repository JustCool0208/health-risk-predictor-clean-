const express = require('express');
const { submitHealthData, healthCheckup, updateHealthData } = require('../controllers/healthController');
const router = express.Router();

router.post('/submit-health-data', submitHealthData);
router.post('/health-checkup', healthCheckup);
router.put('/update-health-data', updateHealthData);
module.exports = router;
