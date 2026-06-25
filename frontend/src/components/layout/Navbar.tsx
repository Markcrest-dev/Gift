'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Gift, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navLinks = [
        { href: '/marketplace', label: 'Marketplace' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
                        : 'bg-transparent'
                }`}
            >
                <div className="container-narrow flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 text-emerald font-display text-[1.35rem] tracking-tight"
                    >
                        <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
                            <Gift className="w-4 h-4 text-white" />
                        </div>
                        <span>
                            Gift<span className="text-emerald/60">Exchange</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[0.9rem] font-medium transition-colors duration-200 ${
                                        pathname === link.href
                                            ? 'text-emerald'
                                            : 'text-ink-muted hover:text-ink'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <button className="text-ink-muted hover:text-ink text-[0.875rem] font-semibold px-5 py-2 rounded-full transition-colors duration-200">
                                    Log In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-emerald text-white hover:bg-emerald-hover text-[0.875rem] font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-ink p-2 -mr-2 transition-colors hover:text-emerald z-[60]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
                    mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile menu drawer */}
            <div
                className={`fixed top-0 right-0 w-[280px] h-full bg-white z-50 md:hidden transition-transform duration-300 ease-out shadow-2xl ${
                    mobileOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col pt-24 px-8 pb-8 h-full">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                                    pathname === link.href
                                        ? 'text-emerald bg-sage/50'
                                        : 'text-ink-muted hover:text-ink hover:bg-base'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                            <button className="w-full text-ink-muted hover:text-ink text-sm font-semibold py-3 rounded-full border border-gray-200 transition-colors">
                                Log In
                            </button>
                        </Link>
                        <Link href="/signup" onClick={() => setMobileOpen(false)}>
                            <button className="w-full bg-emerald text-white hover:bg-emerald-hover text-sm font-semibold py-3 rounded-full transition-colors shadow-sm">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
