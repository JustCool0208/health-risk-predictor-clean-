const axios = require('axios');
const HealthData = require('../models/HealthData');
const User = require('../models/User');  



const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup' });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const record = await HealthData.findOne({ username })
        res.status(200).json({ message: 'Login successful',
            userDetails:
            {
                username : user.username,
                email : user.email 
            },
            healthData : record
         });
    } catch (error) {
        res.status(500).json({ message: 'Error during login' });
    }
};





module.exports = { signup, login };
