import React, { useState } from 'react';
import { analyzeSymptoms } from '../api';
import UrgencyIndicator from './UrgencyIndicator';
import BodyMap from './BodyMap';
import ReportGenerator from './ReportGenerator';

const SymptomForm = () => {
    const [text, setText] = useState('');
    const [bodyParts, setBodyParts] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!text.trim()) {
            setError('Please describe your symptoms.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const data = await analyzeSymptoms(text, bodyParts);
            setResult(data);
        } catch (err) {
            setError(err.error || 'Something went wrong.');
        }
        setLoading(false);
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '30px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>
                🏥 AI Medical Symptom Checker
            </h1>
            <p style={{ textAlign: 'center', color: '#666' }}>
                Not a doctor, but a smart first step
            </p>

            {/* Text Input */}
            <div style={{ marginTop: '30px' }}>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
                    Describe your symptoms:
                </label>
                <textarea
                    rows="4"
                    placeholder="e.g. I have headache and fever for 3 days..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        fontSize: '15px',
                        resize: 'none',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {/* Body Map */}
            <BodyMap onSelectPart={setBodyParts} />

            {/* Error */}
            {error && (
                <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '14px',
                    marginTop: '20px',
                    backgroundColor: '#4A90E2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>

            {/* Results */}
            {result && (
                <div style={{ marginTop: '30px' }}>
                    {/* Urgency */}
                    <UrgencyIndicator urgency={result.urgency} />

                    {/* Predictions */}
                    <div style={{
                        marginTop: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <h3 style={{ color: '#2C3E50' }}>Possible Conditions:</h3>
                        {result.predictions.map((p, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                marginTop: '8px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #dee2e6'
                            }}>
                                <span style={{ color: '#333' }}>{p.disease}</span>
                                <span style={{ color: '#4A90E2', fontWeight: 'bold' }}>
                                    {p.confidence}%
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Symptoms Found */}
                    <div style={{
                        marginTop: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <h3 style={{ color: '#2C3E50' }}>Symptoms Detected:</h3>
                        <p style={{ color: '#555' }}>
                            {result.symptoms_found.map(s => s.replace(/_/g, ' ')).join(', ')}
                        </p>
                    </div>

                    {/* PDF Report */}
                    <ReportGenerator
                        symptoms={result.symptoms_found}
                        predictions={result.predictions}
                        urgency={result.urgency}
                    />
                </div>
            )}
        </div>
    );
};

export default SymptomForm;