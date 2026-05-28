import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/login', label: 'Login' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/results', label: 'Results' },
        { path: '/about', label: 'About' },
    ];

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            backgroundColor: 'rgba(10, 22, 40, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 180, 166, 0.2)',
            padding: '0 40px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🏥</span>
                <span style={{
                    fontSize: '18px', fontWeight: '700',
                    color: '#00B4A6'
                }}>MediCheck AI</span>
            </Link>

            {/* Nav Links */}
            <div style={{ display: 'flex', gap: '30px' }}>
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: location.pathname === link.path ? '#00B4A6' : '#94A3B8',
                            borderBottom: location.pathname === link.path ? '2px solid #00B4A6' : '2px solid transparent',
                            paddingBottom: '4px',
                            transition: 'all 0.2s',
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;