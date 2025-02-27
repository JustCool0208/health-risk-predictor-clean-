const express = require('express');
const { submitHealthData, healthCheckup, updateHealthData, getDashboardData } = require('../controllers/healthController');
const router = express.Router();

router.post('/submit-health-data', submitHealthData);
router.post('/health-checkup', healthCheckup);
router.put('/update-health-data', updateHealthData);
router.get('/get-dashboard-data',getDashboardData)
module.exports = router;
