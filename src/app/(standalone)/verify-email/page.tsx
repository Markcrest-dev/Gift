'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function VerifyEmailPage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [success, setSuccess] = useState(false);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock verification
        setSuccess(true);
        setTimeout(() => {
            // Redirect would happen here
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c41e3a] via-[#8b0000] to-[#228b22] p-4 relative overflow-hidden">
            {/* Snowfall bg would be here */}

            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative z-10 fade-in-up">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📧</div>
                    <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
                    <p className="text-secondary">
                        We&apos;ve sent a 6-digit verification code to<br />
                        <strong>your@email.com</strong>
                    </p>
                </div>

                {success ? (
                    <div className="text-center animate-bounce">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-xl font-bold text-green-600">Email Verified!</h2>
                        <p className="mb-4">Redirecting you...</p>
                        <Link href="/dashboard" className="btn btn-primary w-full">Go to Dashboard</Link>
                    </div>
                ) : (
                    <form onSubmit={handleVerify}>
                        <div className="flex gap-2 justify-center mb-8">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength={1}
                                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-[#c41e3a] focus:outline-none transition-all"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>

                        <Button type="submit" variant="primary" size="lg" fullWidth>Verify Email</Button>

                        <div className="text-center mt-6 text-secondary">
                            Didn&apos;t receive the code? <span className="text-[#c41e3a] font-semibold cursor-pointer hover:underline">Resend</span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
