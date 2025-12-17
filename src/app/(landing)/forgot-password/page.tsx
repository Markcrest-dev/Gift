'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password reset instructions sent!');
    };

    return (
        <div className="auth-container">
            <div className="auth-card fade-in-up">
                <div className="auth-header">
                    <div className="auth-logo"><i className="fas fa-gift"></i></div>
                    <h1 className="auth-title">Forgot Password</h1>
                    <p className="auth-subtitle">Enter your email to receive reset instructions</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <Button type="submit" fullWidth className="mt-xl" size="lg">
                        Send Instructions
                    </Button>
                </form>

                <div className="auth-footer">
                    Remember your password? <Link href="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
}
