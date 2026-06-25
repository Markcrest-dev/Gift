'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Gift } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

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
                    <h1 className="font-display text-3xl text-ink mb-2">Welcome back</h1>
                    <p className="text-ink-muted text-sm">Enter your details to access your dashboard.</p>
                </div>

                {error && (
                    <div className="border border-red-200 bg-red-light text-red-dark px-4 py-3 mb-6 text-sm text-center rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <div className="flex justify-end mt-2">
                            <Link href="/forgot-password" className="text-sm text-emerald font-medium hover:underline transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-3.5 rounded-full transition-colors disabled:opacity-50 shadow-sm mt-2"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-[0.6875rem] text-ink-faint uppercase tracking-[0.15em] font-semibold">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                </div>

                <div className="text-center">
                    <Link href="/signup" className="text-sm text-ink-muted hover:text-ink font-medium transition-colors">
                        Don&apos;t have an account?{' '}
                        <span className="text-emerald font-bold">Start giving &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
