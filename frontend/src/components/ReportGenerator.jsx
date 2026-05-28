import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportGenerator = ({ symptoms, predictions, urgency }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text('Medical Symptom Report', 105, 20, { align: 'center' });

        // Date
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });

        // Urgency
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text(`Urgency Level: ${urgency.level.toUpperCase()}`, 14, 50);
        doc.setFontSize(11);
        doc.text(urgency.message, 14, 58);

        // Symptoms
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text('Symptoms Detected:', 14, 75);
        doc.setFontSize(11);
        doc.setTextColor(80);
        symptoms.forEach((symptom, i) => {
            doc.text(`• ${symptom.replace(/_/g, ' ')}`, 20, 85 + (i * 8));
        });

        // Predictions table
        const tableStart = 90 + symptoms.length * 8;
        doc.setFontSize(14);
        doc.setTextColor(40);
        doc.text('Possible Conditions:', 14, tableStart);

        autoTable(doc, {
            startY: tableStart + 5,
            head: [['Disease', 'Confidence %']],
            body: predictions.map(p => [
                p.disease,
                `${p.confidence}%`
            ]),
            theme: 'striped',
            headStyles: { fillColor: [74, 144, 226] }
        });

        // Disclaimer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
            'Note: This is NOT a medical diagnosis. Please consult a doctor.',
            105,
            doc.lastAutoTable.finalY + 15,
            { align: 'center' }
        );

        doc.save('symptom_report.pdf');
    };

    return (
        <button
            onClick={generatePDF}
            style={{
                backgroundColor: '#28A745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: '20px',
                width: '100%'
            }}
        >
            Download PDF Report
        </button>
    );
};

export default ReportGenerator;