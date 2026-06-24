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
            <nav className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2 text-[#0A4535] font-display font-medium text-xl md:text-2xl tracking-tight">
                        <Gift className="w-6 h-6" />
                        <span>Gift<span className="text-[#0A4535]/70">Exchange</span></span>
                    </Link>

                    <div className={`
                        max-md:fixed max-md:top-0 max-md:right-0 max-md:w-[300px] max-md:h-screen
                        max-md:bg-white max-md:flex-col max-md:p-8 max-md:pt-24
                        max-md:shadow-2xl max-md:transition-transform max-md:duration-300
                        ${mobileMenuOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'}
                        flex items-center gap-8 z-50
                    `}>
                        {/* Mobile menu close button (internal) */}
                        <button 
                            className="md:hidden absolute top-6 right-6 text-gray-500 hover:text-[#0A4535]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex max-md:flex-col items-center max-md:items-start gap-8 max-md:gap-6 max-md:w-full">
                            <Link
                                href="/marketplace"
                                className={`text-base font-medium transition-colors duration-150 ${pathname === '/marketplace' ? 'text-[#0A4535]' : 'text-gray-500 hover:text-[#0A4535]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Marketplace
                            </Link>
                            <Link
                                href="/about"
                                className={`text-base font-medium transition-colors duration-150 ${pathname === '/about' ? 'text-[#0A4535]' : 'text-gray-500 hover:text-[#0A4535]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-base font-medium transition-colors duration-150 ${pathname === '/contact' ? 'text-[#0A4535]' : 'text-gray-500 hover:text-[#0A4535]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>

                        <div className="flex max-md:flex-col items-center max-md:items-stretch gap-4 max-md:w-full max-md:mt-8">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full bg-transparent text-[#0A4535] hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 rounded-full transition-colors border border-gray-200">
                                    Log In
                                </button>
                            </Link>
                            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full bg-[#0A4535] text-white hover:bg-[#073528] text-sm font-semibold px-6 py-2.5 rounded-full transition-colors shadow-lg">
                                    Start Giving
                                </button>
                            </Link>
                        </div>
                    </div>

                    <button
                        className="md:hidden text-gray-700 hover:text-[#0A4535] p-2 transition-colors z-[60]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {!mobileMenuOpen && <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
