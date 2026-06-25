import Link from 'next/link';
import { Gift } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-sage-deep pt-20 pb-8">
            <div className="container-narrow">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-md bg-emerald flex items-center justify-center">
                                <Gift className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-display text-2xl text-ink tracking-tight">
                                Festow
                            </span>
                        </div>
                        <p className="text-ink-muted text-[0.9375rem] leading-relaxed max-w-sm">
                            Cross-border gifting built on architectural minimalism. Send meaningful gifts to anyone, anywhere, with absolute clarity.
                        </p>
                    </div>

                    {/* Navigate */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h3 className="text-ink-muted text-[0.6875rem] font-bold uppercase tracking-widest mb-6">
                            Navigate
                        </h3>
                        <div className="flex flex-col gap-3.5">
                            <Link href="/marketplace" className="text-ink-muted text-[0.9375rem] hover:text-emerald transition-colors duration-200">
                                Marketplace
                            </Link>
                            <Link href="/about" className="text-ink-muted text-[0.9375rem] hover:text-emerald transition-colors duration-200">
                                About
                            </Link>
                            <Link href="/contact" className="text-ink-muted text-[0.9375rem] hover:text-emerald transition-colors duration-200">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="md:col-span-3">
                        <h3 className="text-ink-muted text-[0.6875rem] font-bold uppercase tracking-widest mb-6">
                            Legal
                        </h3>
                        <div className="flex flex-col gap-3.5">
                            <Link href="/privacy-policy" className="text-ink-muted text-[0.9375rem] hover:text-emerald transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className="text-ink-muted text-[0.9375rem] hover:text-emerald transition-colors duration-200">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-sage flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-ink-faint text-[0.8125rem]">
                        &copy; {new Date().getFullYear()} Festow. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Optional social links could go here in the future */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
