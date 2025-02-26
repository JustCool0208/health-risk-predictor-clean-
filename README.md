This is a Health Prediction API that uses Machine Learning to assess the risk of cardiac arrest based on user health data. It allows users to sign up, submit health data, get predictions, update data, and retrain the model dynamically.


Features

--> User Authentication (Signup/Login) (Works on a simple database match for now , will be made secure using json in the later phases of the project)

--> Health Data Submission

--> Heart Disease Risk Prediction using ML

--> User Dashboard with past health records

--> Health Data Update & Re-evaluation

--> Model Retraining using user-submitted data (Upcoming)

--> Admin Panel & Insights (Upcoming)


Project Structure

backend/
│── server.js
│── config/
│   ├── db.js
│── models/
│   ├── User.js
│   ├── HealthData.js
│── routes/
│   ├── authRoutes.js
│   ├── healthRoutes.js
│── controllers/
│   ├── authController.js
│   ├── healthController.js
│── fastapi/
│   ├── model.py
│   ├── api.py
│── package.json
│── .env
│── README.md




POST   /auth/signup         - Register a new user
POST   /auth/login          - Login user

POST   /health/submit-health-data       - Submit health data
POST   /health/health-checkup			      - Get health risk prediction
PUT    /health/update-health-data	      - Update health data
GET    /dashboard?username=							- Get user health data & prediction






