import Link from 'next/link';
import { ArrowRight, Globe, Gift, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="pt-[72px]">
            {/* Hero */}
            <section className="section-padding bg-base">
                <div className="container-narrow max-w-[700px]">
                    <h1 className="reveal font-display text-ink mb-6">About us</h1>
                    <p className="reveal reveal-delay-1 text-ink-muted text-lg leading-relaxed mb-5">
                        Global Gift Exchange exists to remove the friction from cross-border generosity. Distance, currency, and logistics shouldn&apos;t stand between a gesture and its recipient.
                    </p>
                    <p className="reveal reveal-delay-2 text-ink-faint leading-relaxed">
                        We built a platform where you choose the gift, and your recipient chooses how to receive it — as the item itself, as cash in their local currency, or as cryptocurrency. One gesture, their terms.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-y border-gray-100 py-16">
                <div className="container-narrow max-w-[700px]">
                    <div className="reveal flex flex-wrap gap-x-16 gap-y-8">
                        {[
                            { value: '50K+', label: 'Gifts Delivered' },
                            { value: '120+', label: 'Countries' },
                            { value: '98%', label: 'Satisfaction' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="font-mono text-3xl font-bold text-ink mb-1">{stat.value}</div>
                                <div className="text-ink-faint text-xs uppercase tracking-[0.1em] font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-base">
                <div className="container-narrow max-w-[700px]">
                    <h2 className="reveal font-display text-ink mb-10">What drives us</h2>
                    <div className="space-y-6">
                        {[
                            { icon: Globe, title: 'Borderless', desc: 'Generosity shouldn\'t stop at borders. We make global gifting as easy as local.' },
                            { icon: Heart, title: 'Recipient-first', desc: 'Every gift comes with choice. We believe recipients know best what they need.' },
                            { icon: Gift, title: 'Effortless', desc: 'No shipping headaches, no customs, no wrong sizes. Just thoughtful gifting, simplified.' },
                        ].map((item, i) => (
                            <div key={i} className={`reveal reveal-delay-${i + 1} flex gap-4`}>
                                <div className="w-10 h-10 rounded-lg bg-sage flex items-center justify-center shrink-0 mt-0.5">
                                    <item.icon className="w-4.5 h-4.5 text-emerald" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-ink mb-1">{item.title}</h4>
                                    <p className="text-ink-muted text-[0.9375rem] leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white border-t border-gray-100">
                <div className="container-narrow max-w-[700px] text-center">
                    <div className="reveal">
                        <h2 className="font-display text-ink mb-6">Ready to send your first gift?</h2>
                        <Link href="/signup">
                            <button className="group bg-emerald text-white px-8 py-3.5 rounded-full font-semibold text-[0.9375rem] hover:bg-emerald-hover transition-all duration-200 shadow-sm inline-flex items-center gap-2">
                                Get Started
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
