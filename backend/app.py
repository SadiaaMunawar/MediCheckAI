from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from symptom_extractor import extract_symptoms
from classifier import predict_disease, symptom_columns
from triage import get_urgency

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load severity data
try:
    severity_df = pd.read_csv('data/Symptom-severity.csv')
    severity_df.columns = severity_df.columns.str.strip()
    print("Severity data loaded:", severity_df.columns.tolist())
except Exception as e:
    print(f"Error loading severity data: {e}")
    severity_df = pd.DataFrame()

@app.route('/analyze', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    try:
        data = request.get_json()
        user_text = data.get('text', '')
        body_parts = data.get('body_parts', [])

        symptoms = extract_symptoms(user_text, symptom_columns)
        symptoms = list(set(symptoms + body_parts))

        print(f"Symptoms found: {symptoms}")

        if not symptoms:
            return jsonify({
                "error": "No symptoms found. Please describe your symptoms in more detail."
            }), 400

        predictions = predict_disease(symptoms)
        top_disease = predictions[0]['disease']

        print(f"Top disease: {top_disease}")

        urgency = get_urgency(top_disease, severity_df)

        return jsonify({
            "symptoms_found": symptoms,
            "predictions": predictions,
            "urgency": urgency
        })

    except Exception as e:
        print(f"Error in analyze: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)