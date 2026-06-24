import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0A4535] text-white/60 font-body py-16">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    <div className="md:col-span-6 lg:col-span-5">
                        <div className="font-display text-2xl text-white mb-6">
                            Gift<span className="text-white/70">Exchange</span>
                        </div>
                        <p className="text-white/70 text-base leading-relaxed max-w-sm">
                            Cross-border gifting made simple. Send meaningful gifts to anyone, anywhere. They choose how to receive it.
                        </p>
                    </div>

                    <div className="md:col-span-3 lg:col-span-3 lg:col-start-7">
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Navigate</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/marketplace" className="text-white/70 text-base hover:text-white transition-colors duration-200">Marketplace</Link>
                            <Link href="/about" className="text-white/70 text-base hover:text-white transition-colors duration-200">About</Link>
                            <Link href="/contact" className="text-white/70 text-base hover:text-white transition-colors duration-200">Contact</Link>
                        </div>
                    </div>

                    <div className="md:col-span-3 lg:col-span-3">
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Legal</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/privacy-policy" className="text-white/70 text-base hover:text-white transition-colors duration-200">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="text-white/70 text-base hover:text-white transition-colors duration-200">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-sm">
                        &copy; {new Date().getFullYear()} Global Gift Exchange. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
