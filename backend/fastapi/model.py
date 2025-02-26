from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

# Mock dataset (replace with your real dataset)
data = pd.DataFrame({
    'age': [45, 50, 60, 30],
    'cholesterol': [210, 240, 190, 180],
    'bloodPressure': [150, 160, 120, 110],
    'heartRate': [80, 85, 70, 65],
    'risk': ['high', 'high', 'low', 'low']  # Risk labels
})

# Train the model
X = data[['age', 'cholesterol', 'bloodPressure', 'heartRate']]
y = data['risk']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'cardiac_arrest_model.pkl')
