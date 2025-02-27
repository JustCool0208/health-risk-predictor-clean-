from fastapi import FastAPI, HTTPException
import joblib
import logging
import traceback
import numpy as np
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI()
logging.basicConfig(level=logging.INFO)

model_path = 'F:/Health Predictor (Clean)/cardiac_arrest_model.pkl'

model = joblib.load(model_path)  



class HealthData(BaseModel):
    age: int
    cholesterol: int
    bloodPressure: int
    heartRate: int

@app.post("/predict")
async def predict(data: HealthData):
    try:
              
        input_data = np.array([[data.age, data.cholesterol, data.bloodPressure, data.heartRate]])

        if model is None:
            raise ValueError("Model not loaded properly")

        prediction = model.predict(input_data)
        predicted_value = int(prediction[0])
        prediction_map = {0: 'very low', 1: 'low', 2: 'medium', 3: 'high'}
        predicted_value_str = prediction_map.get(predicted_value, "unknown")

        return JSONResponse(content={"prediction": predicted_value_str})

    except Exception as e:
        logging.error(f"Prediction Error: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
