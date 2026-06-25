'use client';

import Link from 'next/link';
import { Gift, Send } from 'lucide-react';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
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
                        <div className="w-10 h-10 rounded-xl bg-emerald flex items-center justify-center shadow-md shadow-emerald/20">
                            <Gift className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {submitted ? (
                        <div className="text-center animate-fade-in py-4">
                            <h1 className="font-display text-3xl text-ink mb-3">Check your email</h1>
                            <p className="text-ink-muted text-[0.9375rem] leading-relaxed mb-8">
                                We've sent password reset instructions to your email address.
                            </p>
                            <Link href="/login">
                                <button className="w-full bg-base hover:bg-gray-100 text-ink font-semibold text-[0.9375rem] py-4 rounded-xl transition-all duration-200 shadow-sm">
                                    Return to login
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="font-display text-3xl text-ink mb-2">Reset password</h1>
                                <p className="text-ink-muted text-[0.9375rem]">Enter your email to receive reset instructions</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <input
                                        type="email"
                                        className={inputClass}
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="group w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-4 rounded-xl transition-all duration-200 shadow-md active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
                                >
                                    Send Instructions
                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-[0.9375rem] text-ink-muted">
                                    Remember your password?{' '}
                                    <Link href="/login" className="text-emerald font-bold hover:underline transition-all">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
