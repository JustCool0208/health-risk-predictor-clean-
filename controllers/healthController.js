const axios = require('axios');
const HealthData = require('../models/HealthData');


const getPrediction = async (age, cholesterol, bloodPressure, heartRate) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/predict", {
            age,
            cholesterol,
            bloodPressure,
            heartRate
        });

        console.log("FastAPI Response:", response.data); 

        
            return response.data.prediction;  
    
    } catch (error) {
        console.error("Prediction Error:", error.message);
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
  const { username } = req.body;

  try {
      const userHealthData = await HealthData.findOne({ username });
      if (!userHealthData) {
          return res.status(404).json({ message: "User health data not found" });
      }

      const prediction = await getPrediction(
          userHealthData.age,
          userHealthData.cholesterol,
          userHealthData.bloodPressure,
          userHealthData.heartRate
      );

      console.log("Final Prediction Value:", prediction); 

      if (prediction === null) {
          return res.status(500).json({ message: "Failed to get health checkup result" });
      }

      res.status(200).json({
          message: "Health checkup successful",
          prediction
      });

  } catch (error) {
      console.error("Health Checkup Error:", error);
      res.status(500).json({ message: "Error during health checkup" });
  }
};



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
    
    const prediction = await getPrediction(
      existingData.age,
      existingData.cholesterol,
      existingData.bloodPressure,
      existingData.heartRate
  );
  

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
    const prediction = await getPrediction(
      healthData.age,
      healthData.cholesterol,
      healthData.bloodPressure,
      healthData.heartRate
  );
  

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
