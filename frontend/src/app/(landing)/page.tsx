import Link from 'next/link';
import { ArrowRight, Check, X, Smartphone, Globe, ShieldCheck } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="bg-[var(--color-base)] text-[var(--color-green-dark)] font-body">
            {/* Navigation / Header */}
            <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="font-display text-2xl font-bold text-white tracking-tight">
                    Gift<span className="text-white/70">Exchange</span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
                    <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                    <Link href="#compare" className="hover:text-white transition-colors">Compare</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-white/90 text-sm font-medium hover:text-white transition-colors hidden sm:block">Log In</Link>
                    <Link href="/signup">
                        <button className="bg-[#0A4535] text-white hover:bg-[#073528] text-sm font-medium px-5 py-2.5 rounded-full transition-colors shadow-lg">
                            Get Started
                        </button>
                    </Link>
                </div>
            </header>

            {/* Hero Section — Deep Green Background */}
            <section className="relative pt-[160px] pb-[120px] px-4 bg-[#0d5c46] overflow-hidden">
                {/* Subtle geometric pattern overlay (simulated with CSS background or just solid color for now, we'll use solid with some gradients) */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                    <div className="lg:w-1/2">
                        <div className="text-[#D1FAE5] text-xs font-semibold uppercase tracking-widest mb-6">
                            GLOBAL GIFTING. NO BORDERS. NO FRICTION.
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-[1.05]">
                            Send the Gift.<br />
                            Let Them Choose.
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light">
                            Send gifts across 120+ countries instantly. Your recipient decides — keep the item, take the cash, or convert to crypto. No expensive international shipping, no guesswork.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link href="/signup">
                                <button className="w-full sm:w-auto bg-white text-[#0d5c46] hover:bg-gray-50 text-base font-semibold px-8 py-4 rounded-full transition-colors shadow-xl flex items-center justify-center">
                                    Send a Gift Now
                                </button>
                            </Link>
                            <Link href="#how-it-works">
                                <button className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 text-base font-medium px-8 py-4 rounded-full transition-colors flex items-center justify-center">
                                    See How It Works
                                </button>
                            </Link>
                        </div>
                        <div className="mt-10 flex flex-wrap items-center gap-6 text-white/70 text-sm font-medium">
                            <span className="flex items-center gap-2"><Check size={16} className="text-[#D1FAE5]" /> Zero hidden fees</span>
                            <span className="flex items-center gap-2"><Check size={16} className="text-[#D1FAE5]" /> 120+ countries</span>
                            <span className="flex items-center gap-2"><Check size={16} className="text-[#D1FAE5]" /> Instant delivery</span>
                        </div>
                    </div>
                    
                    {/* Hero Graphic / Phone Mockup */}
                    <div className="lg:w-1/2 flex justify-center relative">
                        {/* Simulated Phone Mockups */}
                        <div className="relative w-[320px] h-[640px] bg-[#111827] rounded-[40px] border-[8px] border-gray-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-[-2deg] z-10">
                            {/* App Header */}
                            <div className="bg-[#1F2937] p-6 pt-12 border-b border-gray-800">
                                <p className="text-gray-400 text-xs mb-1">You received a gift from</p>
                                <p className="text-white font-semibold text-lg">Michael Chen</p>
                            </div>
                            {/* App Content */}
                            <div className="p-6">
                                <div className="bg-[#374151] rounded-2xl p-4 mb-6 shadow-inner">
                                    <div className="w-full h-32 bg-gray-600 rounded-xl mb-4 animate-pulse"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-white font-medium">Sony WH-1000XM5</span>
                                    </div>
                                    <div className="text-[#10B981] font-mono font-bold">$349.00</div>
                                </div>
                                
                                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Choose How to Receive</p>
                                <div className="space-y-3">
                                    <div className="bg-[#059669] text-white text-sm font-medium p-3 rounded-xl text-center shadow-md">
                                        Accept the headphones
                                    </div>
                                    <div className="bg-gray-800 text-gray-300 text-sm font-medium p-3 rounded-xl text-center border border-gray-700">
                                        Take $349.00 as cash
                                    </div>
                                    <div className="bg-gray-800 text-gray-300 text-sm font-medium p-3 rounded-xl text-center border border-gray-700">
                                        Convert to crypto
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Problem & Solution Section (Beige background) */}
            <section id="compare" className="py-24 px-4 bg-[#F4F0EB]">
                <div className="max-w-5xl mx-auto text-center">
                    <h3 className="text-[#0d5c46] text-xs font-bold uppercase tracking-[0.2em] mb-4">THE PROBLEM</h3>
                    <h2 className="font-display text-4xl md:text-5xl text-[#0A4535] mb-8">
                        Traditional Gifting is Too Complex
                    </h2>
                    <p className="text-[#0A4535]/70 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
                        Shipping internationally means exorbitant fees, customs delays, and the risk of sending something they don't even want. We've cut out the friction so you can focus on the gesture.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="text-3xl font-display text-[#0A4535] mb-2">Up to 30%</div>
                            <div className="text-sm text-gray-500 font-medium">Of value lost to shipping & customs</div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="text-3xl font-display text-[#0A4535] mb-2">Weeks</div>
                            <div className="text-sm text-gray-500 font-medium">Average international delivery time</div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="text-3xl font-display text-[#0A4535] mb-2">$0</div>
                            <div className="text-sm text-gray-500 font-medium">What we charge for cash delivery</div>
                        </div>
                    </div>

                    {/* Comparison Cards */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        {/* Without Us */}
                        <div className="bg-[#FEE2E2] rounded-3xl p-8 w-full md:w-[400px] text-left border border-red-200 shadow-sm relative overflow-hidden">
                            <h4 className="text-[#991B1B] font-bold text-lg mb-6 flex items-center gap-2">
                                <X size={20} /> Traditional Shipping
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[#991B1B]/80 text-sm border-b border-red-200 pb-2">
                                    <span>Gift Cost</span>
                                    <span className="font-mono font-medium">$200.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[#991B1B]/80 text-sm border-b border-red-200 pb-2">
                                    <span>Intl. Shipping</span>
                                    <span className="font-mono font-medium">$45.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[#991B1B]/80 text-sm border-b border-red-200 pb-2">
                                    <span>Customs Fees</span>
                                    <span className="font-mono font-medium">$25.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[#991B1B] font-bold pt-2 text-lg">
                                    <span>Total Spent</span>
                                    <span className="font-mono">$270.00</span>
                                </div>
                            </div>
                        </div>

                        {/* With Us */}
                        <div className="bg-[#D1FAE5] rounded-3xl p-8 w-full md:w-[400px] text-left border border-emerald-200 shadow-xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-[#0d5c46] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">OUR WAY</div>
                            <h4 className="text-[#0d5c46] font-bold text-lg mb-6 flex items-center gap-2">
                                <Check size={20} /> GiftExchange
                            </h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[#0d5c46]/80 text-sm border-b border-emerald-200/50 pb-2">
                                    <span>Gift Cost</span>
                                    <span className="font-mono font-medium">$200.00</span>
                                </div>
                                <div className="flex justify-between items-center text-[#0d5c46] font-bold pt-2 text-lg">
                                    <span>Total Spent</span>
                                    <span className="font-mono">$200.00</span>
                                </div>
                                <div className="mt-6 pt-4 border-t border-emerald-300">
                                    <div className="bg-white/60 text-[#0d5c46] font-semibold text-sm px-4 py-2 rounded-full inline-flex items-center">
                                        ↑ You save $70.00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className="py-24 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h3 className="text-[#0d5c46] text-xs font-bold uppercase tracking-[0.2em] mb-4">HOW IT WORKS</h3>
                        <h2 className="font-display text-4xl md:text-5xl text-[#0A4535]">
                            Simple. Direct. Done.
                        </h2>
                    </div>

                    <div className="space-y-24">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                            <div className="md:w-1/2 flex justify-center relative">
                                <div className="absolute top-1/2 -translate-y-1/2 -right-8 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center font-display text-3xl text-[#0d5c46] z-20">
                                    01
                                </div>
                                <div className="w-[280px] h-[560px] bg-gray-100 rounded-[32px] border-4 border-gray-200 relative overflow-hidden flex items-center justify-center">
                                    <Smartphone className="w-16 h-16 text-gray-300" />
                                </div>
                            </div>
                            <div className="md:w-1/2 text-left">
                                <div className="w-14 h-14 bg-[#0d5c46] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                                    <Globe size={24} />
                                </div>
                                <h3 className="font-display text-3xl text-[#0A4535] mb-4">Choose & Send</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Browse our curated collection of premium gifts. Select an item, add your recipient's contact info, and pay seamlessly. We handle the rest instantly.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
                            <div className="md:w-1/2 flex justify-center relative">
                                <div className="absolute top-1/2 -translate-y-1/2 -left-8 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center font-display text-3xl text-[#0d5c46] z-20">
                                    02
                                </div>
                                <div className="w-[280px] h-[560px] bg-gray-100 rounded-[32px] border-4 border-gray-200 relative overflow-hidden flex items-center justify-center">
                                     <ShieldCheck className="w-16 h-16 text-gray-300" />
                                </div>
                            </div>
                            <div className="md:w-1/2 text-left">
                                <div className="w-14 h-14 bg-[#0d5c46] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                                    <Check size={24} />
                                </div>
                                <h3 className="font-display text-3xl text-[#0A4535] mb-4">They Decide</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Your recipient receives a digital notification. They view the gift and can choose to have the physical item shipped, or instantly claim the cash or crypto value instead.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 bg-[#0d5c46] text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                        Ready to start gifting without borders?
                    </h2>
                    <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                        Join thousands of thoughtful senders who have chosen the friction-free way to give globally.
                    </p>
                    <Link href="/signup">
                        <button className="bg-white text-[#0d5c46] hover:bg-gray-50 text-base font-bold px-10 py-4 rounded-full transition-colors shadow-2xl">
                            Get Started Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-[#0A4535] text-white/60 py-12 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="font-display text-xl text-white mb-4 md:mb-0">
                        GiftExchange
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/contact" className="hover:text-white">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
