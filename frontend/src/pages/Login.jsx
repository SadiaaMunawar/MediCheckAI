import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [tab, setTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/dashboard');
    };

    const inputStyle = {
        width: '100%', padding: '12px 16px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(0,180,166,0.3)',
        borderRadius: '8px', color: '#F8FFFE',
        fontSize: '14px', outline: 'none',
        marginBottom: '16px', boxSizing: 'border-box'
    };

    return (
        <div style={{
            paddingTop: '60px', minHeight: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '80px', padding: '100px 40px'
        }}>
            {/* Form Card */}
            <div style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,180,166,0.2)',
                borderRadius: '20px', padding: '40px', width: '380px'
            }}>
                {/* Tabs */}
                <div style={{ display: 'flex', marginBottom: '32px', borderBottom: '1px solid rgba(0,180,166,0.2)' }}>
                    {['login', 'register'].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            flex: 1, padding: '12px', background: 'none', border: 'none',
                            color: tab === t ? '#00B4A6' : '#64748B',
                            borderBottom: tab === t ? '2px solid #00B4A6' : '2px solid transparent',
                            fontSize: '15px', fontWeight: '600', cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}>{t === 'login' ? 'Login' : 'Register'}</button>
                    ))}
                </div>

                {tab === 'register' && (
                    <input style={inputStyle} placeholder="Full Name"
                        value={name} onChange={e => setName(e.target.value)} />
                )}
                <input style={inputStyle} placeholder="Email Address"
                    type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input style={inputStyle} placeholder="Enter your password"
                    type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <button onClick={handleSubmit} style={{
                    width: '100%', padding: '14px', backgroundColor: '#00B4A6',
                    color: '#fff', border: 'none', borderRadius: '8px',
                    fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px'
                }}>{tab === 'login' ? 'Sign In' : 'Create Account'}</button>

                <div style={{ textAlign: 'center' }}>
                    <span onClick={() => navigate('/dashboard')} style={{
                        color: '#00B4A6', fontSize: '14px', cursor: 'pointer'
                    }}>Continue as Guest →</span>
                </div>
            </div>

            {/* Illustration */}
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: '200px', height: '200px', borderRadius: '50%',
                    border: '2px dashed #00B4A6', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '80px'
                }}>🧬</div>
                <p style={{ color: '#00B4A6', marginTop: '16px', fontSize: '14px' }}>Secure & Private</p>
            </div>
        </div>
    );
};

export default Login;