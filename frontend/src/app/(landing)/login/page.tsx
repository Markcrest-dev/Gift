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

    const inputClass = "w-full bg-gray-50 border border-gray-200 text-gray-900 font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all placeholder-gray-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F0EB] px-4 font-body py-12">
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl w-full max-w-[440px] p-8 md:p-12 relative overflow-hidden">
                {/* Decorative Top Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A4535]"></div>
                
                {/* Logo/Wordmark */}
                <div className="flex justify-center items-center gap-2 mb-8 mt-2">
                    <Gift className="w-6 h-6 text-[#0A4535]" />
                    <span className="font-display text-xl font-medium text-[#0A4535]">Gift<span className="text-[#0A4535]/70">Exchange</span></span>
                </div>

                {/* Headers */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl md:text-4xl text-[#0A4535] mb-3">Welcome back</h1>
                    <p className="text-gray-500 text-sm md:text-base">Enter your details to access your dashboard.</p>
                </div>

                {error && (
                    <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 mb-6 text-sm text-center rounded-xl font-medium">
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
                        <div className="flex justify-end mt-2">
                            <Link href="/forgot-password" className="text-sm text-[#0A4535] font-medium hover:underline transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors disabled:opacity-50 mt-4 py-3.5 rounded-full shadow-md"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-8 opacity-60">
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">or</span>
                    <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>

                <div className="text-center">
                    <Link href="/signup" className="text-sm text-gray-600 hover:text-[#0A4535] font-medium transition-colors">
                        Don&apos;t have an account? <span className="text-[#0A4535] font-bold">Start giving &rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
