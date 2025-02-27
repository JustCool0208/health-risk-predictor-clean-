const express = require("express");
console.log("Express server is running...");
const mongoose = require('mongoose');
// mongoose.set('debug', true);


const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const adminRoutes = require("./routes/adminRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/health", healthRoutes);

const { getDashboardData } = require('./controllers/healthController'); 
app.get('/dashboard', getDashboardData);
app.use("/admin", adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
