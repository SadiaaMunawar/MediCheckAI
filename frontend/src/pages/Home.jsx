import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div style={{ paddingTop: '60px' }}>
            {/* Hero */}
            <div style={{ textAlign: 'center', padding: '100px 40px 60px' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>➕</div>
                <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>
                    Your Health, <span style={{ color: '#00B4A6' }}>Intelligently Analyzed</span>
                </h1>
                <p style={{ color: '#94A3B8', fontSize: '18px', marginBottom: '40px' }}>
                    Not a doctor, but a smart first step
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button onClick={() => navigate('/dashboard')} style={{
                        backgroundColor: '#00B4A6', color: '#fff', border: 'none',
                        padding: '14px 32px', borderRadius: '30px', fontSize: '16px',
                        fontWeight: '600', cursor: 'pointer'
                    }}>Get Started</button>
                    <button onClick={() => navigate('/about')} style={{
                        backgroundColor: 'transparent', color: '#00B4A6',
                        border: '2px solid #00B4A6', padding: '14px 32px',
                        borderRadius: '30px', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
                    }}>Learn More</button>
                </div>
            </div>

            {/* Feature Cards */}
            <div style={{ display: 'flex', gap: '24px', padding: '0 60px 80px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                    { icon: '🧠', title: 'AI-Powered Diagnosis', desc: 'Machine learning model trained on 4,920 medical records to identify 41 diseases from 131 symptoms with high accuracy.' },
                    { icon: '⚡', title: 'Instant Triage', desc: 'Get immediate urgency assessment so you know whether to rest at home, visit a clinic, or seek emergency care.' },
                    { icon: '📄', title: 'PDF Health Report', desc: 'Download a comprehensive report with predicted conditions, confidence levels, and recommended precautions.' },
                ].map((card, i) => (
                    <div key={i} style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(0,180,166,0.2)',
                        borderRadius: '16px', padding: '32px 24px',
                        width: '280px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '36px', marginBottom: '16px',
                            backgroundColor: '#00B4A6', borderRadius: '50%',
                            width: '64px', height: '64px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            {card.icon}
                        </div>
                        <h3 style={{ color: '#F8FFFE', marginBottom: '12px' }}>{card.title}</h3>
                        <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6' }}>{card.desc}</p>
                    </div>
                ))}
            </div>

            {/* How It Works */}
            <div style={{ textAlign: 'center', padding: '0 60px 80px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '48px' }}>How It Works</h2>
                <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { num: '1', title: 'Describe Symptoms', desc: 'Enter your symptoms or select affected body areas on the interactive map.' },
                        { num: '2', title: 'AI Analysis', desc: 'Our model cross-references your symptoms against thousands of medical records.' },
                        { num: '3', title: 'Get Results', desc: 'Receive triage urgency, predicted conditions, and actionable health advice.' },
                    ].map((step, i) => (
                        <div key={i} style={{ width: '220px', textAlign: 'center' }}>
                            <div style={{
                                backgroundColor: '#FFB347', color: '#0A1628',
                                borderRadius: '50%', width: '48px', height: '48px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px', fontWeight: '800', margin: '0 auto 16px'
                            }}>{step.num}</div>
                            <h4 style={{ marginBottom: '8px' }}>{step.title}</h4>
                            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;