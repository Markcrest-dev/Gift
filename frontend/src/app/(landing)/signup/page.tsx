'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card fade-in-up" style={{ maxWidth: '500px' }}>
                <div className="auth-header">
                    <div className="auth-logo"><i className="fas fa-gift"></i></div>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join thousands spreading joy worldwide</p>
                </div>

                {/* Social Authentication */}
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

                {/* Signup Form */}
                <form onSubmit={handleSubmit} id="signupForm">
                    <div className="form-group">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input type="text" id="fullName" className="form-input" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" id="email" className="form-input" placeholder="john@example.com" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country" className="form-label">Country</label>
                        <select id="country" className="form-select" required defaultValue="">
                            <option value="" disabled>Select your country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="NG">Nigeria</option>
                            <option value="IN">India</option>
                            <option value="SG">Singapore</option>
                            <option value="AU">Australia</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                            <option value="ES">Spain</option>
                            <option value="MX">Mexico</option>
                            <option value="BR">Brazil</option>
                            <option value="ZA">South Africa</option>
                            <option value="JP">Japan</option>
                            <option value="CN">China</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender" className="form-label">Gender (Optional)</label>
                        <select id="gender" className="form-select" defaultValue="">
                            <option value="" disabled>Prefer not to say</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
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
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        <div className="password-strength">
                            <div className="password-strength-bar" id="strengthBar"></div>
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
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
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

                    <Button type="submit" fullWidth size="lg">
                        Create Account
                    </Button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link href="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
}
