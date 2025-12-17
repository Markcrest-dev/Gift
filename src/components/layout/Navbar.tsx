'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link href="/" className="navbar-logo">
                        <i className="fas fa-gift navbar-logo-icon"></i>
                        <span>GiftExchange</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-menu">
                        <div className="navbar-links">
                            <Link href="/about" className="navbar-link">
                                About
                            </Link>
                            <Link href="/contact" className="navbar-link">
                                Contact
                            </Link>
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="navbar-actions">
                            <Link href="/login" className="btn btn-outline">
                                Login
                            </Link>
                            <Link href="/signup" className="btn btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />
        </>
    );
}
