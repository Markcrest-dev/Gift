'use client';

import Link from 'next/link';
import {
    Gift, Globe, Shield, ArrowRight, Send,
    CreditCard, PackageCheck, Star, ChevronRight,
    Zap, Users, Sparkles, Heart, Clock
} from 'lucide-react';

export default function LandingPage() {
    return (
        <main>
            {/* ════════════════════════════════════════════
                HERO
            ════════════════════════════════════════════ */}
            <section className="relative min-h-[94vh] flex items-center bg-base pt-[72px] overflow-hidden">
                {/* Subtle gradient orb */}
                <div className="absolute top-[15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-sage/60 blur-[120px] pointer-events-none" />

                <div className="container-narrow w-full py-16 lg:py-0">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Copy */}
                        <div className="max-w-lg">
                            <div className="reveal">
                                <div className="inline-flex items-center gap-2 bg-emerald/[0.07] text-emerald px-4 py-2 rounded-full text-[0.8125rem] font-semibold mb-8">
                                    <Globe className="w-3.5 h-3.5" />
                                    <span>Available in 120+ countries</span>
                                </div>
                            </div>

                            <h1 className="reveal reveal-delay-1 text-ink mb-6">
                                The gift they{' '}
                                <span className="italic text-gradient">actually&nbsp;want.</span>
                            </h1>

                            <p className="reveal reveal-delay-2 text-ink-muted text-lg leading-relaxed mb-10 max-w-md">
                                Send meaningful gifts across borders. Recipients choose to keep the item, take the cash, or convert to crypto.
                            </p>

                            <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-3">
                                <Link href="/signup">
                                    <button className="group w-full sm:w-auto bg-emerald text-white px-8 py-3.5 rounded-full font-semibold text-[0.9375rem] hover:bg-emerald-hover transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                                        Start Giving
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </Link>
                                <Link href="/marketplace">
                                    <button className="w-full sm:w-auto text-ink-muted hover:text-ink px-8 py-3.5 rounded-full font-semibold text-[0.9375rem] border border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-200">
                                        Browse Marketplace
                                    </button>
                                </Link>
                            </div>

                            {/* Trust indicators */}
                            <div className="reveal reveal-delay-4 mt-10 flex items-center gap-5 text-[0.8125rem] text-ink-faint">
                                <div className="flex items-center gap-1.5">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>Secure payments</span>
                                </div>
                                <div className="w-px h-3.5 bg-gray-200" />
                                <div className="flex items-center gap-1.5">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>Instant delivery</span>
                                </div>
                                <div className="w-px h-3.5 bg-gray-200 hidden sm:block" />
                                <div className="hidden sm:flex items-center gap-1.5">
                                    <Heart className="w-3.5 h-3.5" />
                                    <span>Recipient choice</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Hero visual card */}
                        <div className="reveal reveal-delay-2 relative hidden lg:block">
                            <div className="relative">
                                {/* Main gift card */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl shadow-emerald/[0.04]">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald flex items-center justify-center">
                                                <Gift className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-display text-lg text-ink">Birthday Surprise</div>
                                                <div className="text-sm text-ink-muted">For Sarah in London</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-ink-faint bg-sage/60 px-3 py-1.5 rounded-full font-medium">
                                            Delivered
                                        </div>
                                    </div>

                                    <div className="space-y-0 mb-8">
                                        <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
                                            <span className="text-sm text-ink-muted">Gift Value</span>
                                            <span className="font-mono text-[0.9375rem] font-semibold text-ink">$85.00</span>
                                        </div>
                                        <div className="flex items-center justify-between py-3.5 border-b border-gray-50">
                                            <span className="text-sm text-ink-muted">Delivery</span>
                                            <span className="text-sm font-medium text-ink flex items-center gap-1.5">
                                                <Zap className="w-3 h-3 text-amber" />
                                                Instant
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between py-3.5">
                                            <span className="text-sm text-ink-muted">Recipient Chooses</span>
                                            <span className="text-sm font-medium text-ink">Item · Cash · Crypto</span>
                                        </div>
                                    </div>

                                    <div className="bg-emerald text-white text-center py-3.5 rounded-xl font-semibold text-[0.875rem] flex items-center justify-center gap-2">
                                        <PackageCheck className="w-4 h-4" />
                                        Gift Sent Successfully
                                    </div>
                                </div>

                                {/* Floating notification – top right */}
                                <div className="absolute -top-4 -right-4 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-lg z-10 animate-scale-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-emerald-light flex items-center justify-center">
                                            <Heart className="w-3.5 h-3.5 text-emerald" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-ink">Sarah accepted!</div>
                                            <div className="text-[10px] text-ink-faint">Just now</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating stat – bottom left */}
                                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-lg z-10 animate-scale-in" style={{ animationDelay: '1.1s', animationFillMode: 'both' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-1.5">
                                            <div className="w-6 h-6 rounded-full bg-emerald border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">S</div>
                                            <div className="w-6 h-6 rounded-full bg-emerald-muted border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">M</div>
                                            <div className="w-6 h-6 rounded-full bg-emerald/70 border-2 border-white text-white text-[9px] font-bold flex items-center justify-center">A</div>
                                        </div>
                                        <div className="text-xs text-ink-muted">
                                            <span className="font-bold text-ink">2,400+</span> gifts today
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                SOCIAL PROOF STRIP
            ════════════════════════════════════════════ */}
            <section className="bg-white border-y border-gray-100 py-14">
                <div className="container-narrow">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
                        {[
                            { value: '120+', label: 'Countries' },
                            { value: '50K+', label: 'Gifts Sent' },
                            { value: '98%', label: 'Satisfaction' },
                            { value: '$2M+', label: 'Value Exchanged' },
                        ].map((stat, i) => (
                            <div key={i} className="reveal text-center">
                                <div className="font-mono text-3xl lg:text-4xl font-bold text-ink mb-1 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-ink-faint font-medium uppercase tracking-[0.1em]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                HOW IT WORKS
            ════════════════════════════════════════════ */}
            <section className="section-padding bg-base">
                <div className="container-narrow">
                    <div className="text-center mb-16 max-w-xl mx-auto">
                        <h3 className="reveal mb-4">How It Works</h3>
                        <h2 className="reveal reveal-delay-1 text-ink">
                            Three steps to <span className="italic">delight.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Gift,
                                step: '01',
                                title: 'Choose a Gift',
                                description: 'Browse our curated marketplace of premium items, experiences, and digital gifts for every occasion.',
                            },
                            {
                                icon: Send,
                                step: '02',
                                title: 'Send It Anywhere',
                                description: 'Add your personal message and send to anyone in 120+ countries. No address needed — just their email.',
                            },
                            {
                                icon: Sparkles,
                                step: '03',
                                title: 'They Choose',
                                description: 'Recipients pick how they receive it: keep the item, take the cash equivalent, or convert to crypto.',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`reveal reveal-delay-${i + 1} group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-emerald/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald/[0.03]`}
                            >
                                {/* Step number watermark */}
                                <div className="absolute top-6 right-8 font-mono text-5xl font-bold text-ink/[0.03] group-hover:text-emerald/[0.06] transition-colors duration-300">
                                    {item.step}
                                </div>

                                <div className="w-11 h-11 bg-emerald rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                                    <item.icon className="w-5 h-5 text-white" />
                                </div>

                                <h4 className="text-lg font-bold text-ink mb-2">{item.title}</h4>
                                <p className="text-ink-muted text-[0.9375rem] leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                RECIPIENT CHOICE
            ════════════════════════════════════════════ */}
            <section className="section-padding bg-white">
                <div className="container-narrow">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Interactive preview */}
                        <div className="reveal order-2 lg:order-1">
                            <div className="bg-emerald rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                                {/* Inner glow */}
                                <div className="absolute -top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-muted blur-[80px] opacity-50 pointer-events-none" />
                                <div className="absolute -bottom-[30%] -right-[20%] w-[50%] h-[50%] rounded-full bg-[#157a5e] blur-[60px] opacity-30 pointer-events-none" />

                                <div className="relative z-10 space-y-5">
                                    <div className="text-white/30 text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                                        Recipient View
                                    </div>

                                    <div className="bg-white/[0.08] border border-white/[0.1] rounded-xl p-5">
                                        <div className="text-white/50 text-sm mb-1">You received a gift from</div>
                                        <div className="font-display text-xl text-white mb-3">Alex Thompson</div>
                                        <div className="text-white/40 text-sm italic">&ldquo;Happy Birthday! Hope you love it 🎉&rdquo;</div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2.5">
                                        {[
                                            { label: 'Keep Item', icon: PackageCheck, active: false },
                                            { label: 'Take Cash', icon: CreditCard, active: true },
                                            { label: 'Get Crypto', icon: Zap, active: false },
                                        ].map((opt, i) => (
                                            <div
                                                key={i}
                                                className={`text-center py-4 px-2 rounded-xl border transition-all cursor-default ${
                                                    opt.active
                                                        ? 'bg-emerald-light/15 border-emerald-light/30 scale-[1.02]'
                                                        : 'bg-white/[0.04] border-white/[0.06]'
                                                }`}
                                            >
                                                <opt.icon className={`w-5 h-5 mx-auto mb-2 ${opt.active ? 'text-emerald-light' : 'text-white/40'}`} />
                                                <div className={`text-[0.6875rem] font-semibold ${opt.active ? 'text-emerald-light' : 'text-white/40'}`}>
                                                    {opt.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Copy */}
                        <div className="order-1 lg:order-2">
                            <h3 className="reveal mb-4">Recipient Choice</h3>
                            <h2 className="reveal reveal-delay-1 text-ink mb-5">
                                Let them decide.{' '}
                                <span className="italic text-gradient">No wrong gifts.</span>
                            </h2>
                            <p className="reveal reveal-delay-2 text-ink-muted text-lg leading-relaxed mb-8">
                                Every gift comes with freedom. Your recipient chooses exactly how they want to receive your generosity.
                            </p>

                            <div className="reveal reveal-delay-3 space-y-4">
                                {[
                                    { icon: PackageCheck, text: 'Keep the original curated gift item' },
                                    { icon: CreditCard, text: 'Convert to cash via instant bank transfer' },
                                    { icon: Zap, text: 'Receive equivalent value in cryptocurrency' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3.5">
                                        <div className="w-9 h-9 rounded-lg bg-sage flex items-center justify-center shrink-0">
                                            <item.icon className="w-4 h-4 text-emerald" />
                                        </div>
                                        <span className="text-ink-muted text-[0.9375rem] font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                FEATURES GRID
            ════════════════════════════════════════════ */}
            <section className="section-padding bg-base">
                <div className="container-narrow">
                    <div className="text-center mb-16 max-w-xl mx-auto">
                        <h3 className="reveal mb-4">Why Festow</h3>
                        <h2 className="reveal reveal-delay-1 text-ink">
                            Built for the <span className="italic">modern</span> gifter.
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
                        {[
                            {
                                icon: Globe,
                                title: 'Global Reach',
                                desc: 'Send to 120+ countries with automatic currency conversion and local compliance.',
                            },
                            {
                                icon: Shield,
                                title: 'Bank-Level Security',
                                desc: 'End-to-end encryption, PCI compliant payments, and fraud protection on every transaction.',
                            },
                            {
                                icon: Clock,
                                title: 'Instant Delivery',
                                desc: 'Digital gifts arrive immediately. No shipping delays, customs, or tracking anxiety.',
                            },
                            {
                                icon: Users,
                                title: 'Personal Touch',
                                desc: 'Add custom messages, schedule deliveries, and track when your gift is received.',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`reveal reveal-delay-${(i % 2) + 1} group bg-white rounded-2xl p-8 border border-gray-100 hover:border-emerald/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald/[0.03]`}
                            >
                                <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center mb-5 group-hover:bg-emerald transition-colors duration-300">
                                    <feature.icon className="w-4.5 h-4.5 text-emerald group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h4 className="text-base font-bold text-ink mb-2">{feature.title}</h4>
                                <p className="text-ink-muted text-[0.875rem] leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                TESTIMONIALS
            ════════════════════════════════════════════ */}
            <section className="section-padding bg-white">
                <div className="container-narrow">
                    <div className="text-center mb-16 max-w-xl mx-auto">
                        <h3 className="reveal mb-4">Testimonials</h3>
                        <h2 className="reveal reveal-delay-1 text-ink">
                            Loved by gifters <span className="italic">worldwide.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
                        {[
                            {
                                quote: "I sent a birthday gift to my sister in Tokyo. She chose to keep the item and was thrilled. The whole process took under 2 minutes.",
                                name: 'David Chen',
                                role: 'Software Engineer, SF',
                            },
                            {
                                quote: "The recipient choice feature is genius. My mom converted her gift to cash and used it for something she really needed. No more unwanted presents!",
                                name: 'Amara Okafor',
                                role: 'Designer, Lagos',
                            },
                            {
                                quote: "Cross-border gifting used to be such a hassle. Festow made it effortless. I've sent 15 gifts this year across 8 countries.",
                                name: 'Maria Santos',
                                role: 'Marketing Lead, São Paulo',
                            },
                        ].map((testimonial, i) => (
                            <div
                                key={i}
                                className={`reveal reveal-delay-${i + 1} group bg-base rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-emerald/[0.02]`}
                            >
                                <div className="flex gap-0.5 mb-5">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className="w-3.5 h-3.5 text-amber fill-amber" />
                                    ))}
                                </div>
                                <p className="text-ink-muted text-[0.9375rem] leading-relaxed mb-8">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-9 h-9 rounded-full bg-emerald/[0.08] flex items-center justify-center">
                                        <span className="text-xs font-bold text-emerald">
                                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-ink">{testimonial.name}</div>
                                        <div className="text-xs text-ink-faint">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                FINAL CTA
            ════════════════════════════════════════════ */}
            <section className="relative section-padding bg-emerald overflow-hidden">
                {/* Ambient glows */}
                <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] rounded-full bg-emerald-muted blur-[120px] opacity-30 pointer-events-none" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#157a5e] blur-[100px] opacity-25 pointer-events-none" />

                <div className="relative z-10 container-narrow text-center">
                    <div className="max-w-xl mx-auto">
                        <h2 className="reveal font-display text-white text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-5">
                            Ready to send{' '}
                            <span className="italic text-emerald-light">something special?</span>
                        </h2>
                        <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10 max-w-md mx-auto">
                            Join thousands sending meaningful gifts across borders every day.
                        </p>

                        <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/signup">
                                <button className="group w-full sm:w-auto bg-white text-emerald px-9 py-3.5 rounded-full font-semibold text-[0.9375rem] hover:bg-emerald-light transition-all duration-200 shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
                                    Create Free Account
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/marketplace">
                                <button className="w-full sm:w-auto text-white/60 hover:text-white px-9 py-3.5 rounded-full font-semibold text-[0.9375rem] border border-white/15 hover:border-white/30 transition-all duration-200">
                                    Explore Gifts
                                </button>
                            </Link>
                        </div>

                        <p className="reveal reveal-delay-3 text-white/25 text-sm mt-8">
                            No credit card required · Free to create an account
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
