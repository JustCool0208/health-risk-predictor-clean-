<h1>Health Risk Predictor</h1> 
This is a Health Prediction API that uses Machine Learning to assess the risk of cardiac arrest based on user health data. It allows users to submit their health data, receive AI-based risk assessments, and view analytics on an admin dashboard.
<br>

<br>
<h1>Features</h1>

<br>
--> User Authentication (Signup/Login) (Works on a simple database match for now , will be made secure using jwt in the later phases of the project)

<br>
--> Health Data Submission & updates

<br>
--> Heart Disease Risk Prediction using ML ( best model chosen from a set of available classifiers)

<br>
--> Secure MongoDB database integration

<br>
--> Dashboard analytics for users & admins

<br>
--> Model Retraining using user-submitted data (Upcoming)

<br>

<br>

<br>
<hr>

<hr>
<h1>Tech Stack</h1>
<br>
Backend: Node.js, Express.js, FastAPI, MongoDB

<br>
Machine Learning: Scikit-Learn (RandomizedSearchCV for model tuning)
<hr>
<hr>
<br>
<h3>Project Structure</h3>

<br>
backend/

<br>
│── server.js

<br>
│── config/

<br>
│   ├── db.js

<br>
│── models/

<br>
│   ├── User.js

<br>
│   ├── HealthData.js

<br>
│── routes/

<br>
│   ├── authRoutes.js
<br>
│   ├── adminRoutes.js
<br>
│   ├── healthRoutes.js

<br>
│── controllers/

<br>
│   ├── adminController.js
<br>
│   ├── authController.js

<br>
│   ├── healthController.js

<br>
│── fastapi/

<br>
│   ├── model.py
<br>
│   ├── health_data.csv
<br>
│   ├── api.py

<br>
│── package.json

<br>
│── .env

<br>
│── README.md


<hr>
<br>
<h1>API Endpoints</h1>

  <h2>Authentication</h2>
  <ul>
      <li><strong>POST /auth/signup</strong> - Register a new user</li>
      <li><strong>POST /auth/login</strong> - Login user</li>
  </ul>

  <h2>Health Data</h2>
  <ul>
      <li><strong>POST /health/submit-health-data</strong> - Submit user health data</li>
      <li><strong>PUT /health/update-health-data</strong> - Update user health data</li>
      <li><strong>POST /health/health-checkup</strong> - Get AI-based health prediction</li>
  </ul>

  <h2>Dashboard & Admin</h2>
  <ul>
      <li><strong>GET /health/get-dashboard-data?username=&lt;username&gt;</strong> - Get user health data & prediction</li>
      <li><strong>GET /admin/dashboard</strong> - Get admin analytics</li>
  </ul>

  <h2>FastAPI ML Model</h2>
  <ul>
      <li><strong>POST /predict</strong> - Get health risk prediction from the ML model</li>
  </ul>

 


