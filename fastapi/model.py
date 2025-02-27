import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score
import os

data_path = os.path.join(os.path.dirname(__file__), 'health_data.csv')
df = pd.read_csv(data_path)

X = df.drop(columns=["risk"]) 
y = df['risk']



y = y.map({'very low': 0, 'low': 1, 'medium': 2, 'high': 3})

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

models = {
    "RandomForest": (RandomForestClassifier(), {
        "n_estimators": [50, 100, 200],
        "max_depth": [None, 10, 20],
        "min_samples_split": [2, 5, 10]
    }),
    "SVM": (SVC(probability=True), {
        "C": [0.1, 1, 10],
        "kernel": ["linear", "rbf"]
    }),
    "LogisticRegression": (LogisticRegression(), {
        "C": [0.1, 1, 10]
    }),
    "XGBoost": (XGBClassifier(use_label_encoder=False, eval_metric='mlogloss'), {
        "n_estimators": [50, 100, 200],
        "max_depth": [3, 6, 10],
        "learning_rate": [0.01, 0.1, 0.2]
    })
}

best_model = None
best_score = 0
best_model_name = ""

for name, (model, param_grid) in models.items():
    print(f"Training {name}...")
    search = RandomizedSearchCV(model, param_distributions=param_grid, n_iter=10, cv=5, scoring='accuracy', random_state=42, n_jobs=-1)
    search.fit(X_train, y_train)
    
    best_params =search.best_params_
    best_model_candidate =search.best_estimator_
    
    y_pred = best_model_candidate.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"{name} Best Params: {best_params}")
    print(f"{name} Accuracy: {accuracy:.4f}\n")
    
    if accuracy > best_score:
        best_score = accuracy
        best_model = best_model_candidate
        best_model_name = name


print(f"Best Model: {best_model_name} with Accuracy: {best_score:.4f}")
joblib.dump(best_model, "cardiac_arrest_model.pkl")
print("Model saved as cardiac_arrest_model.pkl")



