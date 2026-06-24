'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Gift, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <nav className="sticky top-0 left-0 right-0 z-50 bg-base/95 backdrop-blur-md border-b border-gold/10">
                <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 text-gold font-body font-medium text-lg tracking-tight">
                        <Gift className="w-5 h-5" />
                        <span>Global Gift Exchange</span>
                    </Link>

                    <div className={`
                        max-md:fixed max-md:top-0 max-md:right-0 max-md:w-[280px] max-md:h-screen
                        max-md:bg-surface max-md:flex-col max-md:p-8 max-md:pt-20
                        max-md:transition-transform max-md:duration-300
                        ${mobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
                        flex items-center gap-8 z-50
                    `}>
                        <div className="flex max-md:flex-col items-center max-md:items-start gap-6 max-md:gap-4 max-md:w-full">
                            <Link
                                href="/about"
                                className={`text-sm font-medium transition-colors duration-150 ${pathname === '/about' ? 'text-paper' : 'text-paper/50 hover:text-paper/80'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-sm font-medium transition-colors duration-150 ${pathname === '/contact' ? 'text-paper' : 'text-paper/50 hover:text-paper/80'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>

                        <div className="flex max-md:flex-col items-center max-md:items-stretch gap-3 max-md:w-full max-md:mt-6">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="primary" size="sm">Start Giving</Button>
                            </Link>
                        </div>
                    </div>

                    <button
                        className="md:hidden text-paper/70 hover:text-paper p-2 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-base/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
