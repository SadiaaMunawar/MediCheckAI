# 🩺 AI Medical Symptom Checker & Triage Assistant
> *Not a doctor, but a smart first step.*

An AI-powered symptom checker that understands your symptoms in plain language and tells you how urgently you need medical attention. Generates a ready-to-share report so your doctor gets the full picture from the start.

## 📁 Repository Structure


├── /frontend        # React.js frontend application
├── /backend         # Flask backend & AI models
├── /notebooks       # Jupyter notebooks for model training & experiments
├── /report          # Project report (PDF)
└── /demo            # Video demo files

## 👥 Team Members

| Name | GitHub |
|------|--------|
| Sadia Munawar | [@SadiaaMunawar](https://github.com/SadiaaMunawar) |
| Khudema Haroon | [@Khudema27](https://github.com/Khudema27) |
| Shiza Riaz | @username |


## ✨ Features

- 🗣️ Natural language symptom input (e.g., *"I have a headache and fever for 3 days"*)
- 🧠 AI-powered NLP symptom extraction using spaCy/BERT
- 🏥 Multi-label disease classification
- 🚦 Urgency triage scoring — **Green / Yellow / Red**
- 🗺️ Interactive visual body map to click affected areas
- 📄 Printable & shareable symptom report (PDF)


## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, jsPDF |
| Backend | Python, Flask |
| AI / ML | spaCy, BERT, Scikit-learn |
| NLP | Named Entity Recognition (NER) |

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip & npm
- 
### 🔧 Backend Setup
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Run the Flask server
python app.py

Backend runs on: `http://localhost:5000`



### 💻 Frontend Setup

# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start

Frontend runs on: `http://localhost:3000`

## 📸 Screenshots

> Screenshots will be added after UI is finalized.
> 
## 🎥 Demo Video

> 🔗 Video demo link will be added after recording.

## 📌 How It Works

1. User enters symptoms in natural language
2. NLP model extracts and maps symptoms using NER
3. Classification model predicts possible conditions
4. Triage scoring system assigns urgency level (🟢 / 🟡 / 🔴)
5. A structured PDF report is generated for the doctor
   
## 📄 License

This project was developed as part of an academic submission. All rights reserved.
