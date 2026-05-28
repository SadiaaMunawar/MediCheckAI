import joblib
import numpy as np
import pandas as pd

# Load saved model files
model = joblib.load('models/disease_model.pkl')
le = joblib.load('models/label_encoder.pkl')
symptom_columns = joblib.load('models/symptom_columns.pkl')

def predict_disease(symptoms_list):
    # Create input vector
    input_vector = pd.DataFrame([{
        col: 1 if col in symptoms_list else 0 
        for col in symptom_columns
    }])
    
    # Predict
    prediction = model.predict(input_vector)
    probabilities = model.predict_proba(input_vector)[0]
    
    # Get top 3 diseases
    top3_indices = np.argsort(probabilities)[::-1][:3]
    top3_diseases = [
        {
            "disease": le.inverse_transform([i])[0],
            "confidence": round(float(probabilities[i]) * 100, 2)
        }
        for i in top3_indices
    ]
    
    return top3_diseases