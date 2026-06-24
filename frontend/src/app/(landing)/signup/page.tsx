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

    const inputClass = "w-full bg-gray-50 border border-gray-200 text-gray-900 font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all placeholder-gray-400";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F0EB] px-4 font-body py-12">
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl w-full max-w-[440px] p-8 md:p-12 relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A4535]"></div>
                
                <div className="flex justify-center items-center gap-2 mb-8 mt-2">
                    <Gift className="w-6 h-6 text-[#0A4535]" />
                    <span className="font-display text-xl font-medium text-[#0A4535]">Gift<span className="text-[#0A4535]/70">Exchange</span></span>
                </div>

                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl md:text-4xl text-[#0A4535] mb-3">Create account</h1>
                    <p className="text-gray-500 text-sm md:text-base">Start sending gifts across borders</p>
                </div>

                {error && (
                    <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 mb-6 text-sm text-center rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            className={inputClass}
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
                            placeholder="Password (min. 6 characters)"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <select
                            className={`${inputClass} appearance-none text-gray-500`}
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
                        className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors disabled:opacity-50 mt-4 py-3.5 rounded-full shadow-md"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center mt-8">
                    <Link href="/login" className="text-sm text-gray-600 hover:text-[#0A4535] font-medium transition-colors">
                        Already have an account? <span className="text-[#0A4535] font-bold">Sign in &rarr;</span>
                    </Link>
                </div>
                
                <div className="text-center mt-6">
                    <p className="text-[11px] text-gray-400 font-medium">
                        By creating an account you agree to our Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
