import React from 'react';
import SymptomForm from './components/SymptomForm';

function App() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f0f4f8',
            paddingTop: '30px',
            paddingBottom: '30px'
        }}>
            <SymptomForm />
        </div>
    );
}

export default App;