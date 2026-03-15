'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const result = await auth.signup(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName,
        );
        setLoading(false);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Signup failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card fade-in-up" style={{ maxWidth: '500px' }}>
                <div className="auth-header">
                    <div className="auth-logo"><i className="fas fa-gift"></i></div>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join thousands spreading joy worldwide</p>
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
                    <span>or sign up with email</span>
                </div>

                {error && (
                    <div style={{ color: '#ff4444', background: '#fff0f0', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} id="signupForm">
                    <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" id="firstName" className="form-input" placeholder="John" required value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" id="lastName" className="form-input" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" id="email" className="form-input" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="form-input"
                                placeholder="Create a strong password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="input-group" style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="form-input"
                                placeholder="Re-enter your password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-checkbox-label">
                            <input type="checkbox" className="form-checkbox" id="terms" required />
                            <span>I agree to the <Link href="/terms-of-service" target="_blank">Terms of Service</Link> and <Link href="/privacy-policy" target="_blank">Privacy Policy</Link></span>
                        </label>
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link href="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
}
