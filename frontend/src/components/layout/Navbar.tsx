'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
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
                className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
                    scrolled
                        ? 'bg-surface border-b border-sage-deep'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container-narrow flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-ink font-display text-2xl tracking-tight"
                    >
                        <Image 
                            src="/festow-logo.png" 
                            alt="Festow" 
                            width={32} 
                            height={32} 
                            className="h-8 w-auto object-contain rounded-md" 
                        />
                        <span>
                            Festow
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-12">
                        <div className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-[0.9375rem] font-medium transition-colors duration-200 ${
                                        pathname === link.href
                                            ? 'text-emerald'
                                            : 'text-ink-muted hover:text-ink'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <button className="text-ink hover:text-emerald text-[0.9375rem] font-medium px-4 py-2 transition-colors duration-200">
                                    Log In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-emerald text-white hover:bg-emerald-hover text-[0.9375rem] font-medium px-6 py-2.5 rounded-md transition-colors duration-200">
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
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
                    mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile menu drawer */}
            <div
                className={`fixed top-0 right-0 w-[85vw] max-w-[400px] h-full bg-surface z-50 md:hidden transition-transform duration-300 ease-out border-l border-sage-deep ${
                    mobileOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col pt-24 px-8 pb-8 h-full">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-[1.0625rem] font-medium py-3 px-4 rounded-md transition-colors ${
                                    pathname === link.href
                                        ? 'text-emerald bg-sage'
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
                            <button className="w-full text-ink border border-sage-deep hover:border-ink text-[0.9375rem] font-medium py-3 rounded-md transition-colors">
                                Log In
                            </button>
                        </Link>
                        <Link href="/signup" onClick={() => setMobileOpen(false)}>
                            <button className="w-full bg-emerald text-white hover:bg-emerald-hover text-[0.9375rem] font-medium py-3 rounded-md transition-colors">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
