'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
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
        <div className="min-h-screen flex items-center justify-center bg-[#F4F0EB] px-4 font-body py-12">
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl w-full max-w-[480px] p-8 md:p-12 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A4535]"></div>

                {success ? (
                    <div className="animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <CheckCircle className="w-10 h-10 text-[#0A4535]" />
                        </div>
                        <h1 className="font-display text-4xl text-[#0A4535] mb-4">Verified!</h1>
                        <p className="text-gray-500 text-base mb-10 font-medium">Your account is securely set up and ready to go.</p>
                        <Link href="/dashboard">
                            <button className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors py-4 rounded-full shadow-md">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <Mail className="w-8 h-8 text-[#0A4535]" />
                        </div>
                        <h1 className="font-display text-3xl text-[#0A4535] mb-3">Check your email</h1>
                        <p className="text-gray-500 text-sm font-medium mb-10">
                            We sent a 6-digit verification code to<br />
                            <span className="text-gray-900 font-bold mt-1 inline-block">hello@example.com</span>
                        </p>

                        <form onSubmit={handleVerify}>
                            <div className="flex justify-between gap-2 mb-10">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => { inputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-14 md:w-14 md:h-16 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-mono font-bold text-[#0A4535] focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all shadow-inner"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                ))}
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors py-4 rounded-full shadow-md"
                            >
                                Verify Email
                            </button>
                        </form>

                        <p className="text-center text-gray-500 text-sm mt-8 font-medium">
                            Didn&apos;t receive the code?{' '}
                            <button className="text-[#0A4535] hover:underline font-bold transition-colors">Resend</button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
