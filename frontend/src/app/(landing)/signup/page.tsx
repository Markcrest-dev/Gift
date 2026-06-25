'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        country: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const parts = formData.fullName.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';

        const result = await auth.signup(formData.email, formData.password, firstName, lastName);
        setLoading(false);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Signup failed');
        }
    };

    const inputClass =
        'w-full bg-base border border-gray-200 text-ink text-[0.9375rem] rounded-xl px-4 py-4 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all placeholder:text-ink-faint';

    return (
        <main className="min-h-screen flex items-center justify-center bg-base relative overflow-hidden pt-[72px] pb-12">
            {/* Ambient glows */}
            <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sage/60 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-light/20 blur-[120px] pointer-events-none" />

            <div className="reveal w-full max-w-[440px] px-4 relative z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-emerald/[0.04] rounded-[2rem] p-8 md:p-10">
                    {/* Logo */}
                    <div className="flex justify-center items-center gap-2.5 mb-8">
                        <Image 
                            src="/festow-logo.png" 
                            alt="Festow" 
                            width={40} 
                            height={40} 
                            className="h-10 w-auto object-contain rounded-xl shadow-md shadow-emerald/20" 
                        />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="font-display text-3xl text-ink mb-2">Create account</h1>
                        <p className="text-ink-muted text-[0.9375rem]">Start sending gifts across borders</p>
                    </div>

                    {error && (
                        <div className="animate-fade-in border border-red-200 bg-red-light text-red-dark px-4 py-3.5 mb-6 text-sm text-center rounded-xl font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Full Name"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                className={inputClass}
                                placeholder="Email address"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                className={inputClass}
                                placeholder="Password (min. 6 characters)"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <select
                                className={`${inputClass} appearance-none`}
                                required
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            >
                                <option value="" disabled className="text-ink-faint">Select your country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-4 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-md active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-ink-muted text-[0.9375rem]">
                            Already have an account?{' '}
                            <Link href="/login" className="text-emerald font-bold hover:underline transition-all">
                                Sign in &rarr;
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-ink-faint">
                            By creating an account you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>

                {/* Trust indicator */}
                <div className="mt-8 text-center text-sm text-ink-faint font-medium">
                    Join 50,000+ gifters worldwide
                </div>
            </div>
        </main>
    );
}
