from fastapi import FastAPI
import joblib
from pydantic import BaseModel

app = FastAPI()

# Load the pre-trained model
model = joblib.load('f:/Health Predictor (Clean)/cardiac_arrest_model.pkl')

# Define the input data format
class HealthData(BaseModel):
    age: int
    cholesterol: int
    bloodPressure: int
    heartRate: int

@app.post('/predict')
async def predict_health_risk(data: HealthData):
    input_data = [[data.age, data.cholesterol, data.bloodPressure, data.heartRate]]
    prediction = model.predict(input_data)
    return {"risk": prediction[0]}
