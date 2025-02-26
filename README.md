This is a Health Prediction API that uses Machine Learning to assess the risk of cardiac arrest based on user health data. It allows users to sign up, submit health data, get predictions, update data, and retrain the model dynamically.
<hr>
<br>

<br>
Features

<br>
--> User Authentication (Signup/Login) (Works on a simple database match for now , will be made secure using json in the later phases of the project)

<br>
--> Health Data Submission

<br>
--> Heart Disease Risk Prediction using ML

<br>
--> User Dashboard with past health records

<br>
--> Health Data Update & Re-evaluation

<br>
--> Model Retraining using user-submitted data (Upcoming)

<br>
--> Admin Panel & Insights (Upcoming)

<br>

<br>
<hr>

<br>
Project Structure

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
│   ├── healthRoutes.js

<br>
│── controllers/

<br>
│   ├── authController.js

<br>
│   ├── healthController.js

<br>
│── fastapi/

<br>
│   ├── model.py

<br>
│   ├── api.py

<br>
│── package.json

<br>
│── .env

<br>
│── README.md
<br>

<br>

<br>
<hr>

<br>
API Endpoints

<br>

<br>



POST   /auth/signup         - Register a new user

<br>


POST   /auth/login          - Login user

<br>
<br>


POST   /health/submit-health-data       - Submit health data

<br>
POST   /health/health-checkup			      - Get health risk prediction

<br>
PUT    /health/update-health-data	      - Update health data

<br>
GET    /dashboard?username=							- Get user health data & prediction

<br>






