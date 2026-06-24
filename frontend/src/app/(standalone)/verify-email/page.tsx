'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Mail, CheckCircle } from 'lucide-react';

export default function VerifyEmailPage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(true);
        // Would normally redirect after 2s
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base px-4">
            <div className="bg-surface rounded-lg max-w-[420px] w-full p-8 md:p-10">
                {success ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-green" />
                        </div>
                        <h1 className="font-display text-3xl font-bold text-paper mb-3">Email verified</h1>
                        <p className="text-paper/40 text-sm mb-8">Your account is now ready.</p>
                        <Link href="/dashboard"><Button variant="primary" size="lg" fullWidth>Go to Dashboard</Button></Link>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-8 h-8 text-gold" />
                            </div>
                            <h1 className="font-display text-3xl font-bold text-paper mb-2">Check your email</h1>
                            <p className="text-paper/40 text-sm">
                                We sent a 6-digit code to<br />
                                <span className="text-paper font-medium">your@email.com</span>
                            </p>
                        </div>

                        <form onSubmit={handleVerify}>
                            <div className="flex justify-between gap-2 mb-8">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => { inputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-14 bg-base border border-paper/10 rounded-[4px] text-center text-xl font-mono text-paper focus:outline-none focus:border-gold transition-colors"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                ))}
                            </div>
                            <Button type="submit" variant="primary" size="lg" fullWidth>Verify Email</Button>
                        </form>

                        <p className="text-center text-paper/30 text-sm mt-8">
                            Didn&apos;t receive the code?{' '}
                            <button className="text-gold/70 hover:text-gold transition-colors font-medium">Resend</button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
