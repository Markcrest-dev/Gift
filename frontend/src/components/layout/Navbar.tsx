'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link href="/" className="navbar-logo">
                        <span className="navbar-logo-icon"><i className="fas fa-gift"></i></span>
                        <span>GiftExchange</span>
                    </Link>

                    <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`} id="navMenu">
                        <div className="navbar-links">
                            <Link href="/about" className="navbar-link">About</Link>
                            <Link href="/contact" className="navbar-link">Contact</Link>
                        </div>

                        <div className="navbar-actions">
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="primary">Get Started</Button>
                            </Link>
                        </div>
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        id="mobileMenuToggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div
                    className="mobile-overlay active"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}
        </>
    );
}
