import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'rgba(10, 22, 40, 0.95)',
            borderTop: '1px solid rgba(0, 180, 166, 0.2)',
            padding: '20px 40px',
            textAlign: 'center',
        }}>
            <p style={{ color: '#00B4A6', fontSize: '14px', fontWeight: '600' }}>
                MediCheck AI — AI-powered symptom analysis for informed health decisions
            </p>
            <p style={{ color: '#64748B', fontSize: '12px', marginTop: '6px' }}>
                ⚠️ This is not a substitute for professional medical advice. Always consult a healthcare provider.
            </p>
        </footer>
    );
};

export default Footer;