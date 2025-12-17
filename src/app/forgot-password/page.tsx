'use client';

import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password reset logic here
        console.log('Password reset request for:', email);
        setSubmitted(true);
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
                                Forgot Password?
                            </h1>
                            <p className="text-secondary">
                                {submitted
                                    ? "Check your email for reset instructions"
                                    : "Enter your email to receive a password reset link"
                                }
                            </p>
                        </div>

                        {submitted ? (
                            /* Success Message */
                            <div className="text-center">
                                <div className="alert alert-success mb-lg">
                                    <i className="fas fa-check-circle text-2xl mb-md"></i>
                                    <p>
                                        <strong>Reset link sent!</strong><br />
                                        We've sent a password reset link to <strong>{email}</strong>.
                                        Please check your inbox and spam folder.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-md">
                                    <Link href="/login" className="btn btn-primary w-full btn-lg">
                                        Back to Login
                                    </Link>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="btn btn-outline w-full"
                                    >
                                        Try Different Email
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Reset Form */
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full btn-lg">
                                        Send Reset Link
                                    </button>
                                </form>

                                {/* Back to Login Link */}
                                <p className="mt-xl text-center text-secondary">
                                    Remember your password?{' '}
                                    <Link href="/login" className="text-red font-semibold">
                                        Back to Login
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
