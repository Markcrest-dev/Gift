'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Gift } from 'lucide-react';

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
        'w-full bg-base border border-gray-200 text-ink text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all placeholder:text-ink-faint';

    return (
        <div className="min-h-screen flex items-center justify-center bg-base px-4 pt-[72px] pb-12">
            <div className="bg-white border border-gray-100 shadow-xl shadow-emerald/[0.03] rounded-2xl w-full max-w-[420px] p-8 md:p-10 relative overflow-hidden">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald" />

                {/* Logo */}
                <div className="flex justify-center items-center gap-2.5 mb-8 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
                        <Gift className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-display text-xl text-emerald">
                        Gift<span className="text-emerald/60">Exchange</span>
                    </span>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl text-ink mb-2">Create account</h1>
                    <p className="text-ink-muted text-sm">Start sending gifts across borders</p>
                </div>

                {error && (
                    <div className="border border-red-200 bg-red-light text-red-dark px-4 py-3 mb-6 text-sm text-center rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            <option value="">Select country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-3.5 rounded-full transition-colors disabled:opacity-50 shadow-sm mt-2"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-8">
                    <Link href="/login" className="text-sm text-ink-muted hover:text-ink font-medium transition-colors">
                        Already have an account?{' '}
                        <span className="text-emerald font-bold">Sign in &rarr;</span>
                    </Link>
                </div>

                <div className="text-center mt-6">
                    <p className="text-[0.6875rem] text-ink-faint">
                        By creating an account you agree to our Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
