'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-base px-4 py-16">
            <div className="bg-surface rounded-lg max-w-[420px] w-full p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold text-paper mb-2">Welcome back</h1>
                    <p className="text-paper/40 text-sm">Sign in to your account</p>
                </div>

                {error && (
                    <div className="bg-red/10 border border-red/20 rounded-[4px] px-4 py-3 mb-6 text-red text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} id="loginForm">
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-paper/60 text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors duration-150"
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block text-paper/60 text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 pr-11 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors duration-150"
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/30 hover:text-paper/60 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-3.5 h-3.5 accent-gold rounded" id="remember" />
                            <span className="text-paper/40 text-sm">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-gold/70 text-sm hover:text-gold transition-colors">Forgot password?</Link>
                    </div>

                    <Button type="submit" fullWidth size="lg" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <p className="text-center text-paper/30 text-sm mt-8">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-gold/70 hover:text-gold transition-colors font-medium">Create one</Link>
                </p>
            </div>
        </div>
    );
}
