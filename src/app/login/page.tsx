'use client';

import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });

        // Redirect to dashboard after login
        router.push('/dashboard');
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
                                Welcome Back
                            </h1>
                            <p className="text-secondary">Login to continue spreading joy</p>
                        </div>

                        {/* Demo Account Notice */}
                        <div className="alert alert-success mb-md">
                            <p className="text-sm">
                                <strong>Demo Account:</strong><br />
                                Email: demo@gift.com<br />
                                Password: Demo123!
                            </p>
                        </div>

                        {/* Login Form */}
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

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between mb-md" style={{ fontSize: '0.875rem' }}>
                                <label className="flex items-center form-checkbox-label">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-secondary">Remember me</span>
                                </label>
                                <Link href="/forgot-password" className="text-red font-medium hover-glow">
                                    Forgot password?
                                </Link>
                            </div>

                            <button type="submit" className="btn btn-primary w-full btn-lg">
                                Sign In
                            </button>
                        </form>

                        {/* Social Login */}
                        <div className="mt-lg">
                            <div className="divider"></div>
                            <p className="text-center text-secondary mb-md">Or continue with</p>

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

                        {/* Sign Up Link */}
                        <p className="mt-xl text-center text-secondary">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-red font-semibold">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
