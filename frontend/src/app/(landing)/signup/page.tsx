'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Gift } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        country: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        // We split fullName back to firstName and lastName for the auth function since that's what it expects
        const parts = formData.fullName.trim().split(' ');
        const firstName = parts[0] || '';
        const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
        
        const result = await auth.signup(
            formData.email,
            formData.password,
            firstName,
            lastName
        );
        
        setLoading(false);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Signup failed');
        }
    };

    const inputClass = "w-full bg-[#111009] border border-[#2E2820] text-[#F5F0E8] font-sans text-[14px] placeholder-[#3A342E] focus:outline-none focus:border-[#B8922A] transition-colors";
    const inputStyle = { borderRadius: '3px', padding: '11px 14px' };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0806] px-4 py-16">
            <div className="bg-[#1C1814] border border-[#1E1A14] w-full max-w-[420px]" style={{ borderRadius: '4px', padding: '48px 52px' }}>
                
                {/* Logo/Wordmark */}
                <div className="flex justify-center items-center gap-2 mb-8">
                    <Gift className="w-5 h-5 text-gold" />
                    <span className="font-sans text-[16px] font-semibold text-[#F5F0E8]">Global Gift Exchange</span>
                </div>

                {/* Headers */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-[36px] text-[#F5F0E8] mb-1">Create account</h1>
                    <p className="font-sans text-[15px] text-[#6B6055]">Start sending gifts across borders</p>
                </div>

                {error && (
                    <div className="border border-[#C0292B] bg-[#C0292B]/10 text-[#C0292B] px-4 py-3 mb-6 font-sans text-[14px] text-center" style={{ borderRadius: '3px' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text"
                            className={inputClass}
                            style={inputStyle}
                            placeholder="Full Name"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
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
                            placeholder="Password (min. 6 characters)"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <select
                            className={inputClass}
                            style={inputStyle}
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        >
                            <option value="">Select country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#B8922A] hover:bg-[#9A7A23] text-[#0A0806] font-sans text-[15px] font-medium transition-colors disabled:opacity-50 mt-2"
                        style={{ padding: '12px', borderRadius: '3px' }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-8">
                    <Link href="/login" className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                        Already have an account? Sign in &rarr;
                    </Link>
                </div>
                
                <div className="text-center mt-6">
                    <p className="font-sans text-[12px] text-[#3A342E]">
                        By creating an account you agree to our Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
