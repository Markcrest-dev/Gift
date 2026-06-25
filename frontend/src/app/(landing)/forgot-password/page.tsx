'use client';

import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function ForgotPasswordPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password reset instructions sent!');
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
                    <h1 className="font-display text-3xl text-ink mb-2">Reset password</h1>
                    <p className="text-ink-muted text-sm">Enter your email to receive reset instructions</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-3.5 rounded-full transition-colors shadow-sm mt-2"
                    >
                        Send Instructions
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-sm text-ink-muted">
                        Remember your password?{' '}
                        <Link href="/login" className="text-emerald font-bold hover:underline transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
