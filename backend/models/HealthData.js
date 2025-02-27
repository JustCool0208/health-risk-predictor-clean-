const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    age: { type: Number },
    gender: { type: String },
    cholesterol: { type: Number },
    bloodPressure: { type: Number },
    heartRate: { type: Number }
});
const HealthData = mongoose.model('HealthData', healthDataSchema, 'healthdatas');
module.exports = HealthData