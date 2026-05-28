import spacy

nlp = spacy.load("en_core_web_sm")

def extract_symptoms(text, known_symptoms):
    text = text.lower().strip()
    found_symptoms = []

    for symptom in known_symptoms:
        symptom_clean = symptom.lower().strip().replace('_', ' ')
        if symptom_clean in text:
            found_symptoms.append(symptom)

    return found_symptoms