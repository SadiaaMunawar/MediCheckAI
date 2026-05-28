import React, { useState } from 'react';

const bodyPartSymptoms = {
    head: ['headache', 'dizziness', 'blurred_and_distorted_vision', 'loss_of_smell', 'runny_nose', 'congestion'],
    chest: ['chest_pain', 'breathlessness', 'fast_heart_rate', 'palpitations'],
    stomach: ['abdominal_pain', 'nausea', 'vomiting', 'belly_pain', 'stomach_bleeding', 'acidity'],
    left_arm: ['muscle_weakness', 'cramps', 'joint_pain', 'swelling_joints'],
    right_arm: ['muscle_weakness', 'cramps', 'joint_pain', 'swelling_joints'],
    left_leg: ['knee_pain', 'hip_joint_pain', 'swelling_joints', 'movement_stiffness'],
    right_leg: ['knee_pain', 'hip_joint_pain', 'swelling_joints', 'movement_stiffness'],
};

const bodyParts = [
    { id: 'head', label: 'Head', x: 170, y: 20, w: 60, h: 60 },
    { id: 'chest', label: 'Chest', x: 150, y: 100, w: 100, h: 70 },
    { id: 'stomach', label: 'Stomach', x: 150, y: 180, w: 100, h: 60 },
    { id: 'left_arm', label: 'Left Arm', x: 60, y: 100, w: 70, h: 120 },
    { id: 'right_arm', label: 'Right Arm', x: 270, y: 100, w: 70, h: 120 },
    { id: 'left_leg', label: 'Left Leg', x: 130, y: 250, w: 55, h: 130 },
    { id: 'right_leg', label: 'Right Leg', x: 215, y: 250, w: 55, h: 130 },
];

const BodyMap = ({ onSelectPart }) => {
    const [selected, setSelected] = useState([]);

    const toggle = (part) => {
        let updatedParts;
        if (selected.includes(part.id)) {
            updatedParts = selected.filter(s => s !== part.id);
        } else {
            updatedParts = [...selected, part.id];
        }
        setSelected(updatedParts);

        // Convert body parts to actual symptoms
        const symptoms = [];
        updatedParts.forEach(partId => {
            bodyPartSymptoms[partId].forEach(symptom => {
                if (!symptoms.includes(symptom)) {
                    symptoms.push(symptom);
                }
            });
        });

        onSelectPart(symptoms);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>
                Click affected body parts
            </h3>
            <svg width="400" height="400" style={{ margin: '0 auto', display: 'block' }}>
                {bodyParts.map(part => (
                    <g key={part.id} onClick={() => toggle(part)} style={{ cursor: 'pointer' }}>
                        <rect
                            x={part.x}
                            y={part.y}
                            width={part.w}
                            height={part.h}
                            rx="10"
                            fill={selected.includes(part.id) ? '#4A90E2' : '#E8F4FD'}
                            stroke={selected.includes(part.id) ? '#1a5276' : '#AED6F1'}
                            strokeWidth="2"
                        />
                        <text
                            x={part.x + part.w / 2}
                            y={part.y + part.h / 2}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="11"
                            fill={selected.includes(part.id) ? '#fff' : '#333'}
                        >
                            {part.label}
                        </text>
                    </g>
                ))}
            </svg>
            <p style={{ color: '#666', fontSize: '13px' }}>
                Selected: {selected.length === 0 ? 'None' : selected.join(', ')}
            </p>
        </div>
    );
};

export default BodyMap;