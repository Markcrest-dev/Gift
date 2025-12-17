'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Signup attempt:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Navbar />

            <div className="section bg-secondary">
                <div className="container" style={{ maxWidth: '500px' }}>
                    <div className="card p-2xl fade-in-up">
                        {/* Header */}
                        <div className="text-center mb-lg">
                            <h1 className="text-red mb-sm">
                                Get Started
                            </h1>
                            <p className="text-secondary">Create your account to start gifting</p>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-md">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                />
                                <p className="text-xs text-light mt-xs">Must be at least 8 characters</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-start mb-md">
                                <input type="checkbox" id="terms" className="form-checkbox" required />
                                <label htmlFor="terms" className="text-sm text-secondary">
                                    I agree to the{' '}
                                    <Link href="/terms-of-service" className="text-red">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy-policy" className="text-red">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary w-full btn-lg">
                                Create Account
                            </button>
                        </form>

                        {/* Social Signup */}
                        <div className="mt-lg">
                            <div className="divider"></div>
                            <p className="text-center text-secondary mb-md">Or sign up with</p>

                            <div className="grid grid-cols-2 gap-md">
                                <button className="btn btn-outline">
                                    <i className="fab fa-google text-lg mr-2" style={{ color: '#EA4335' }}></i>
                                    <span>Google</span>
                                </button>
                                <button className="btn btn-outline">
                                    <i className="fab fa-facebook text-lg mr-2" style={{ color: '#1877F2' }}></i>
                                    <span>Facebook</span>
                                </button>
                            </div>
                        </div>

                        {/* Login Link */}
                        <p className="mt-xl text-center text-secondary">
                            Already have an account?{' '}
                            <Link href="/login" className="text-red font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
