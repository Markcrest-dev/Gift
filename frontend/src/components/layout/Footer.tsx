import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-gold/10">
            <div className="max-w-[1280px] mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="text-paper font-body font-medium text-sm mb-4">Global Gift Exchange</h3>
                        <p className="text-paper/35 text-sm leading-relaxed max-w-xs">
                            Cross-border gifting made simple. Send meaningful gifts to anyone, anywhere. They choose how to receive it.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-paper/50 text-xs font-medium uppercase tracking-wider mb-4">Navigate</h3>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/marketplace" className="text-paper/35 text-sm hover:text-paper/60 transition-colors duration-150">Marketplace</Link>
                            <Link href="/about" className="text-paper/35 text-sm hover:text-paper/60 transition-colors duration-150">About</Link>
                            <Link href="/contact" className="text-paper/35 text-sm hover:text-paper/60 transition-colors duration-150">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-paper/50 text-xs font-medium uppercase tracking-wider mb-4">Legal</h3>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/privacy-policy" className="text-paper/35 text-sm hover:text-paper/60 transition-colors duration-150">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="text-paper/35 text-sm hover:text-paper/60 transition-colors duration-150">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-paper/5">
                    <p className="text-paper/20 text-xs text-center">
                        &copy; {new Date().getFullYear()} Global Gift Exchange. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
