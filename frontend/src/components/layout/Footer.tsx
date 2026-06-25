import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-emerald text-white/60 py-20">
            <div className="container-narrow">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Gift className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-display text-xl text-white">
                                Gift<span className="text-white/60">Exchange</span>
                            </span>
                        </div>
                        <p className="text-white/50 text-[0.9375rem] leading-relaxed max-w-xs">
                            Cross-border gifting made simple. Send meaningful gifts to anyone, anywhere. They choose how to receive it.
                        </p>
                    </div>

                    {/* Navigate */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h3 className="text-white/30 text-xs font-bold uppercase tracking-[0.15em] mb-5">
                            Navigate
                        </h3>
                        <div className="flex flex-col gap-3">
                            <Link href="/marketplace" className="text-white/60 text-[0.9375rem] hover:text-white transition-colors duration-200">
                                Marketplace
                            </Link>
                            <Link href="/about" className="text-white/60 text-[0.9375rem] hover:text-white transition-colors duration-200">
                                About
                            </Link>
                            <Link href="/contact" className="text-white/60 text-[0.9375rem] hover:text-white transition-colors duration-200">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-3">
                        <h3 className="text-white/30 text-xs font-bold uppercase tracking-[0.15em] mb-5">
                            Legal
                        </h3>
                        <div className="flex flex-col gap-3">
                            <Link href="/privacy-policy" className="text-white/60 text-[0.9375rem] hover:text-white transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className="text-white/60 text-[0.9375rem] hover:text-white transition-colors duration-200">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm">
                        &copy; {new Date().getFullYear()} Global Gift Exchange. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
