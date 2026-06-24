'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Gift } from 'lucide-react';

export default function ForgotPasswordPage() {
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Password reset instructions sent!'); };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F0EB] px-4 font-body py-12">
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl w-full max-w-[440px] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A4535]"></div>
                
                <div className="flex justify-center items-center gap-2 mb-8 mt-2">
                    <Gift className="w-6 h-6 text-[#0A4535]" />
                    <span className="font-display text-xl font-medium text-[#0A4535]">Gift<span className="text-[#0A4535]/70">Exchange</span></span>
                </div>

                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl text-[#0A4535] mb-3">Reset password</h1>
                    <p className="text-gray-500 text-sm">Enter your email to receive reset instructions</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="email" 
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-body text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all placeholder-gray-400" 
                            placeholder="you@example.com" 
                            required 
                            autoComplete="email" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors py-3.5 rounded-full shadow-md mt-2"
                    >
                        Send Instructions
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link href="/login" className="text-[#0A4535] font-bold hover:underline transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
