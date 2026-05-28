import React from 'react';

const UrgencyIndicator = ({ urgency }) => {
    if (!urgency) return null;

    const icons = {
        red: '🔴',
        yellow: '🟡',
        green: '🟢'
    };

    const backgrounds = {
        red: '#fff5f5',
        yellow: '#fffdf0',
        green: '#f0fff4'
    };

    return (
        <div style={{
            backgroundColor: backgrounds[urgency.level],
            border: `2px solid ${urgency.color}`,
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            marginTop: '20px'
        }}>
            <div style={{ fontSize: '48px' }}>
                {icons[urgency.level]}
            </div>
            <h3 style={{ color: urgency.color, margin: '10px 0' }}>
                {urgency.level.toUpperCase()}
            </h3>
            <p style={{ color: '#333', fontSize: '16px' }}>
                {urgency.message}
            </p>
        </div>
    );
};

export default UrgencyIndicator;