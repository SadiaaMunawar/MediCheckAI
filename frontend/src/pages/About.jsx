import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const diseaseData = [
    { name: 'Fungal Infection', count: 120 },
    { name: 'Allergy', count: 110 },
    { name: 'GERD', count: 100 },
    { name: 'Diabetes', count: 95 },
    { name: 'Gastroenteritis', count: 90 },
    { name: 'Bronchial Asthma', count: 88 },
    { name: 'Hypertension', count: 85 },
    { name: 'Migraine', count: 80 },
    { name: 'Jaundice', count: 78 },
    { name: 'Malaria', count: 75 },
];

const About = () => {
    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', padding: '80px 60px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>About MediCheck AI</h2>
            <p style={{ color: '#94A3B8', marginBottom: '32px' }}>Built with advanced machine learning for reliable symptom analysis</p>

            {/* Accuracy Badge */}
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                backgroundColor: 'rgba(46,213,115,0.15)',
                border: '1px solid #2ED573', borderRadius: '30px',
                padding: '10px 20px', marginBottom: '32px'
            }}>
                <span style={{ color: '#2ED573' }}>✅ 100% Model Accuracy on Test Dataset</span>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {[
                    { value: '131', label: 'Symptoms Tracked' },
                    { value: '41', label: 'Diseases Identified' },
                    { value: '4,920', label: 'Training Records' },
                    { value: '100%', label: 'Test Accuracy' },
                ].map((stat, i) => (
                    <div key={i} style={{
                        flex: 1, minWidth: '150px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,180,166,0.2)',
                        borderRadius: '16px', padding: '24px', textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '32px', fontWeight: '800', color: '#00B4A6' }}>{stat.value}</p>
                        <p style={{ color: '#94A3B8', fontSize: '13px', marginTop: '4px' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Bar Chart */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '16px', padding: '24px', marginBottom: '24px'
            }}>
                <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Top 10 Diseases in Dataset</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={diseaseData}>
                        <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0A1628', border: '1px solid #00B4A6', borderRadius: '8px' }} />
                        <Bar dataKey="count" fill="#00B4A6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* System Architecture */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '16px', padding: '24px', marginBottom: '24px'
            }}>
                <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>System Architecture</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                        { title: 'User Input', sub: 'Symptoms' },
                        { title: 'Preprocessing', sub: 'Feature Extraction' },
                        { title: 'ML Model', sub: 'Random Forest' },
                        { title: 'Prediction', sub: 'Disease + Urgency' },
                        { title: 'Report', sub: 'PDF Generation' },
                    ].map((step, i) => (
                        <React.Fragment key={i}>
                            <div style={{
                                backgroundColor: 'rgba(0,180,166,0.15)',
                                border: '1px solid rgba(0,180,166,0.3)',
                                borderRadius: '8px', padding: '12px 16px', textAlign: 'center', minWidth: '110px'
                            }}>
                                <p style={{ fontWeight: '600', fontSize: '13px' }}>{step.title}</p>
                                <p style={{ color: '#94A3B8', fontSize: '11px', marginTop: '4px' }}>{step.sub}</p>
                            </div>
                            {i < 4 && <span style={{ color: '#00B4A6', fontSize: '20px' }}>→</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Team */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '16px', padding: '24px'
            }}>
                <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Development Team</h3>
                <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.8' }}>
                    Built by a team of ML engineers and healthcare technology researchers committed to making
                    preliminary health assessment accessible to everyone. This tool is designed to assist —
                    not replace — professional medical consultation.
                </p>
            </div>
        </div>
    );
};

export default About;