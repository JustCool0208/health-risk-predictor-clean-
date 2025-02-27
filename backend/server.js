const express = require("express");
console.log("Express server is running...");
const mongoose = require('mongoose');
mongoose.set('debug', true);


const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/health", healthRoutes);
//logging in the current requests
app.use((req, res, next) => {
  console.log(`Received request for ${req.method} ${req.url}`);
  next();
});
const { getDashboardData } = require('./controllers/healthController'); 
app.get('/dashboard', getDashboardData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
