const axios = require('axios');
const HealthData = require('../models/HealthData');
console.log("test1");


const getPrediction = async (healthData) => {
  const healthDataForPrediction = {
    age: healthData.age,
    cholesterol: healthData.cholesterol,
    bloodPressure: healthData.bloodPressure,
    heartRate: healthData.heartRate,
  };

  try {
    const response = await axios.post('http://127.0.0.1:8000/predict', healthDataForPrediction);
    return response.data.risk;
  } catch (error) {
    throw new Error("Prediction failed");
  }
};


const submitHealthData = async (req, res) => {
  const { username, age, gender, cholesterol, bloodPressure, heartRate } = req.body;
  try {
    const existingData = await HealthData.findOne({ username });
    if (existingData) {
      return res.status(400).json({ message: 'Health data already submitted' });
    }
    const healthData = new HealthData({ username, age, gender, cholesterol, bloodPressure, heartRate });
    await healthData.save();
    res.status(201).json({ message: 'Health data submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during health data submission' });
  }
};


const healthCheckup = async (req, res) => {
  const { username, age, gender, cholesterol, bloodPressure, heartRate } = req.body;

  
  const healthData = { age, cholesterol, bloodPressure, heartRate };

  try {
    
    const response = await axios.post('http://127.0.0.1:8000/predict', healthData);

    
    const risk = response.data.risk;
    res.status(200).json({ message: `Health checkup result: ${risk}` });
  } catch (error) {
    res.status(500).json({ message: 'Error during prediction' });
  }
};

// Update Health Data logic
const updateHealthData = async (req, res) => {
  const { username, age, gender, cholesterol, bloodPressure, heartRate } = req.body;

  try {
    console.log("Updating health data for:", username)
    const existingData = await HealthData.findOne({ username });

    if (!existingData) {
      console.log("No health data found for:", username)
      return res.status(400).json({ message: 'Health data not found for this user' });
    }

    
    existingData.age = age || existingData.age;
    existingData.gender = gender || existingData.gender;
    existingData.cholesterol = cholesterol || existingData.cholesterol;
    existingData.bloodPressure = bloodPressure || existingData.bloodPressure;
    existingData.heartRate = heartRate || existingData.heartRate;
    console.log("Before saving:", existingData)
    await existingData.save()
    console.log("Health data updated successfully!")
    
    const prediction = await getPrediction(existingData)

    res.status(200).json({
      message: 'Health data updated successfully',
      updatedHealthData: existingData,
      prediction: prediction
    })

  } catch (error) {
    console.error("Error during health data update:", error);
    res.status(500).json({ message: 'Error during health data update' })
  }
};


const getDashboardData = async (req, res) => {
  const { username } = req.query; //note --> we are using a query here instead of the normal body method to simplify route approach

  try {
    const healthData = await HealthData.findOne({ username });
    if (!healthData) {
      return res.status(400).json({ message: 'Health data not found for this user' });
    }

    const prediction = await getPrediction(healthData);

    res.status(200).json({
      message: 'User dashboard data retrieved successfully',
      healthData: healthData,
      prediction: prediction
    });

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard data' });
  }
};

module.exports = { submitHealthData, healthCheckup, updateHealthData, getDashboardData };
