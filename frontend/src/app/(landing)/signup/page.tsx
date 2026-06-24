'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const inputClass = "w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors duration-150";

    return (
        <div className="min-h-screen flex items-center justify-center bg-base px-4 py-16">
            <div className="bg-surface rounded-lg max-w-[480px] w-full p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold text-paper mb-2">Create account</h1>
                    <p className="text-paper/40 text-sm">Start sending gifts across borders</p>
                </div>

                {error && (
                    <div className="bg-red/10 border border-red/20 rounded-[4px] px-4 py-3 mb-6 text-red text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} id="signupForm">
                    <div className="flex gap-3 mb-5">
                        <div className="flex-1">
                            <label htmlFor="firstName" className="block text-paper/60 text-sm font-medium mb-2">First name</label>
                            <input type="text" id="firstName" className={inputClass} placeholder="John" required value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="lastName" className="block text-paper/60 text-sm font-medium mb-2">Last name</label>
                            <input type="text" id="lastName" className={inputClass} placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block text-paper/60 text-sm font-medium mb-2">Email</label>
                        <input type="email" id="email" className={inputClass} placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block text-paper/60 text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`${inputClass} pr-11`}
                                placeholder="Min. 6 characters"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/30 hover:text-paper/60 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-paper/60 text-sm font-medium mb-2">Confirm password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className={`${inputClass} pr-11`}
                                placeholder="Re-enter password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/30 hover:text-paper/60 transition-colors" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                            <input type="checkbox" className="w-3.5 h-3.5 accent-gold rounded mt-0.5" id="terms" required />
                            <span className="text-paper/40 text-sm leading-relaxed">
                                I agree to the{' '}
                                <Link href="/terms-of-service" className="text-gold/70 hover:text-gold transition-colors" target="_blank">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy-policy" className="text-gold/70 hover:text-gold transition-colors" target="_blank">Privacy Policy</Link>
                            </span>
                        </label>
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>

                <p className="text-center text-paper/30 text-sm mt-8">
                    Already have an account?{' '}
                    <Link href="/login" className="text-gold/70 hover:text-gold transition-colors font-medium">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
