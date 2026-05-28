import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeSymptoms } from '../api';

const bodyPartSymptoms = {
    head: ['headache', 'dizziness', 'blurred_and_distorted_vision', 'loss_of_smell', 'runny_nose'],
    chest: ['chest_pain', 'breathlessness', 'fast_heart_rate', 'palpitations'],
    stomach: ['abdominal_pain', 'nausea', 'vomiting', 'belly_pain', 'acidity'],
    left_arm: ['muscle_weakness', 'cramps', 'joint_pain', 'swelling_joints'],
    right_arm: ['muscle_weakness', 'cramps', 'joint_pain', 'swelling_joints'],
    left_leg: ['knee_pain', 'hip_joint_pain', 'swelling_joints', 'movement_stiffness'],
    right_leg: ['knee_pain', 'hip_joint_pain', 'swelling_joints', 'movement_stiffness'],
};

const recentHistory = [
    { disease: 'Common Flu', symptoms: 'Headache, Fever', date: '2024-01-15' },
    { disease: 'Acid Reflux', symptoms: 'Chest pain, Fatigue', date: '2024-01-10' },
    { disease: 'Allergic Dermatitis', symptoms: 'Skin rash, Itching', date: '2024-01-05' },
];

const Dashboard = () => {
    const [text, setText] = useState('');
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePart = (partId) => {
        const updated = selected.includes(partId)
            ? selected.filter(s => s !== partId)
            : [...selected, partId];
        setSelected(updated);
    };

    const getSymptoms = () => {
        const symptoms = [];
        selected.forEach(partId => {
            bodyPartSymptoms[partId].forEach(s => {
                if (!symptoms.includes(s)) symptoms.push(s);
            });
        });
        return symptoms;
    };

    const handleAnalyze = async () => {
        if (!text.trim() && selected.length === 0) return;
        setLoading(true);
        try {
            const result = await analyzeSymptoms(text, getSymptoms());
            navigate('/results', { state: { result } });
        } catch (err) {
            alert('Server error. Make sure Flask is running!');
        }
        setLoading(false);
    };

    const bodyParts = [
        { id: 'head', label: 'Head', x: 185, y: 10, w: 50, h: 50 },
        { id: 'chest', label: 'Chest', x: 160, y: 75, w: 100, h: 65 },
        { id: 'stomach', label: 'Stomach', x: 160, y: 150, w: 100, h: 55 },
        { id: 'left_arm', label: 'L.Arm', x: 65, y: 75, w: 85, h: 110 },
        { id: 'right_arm', label: 'R.Arm', x: 270, y: 75, w: 85, h: 110 },
        { id: 'left_leg', label: 'L.Leg', x: 145, y: 215, w: 55, h: 120 },
        { id: 'right_leg', label: 'R.Leg', x: 220, y: 215, w: 55, h: 120 },
    ];

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', padding: '80px 40px 40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Symptom Checker</h2>
            <p style={{ color: '#94A3B8', marginBottom: '24px' }}>Describe your symptoms below and select affected body areas</p>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {/* Left Panel */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    {/* Text Input */}
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,180,166,0.2)',
                        borderRadius: '16px', padding: '24px', marginBottom: '20px'
                    }}>
                        <label style={{ fontWeight: '600', marginBottom: '12px', display: 'block' }}>
                            Describe your symptoms
                        </label>
                        <textarea
                            rows="5"
                            placeholder="e.g. I've had a persistent headache for 3 days, mild fever, and fatigue..."
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{
                                width: '100%', backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(0,180,166,0.2)', borderRadius: '8px',
                                color: '#F8FFFE', fontSize: '14px', padding: '12px',
                                resize: 'none', outline: 'none', boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Body Map */}
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,180,166,0.2)',
                        borderRadius: '16px', padding: '24px', marginBottom: '20px'
                    }}>
                        <label style={{ fontWeight: '600', marginBottom: '16px', display: 'block' }}>
                            Select affected body areas
                        </label>
                        <svg width="100%" viewBox="0 0 420 350" style={{ display: 'block', margin: '0 auto' }}>
                            {bodyParts.map(part => (
                                <g key={part.id} onClick={() => togglePart(part.id)} style={{ cursor: 'pointer' }}>
                                    <rect x={part.x} y={part.y} width={part.w} height={part.h} rx="10"
                                        fill={selected.includes(part.id) ? 'rgba(0,180,166,0.6)' : 'rgba(0,180,166,0.1)'}
                                        stroke={selected.includes(part.id) ? '#00B4A6' : 'rgba(0,180,166,0.4)'}
                                        strokeWidth="1.5" />
                                    <text x={part.x + part.w / 2} y={part.y + part.h / 2}
                                        textAnchor="middle" dominantBaseline="central"
                                        fontSize="11" fill={selected.includes(part.id) ? '#fff' : '#94A3B8'}>
                                        {part.label}
                                    </text>
                                </g>
                            ))}
                        </svg>
                        {selected.length > 0 && (
                            <p style={{ color: '#00B4A6', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
                                Selected: {selected.join(', ')}
                            </p>
                        )}
                    </div>

                    {/* Analyze Button */}
                    <button onClick={handleAnalyze} disabled={loading} style={{
                        width: '100%', padding: '16px', backgroundColor: '#00B4A6',
                        color: '#fff', border: 'none', borderRadius: '12px',
                        fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}>
                        {loading ? '🔄 Analyzing...' : '🔍 Analyze Symptoms'}
                    </button>
                </div>

                {/* Right Panel - Recent History */}
                <div style={{
                    width: '280px', backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,180,166,0.2)',
                    borderRadius: '16px', padding: '24px', height: 'fit-content'
                }}>
                    <h3 style={{ fontWeight: '600', marginBottom: '20px' }}>Recent History</h3>
                    {recentHistory.map((item, i) => (
                        <div key={i} style={{
                            borderBottom: '1px solid rgba(0,180,166,0.1)',
                            paddingBottom: '16px', marginBottom: '16px'
                        }}>
                            <p style={{ fontWeight: '600', color: '#F8FFFE', marginBottom: '4px' }}>{item.disease}</p>
                            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>{item.symptoms}</p>
                            <p style={{ color: '#64748B', fontSize: '12px' }}>{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
