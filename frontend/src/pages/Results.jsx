import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    const urgencyColors = { red: '#FF4757', yellow: '#FFA502', green: '#2ED573' };
    const urgencyLabels = {
        red: 'Critical — Seek Emergency Care',
        yellow: 'Moderate — Visit a clinic within 24 hours',
        green: 'Mild — Rest at home and monitor'
    };

    const precautionsMap = {
        default: [
            'Rest and stay hydrated',
            'Monitor your symptoms closely',
            'Avoid self-medication without consultation',
            'Consult a physician if symptoms persist beyond 72 hours',
            'Keep a record of symptom changes'
        ]
    };

    const generatePDF = () => {
        if (!result) return;
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('MediCheck AI — Symptom Report', 105, 20, { align: 'center' });
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text(`Urgency: ${result.urgency.level.toUpperCase()}`, 14, 50);
        doc.text(urgencyLabels[result.urgency.level], 14, 60);
        autoTable(doc, {
            startY: 75,
            head: [['Disease', 'Confidence %']],
            body: result.predictions.map(p => [p.disease, `${p.confidence}%`]),
            theme: 'striped',
            headStyles: { fillColor: [0, 180, 166] }
        });
        doc.save('medicheck_report.pdf');
    };

    if (!result) return (
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
            <p style={{ color: '#94A3B8', fontSize: '18px' }}>No results yet.</p>
            <button onClick={() => navigate('/dashboard')} style={{
                marginTop: '20px', padding: '12px 24px', backgroundColor: '#00B4A6',
                color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'
            }}>Go to Dashboard</button>
        </div>
    );

    const urgencyColor = urgencyColors[result.urgency.level];

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', padding: '80px 60px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px' }}>Analysis Results</h2>

            {/* Urgency Badge */}
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                backgroundColor: `${urgencyColor}22`,
                border: `1px solid ${urgencyColor}`,
                borderRadius: '30px', padding: '10px 20px', marginBottom: '32px'
            }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: urgencyColor }} />
                <span style={{ color: urgencyColor, fontWeight: '600' }}>
                    {urgencyLabels[result.urgency.level]}
                </span>
            </div>

            {/* Predictions */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '16px', padding: '24px', marginBottom: '24px'
            }}>
                <h3 style={{ marginBottom: '20px', color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Predicted Conditions
                </h3>
                {result.predictions.map((p, i) => (
                    <div key={i} style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontWeight: '600' }}>{i + 1}. {p.disease}</span>
                            <span style={{ color: '#00B4A6', fontWeight: '700' }}>{p.confidence}%</span>
                        </div>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', height: '8px' }}>
                            <div style={{
                                width: `${p.confidence}%`, height: '100%',
                                backgroundColor: '#00B4A6', borderRadius: '4px',
                                transition: 'width 1s ease'
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Symptoms */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '16px', padding: '24px', marginBottom: '24px'
            }}>
                <h3 style={{ marginBottom: '16px', color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Symptoms Detected
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {result.symptoms_found.map((s, i) => (
                        <span key={i} style={{
                            backgroundColor: 'rgba(0,180,166,0.15)',
                            border: '1px solid rgba(0,180,166,0.3)',
                            borderRadius: '20px', padding: '6px 14px',
                            fontSize: '13px', color: '#00B4A6'
                        }}>{s.replace(/_/g, ' ')}</span>
                    ))}
                </div>
            </div>

            {/* Precautions */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '16px', padding: '24px', marginBottom: '32px'
            }}>
                <h3 style={{ marginBottom: '16px', color: '#94A3B8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Recommended Precautions
                </h3>
                {precautionsMap.default.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ color: '#00B4A6' }}>•</span>
                        <span style={{ color: '#94A3B8', fontSize: '14px' }}>{p}</span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={generatePDF} style={{
                    padding: '14px 28px', backgroundColor: '#FFB347',
                    color: '#0A1628', border: 'none', borderRadius: '10px',
                    fontSize: '15px', fontWeight: '700', cursor: 'pointer'
                }}>⬇️ Download PDF Report</button>
                <button onClick={() => navigate('/dashboard')} style={{
                    padding: '14px 28px', backgroundColor: 'transparent',
                    color: '#00B4A6', border: '2px solid #00B4A6',
                    borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer'
                }}>Check Again</button>
            </div>
        </div>
    );
};

export default Results;