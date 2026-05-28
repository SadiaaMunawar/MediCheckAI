import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# Load dataset
df = pd.read_csv('data/dataset.csv')
df.columns = df.columns.str.strip()

# Get all unique symptoms
symptom_cols = [col for col in df.columns if col != 'Disease']
all_symptoms = set()
for col in symptom_cols:
    all_symptoms.update(df[col].dropna().str.strip().unique())

all_symptoms = sorted(list(all_symptoms))
print(f"Total unique symptoms: {len(all_symptoms)}")

# Create binary matrix
binary_data = []
for _, row in df.iterrows():
    row_symptoms = set()
    for col in symptom_cols:
        if pd.notna(row[col]):
            row_symptoms.add(row[col].strip())
    binary_row = {s: 1 if s in row_symptoms else 0 for s in all_symptoms}
    binary_data.append(binary_row)

X = pd.DataFrame(binary_data)
y = df['Disease'].str.strip()

# Encode labels
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# Train
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Accuracy
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")

# Save
os.makedirs('models', exist_ok=True)
joblib.dump(model, 'models/disease_model.pkl')
joblib.dump(le, 'models/label_encoder.pkl')
joblib.dump(all_symptoms, 'models/symptom_columns.pkl')

print("Model saved successfully!")
print(f"Sample symptoms: {all_symptoms[:10]}")