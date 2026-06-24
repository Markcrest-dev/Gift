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

    const inputClass = "w-full bg-[#111009] border border-[#2E2820] text-[#F5F0E8] font-sans text-[14px] placeholder-[#3A342E] focus:outline-none focus:border-[#B8922A] transition-colors";
    const inputStyle = { borderRadius: '3px', padding: '11px 14px' };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0806] px-4">
            <div className="bg-[#1C1814] border border-[#1E1A14] w-full max-w-[420px]" style={{ borderRadius: '4px', padding: '48px 52px' }}>
                
                {/* Logo/Wordmark */}
                <div className="flex justify-center items-center gap-2 mb-8">
                    <Gift className="w-5 h-5 text-gold" />
                    <span className="font-sans text-[16px] font-semibold text-[#F5F0E8]">Global Gift Exchange</span>
                </div>

                {/* Headers */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-[36px] text-[#F5F0E8] mb-1">Welcome back</h1>
                    <p className="font-sans text-[15px] text-[#6B6055]">Sign in to your account.</p>
                </div>

                {error && (
                    <div className="border border-[#C0292B] bg-[#C0292B]/10 text-[#C0292B] px-4 py-3 mb-6 font-sans text-[14px] text-center" style={{ borderRadius: '3px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            className={inputClass}
                            style={inputStyle}
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
                            style={inputStyle}
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <div className="flex justify-end mt-2">
                            <Link href="/forgot-password" className="font-sans text-[13px] text-gold hover:text-gold/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#B8922A] hover:bg-[#9A7A23] text-[#0A0806] font-sans text-[15px] font-medium transition-colors disabled:opacity-50 mt-2"
                        style={{ padding: '12px', borderRadius: '3px' }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-[1px] bg-[#1E1A14]"></div>
                    <span className="font-sans text-[12px] text-[#4A4038] uppercase tracking-widest">or</span>
                    <div className="flex-1 h-[1px] bg-[#1E1A14]"></div>
                </div>

                <div className="text-center">
                    <Link href="/signup" className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                        Don&apos;t have an account? Start giving &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}
