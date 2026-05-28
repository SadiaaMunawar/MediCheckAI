def get_urgency(disease, severity_df):
    # This file has Symptom and weight columns, not Disease
    # So we use a rule-based approach
    
    disease_lower = disease.lower()
    
    # High urgency diseases
    high_urgency = ['heart attack', 'stroke', 'diabetes', 'hypertension', 
                    'pneumonia', 'hepatitis', 'tuberculosis', 'malaria',
                    'dengue', 'typhoid', 'jaundice']
    
    # Medium urgency diseases
    medium_urgency = ['fungal infection', 'allergy', 'gastroenteritis',
                      'bronchial asthma', 'urinary tract infection',
                      'migraine', 'cervical spondylosis', 'paralysis']
    
    if any(d in disease_lower for d in high_urgency):
        return {
            "level": "red",
            "message": "Seek immediate medical attention!",
            "color": "#DC3545"
        }
    elif any(d in disease_lower for d in medium_urgency):
        return {
            "level": "yellow",
            "message": "Monitor symptoms, consult doctor soon.",
            "color": "#FFC107"
        }
    else:
        return {
            "level": "green",
            "message": "Rest at home and monitor symptoms.",
            "color": "#28A745"
        }