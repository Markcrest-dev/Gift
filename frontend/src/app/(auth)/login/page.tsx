'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
        'w-full bg-base border border-gray-200 text-ink text-[0.9375rem] rounded-xl px-4 py-4 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all placeholder:text-ink-faint';

    return (
        <main className="min-h-screen flex bg-base relative overflow-x-hidden">
            {/* Left Side: Design */}
            <div className="hidden lg:flex lg:w-1/2 lg:fixed lg:inset-y-0 lg:left-0 relative bg-emerald-light/10 z-20">
                <Image 
                    src="/images/auth-bg.png" 
                    alt="Festow Aesthetic" 
                    fill 
                    className="object-cover" 
                    priority 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-16 left-16 right-16 text-white z-10">
                    <h2 className="font-display text-4xl mb-4 leading-tight">The new standard for global gifting.</h2>
                    <p className="text-white/80 text-lg max-w-md">Seamless, elegant, and cross-border. Send joy anywhere in the world.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 lg:ml-auto flex flex-col items-center justify-center min-h-screen p-6 sm:p-12 pt-[100px] lg:pt-[100px] pb-12 relative z-10">
                {/* Ambient glows for the right side */}
                <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sage/60 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-light/20 blur-[120px] pointer-events-none" />

                <div className="reveal w-full max-w-[440px] relative z-10">
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
                            <h1 className="font-display text-3xl text-ink mb-2">Welcome back</h1>
                            <p className="text-ink-muted text-[0.9375rem]">Enter your details to access your dashboard.</p>
                        </div>

                        {error && (
                            <div className="animate-fade-in border border-red-200 bg-red-light text-red-dark px-4 py-3.5 mb-6 text-sm text-center rounded-xl font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                <div className="flex justify-end mt-3">
                                    <Link href="/forgot-password" className="text-sm text-emerald font-semibold hover:text-emerald-hover transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-4 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-md active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-ink-muted text-[0.9375rem]">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="text-emerald font-bold hover:underline transition-all">
                                    Start giving &rarr;
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Trust indicator */}
                    <div className="mt-8 text-center text-sm text-ink-faint font-medium">
                        Secure login with 256-bit encryption
                    </div>
                </div>
            </div>
        </main>
    );
}
