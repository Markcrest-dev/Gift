'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Password reset instructions sent!'); };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base px-4 py-16">
            <div className="bg-surface rounded-lg max-w-[420px] w-full p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold text-paper mb-2">Reset password</h1>
                    <p className="text-paper/40 text-sm">Enter your email to receive reset instructions</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-paper/60 text-sm font-medium mb-2">Email</label>
                        <input type="email" id="email" className="w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors" placeholder="you@example.com" required autoComplete="email" />
                    </div>
                    <Button type="submit" fullWidth size="lg">Send Instructions</Button>
                </form>
                <p className="text-center text-paper/30 text-sm mt-8">
                    Remember your password? <Link href="/login" className="text-gold/70 hover:text-gold transition-colors font-medium">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
