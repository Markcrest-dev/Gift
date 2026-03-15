'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await auth.login(formData.email, formData.password);
        setLoading(false);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card fade-in-up">
                <div className="auth-header">
                    <div className="auth-logo"><i className="fas fa-gift"></i></div>
                    <h1 className="auth-title">Welcome Back!</h1>
                    <p className="auth-subtitle">Login to continue spreading joy</p>
                </div>

                <div className="social-auth">
                    <button className="social-btn">
                        <span><i className="fab fa-google"></i></span>
                        <span>Google</span>
                    </button>
                    <button className="social-btn">
                        <span><i className="fab fa-facebook"></i></span>
                        <span>Facebook</span>
                    </button>
                </div>

                <div className="divider-text">
                    <span>or login with email</span>
                </div>

                {error && (
                    <div className="alert alert-error mb-md" style={{ color: '#ff4444', background: '#fff0f0', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} id="loginForm">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <label className="form-checkbox-label">
                            <input type="checkbox" className="form-checkbox" id="remember" />
                            <span>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="forgot-link">Forgot password?</Link>
                    </div>

                    <Button type="submit" fullWidth className="mt-xl" size="lg" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <div className="auth-footer">
                    Don&apos;t have an account? <Link href="/signup">Sign up here</Link>
                </div>
            </div>
        </div>
    );
}
