import Link from 'next/link';
import { Globe, Gift, Heart, ChevronRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="overflow-hidden">
            {/* HERO */}
            <section className="relative min-h-[70vh] flex items-center bg-base pt-[72px] overflow-hidden">
                <div className="absolute top-[15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-sage/60 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-emerald-light/20 blur-[100px] pointer-events-none" />

                <div className="container-narrow w-full py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="reveal">
                            <div className="inline-flex items-center gap-2 bg-emerald/[0.07] text-emerald px-4 py-2 rounded-full text-[0.8125rem] font-semibold mb-8">
                                <Globe className="w-3.5 h-3.5" />
                                <span>Our Mission</span>
                            </div>
                        </div>

                        <h1 className="reveal reveal-delay-1 font-display text-ink mb-6">
                            Redefining generosity <br />
                            <span className="italic text-gradient">without borders.</span>
                        </h1>

                        <p className="reveal reveal-delay-2 text-ink-muted text-xl leading-relaxed mb-10 mx-auto max-w-2xl">
                            Distance, currency, and logistics shouldn&apos;t stand between a gesture and its recipient. We built a platform where you choose the gift, and they choose how to receive it.
                        </p>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="bg-white border-y border-gray-100 py-14 relative z-10">
                <div className="container-narrow">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
                        {[
                            { value: '120+', label: 'Countries Supported' },
                            { value: '50K+', label: 'Gifts Delivered' },
                            { value: '98%', label: 'Recipient Satisfaction' },
                            { value: '24/7', label: 'Global Support' },
                        ].map((stat, i) => (
                            <div key={i} className={`reveal reveal-delay-${i + 1} text-center`}>
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

            {/* VALUES GRID */}
            <section className="section-padding bg-base">
                <div className="container-narrow">
                    <div className="text-center mb-16 max-w-xl mx-auto">
                        <h3 className="reveal mb-4">Our Core Values</h3>
                        <h2 className="reveal reveal-delay-1 text-ink">
                            What drives <span className="italic">our platform.</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { icon: Globe, title: 'Borderless', desc: 'Generosity shouldn\'t stop at borders. We make global gifting as easy as handing a present to your neighbor.' },
                            { icon: Heart, title: 'Recipient-first', desc: 'Every gift comes with choice. We believe recipients know best what they need, whether that\'s the item, cash, or crypto.' },
                            { icon: Gift, title: 'Effortless', desc: 'No shipping headaches, no customs delays, no wrong sizes. Just thoughtful, instantaneous gifting, simplified.' },
                        ].map((item, i) => (
                            <div key={i} className={`reveal reveal-delay-${i + 1} group bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-emerald/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald/[0.03]`}>
                                <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald transition-colors duration-300">
                                    <item.icon className="w-5 h-5 text-emerald group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h4 className="text-lg font-bold text-ink mb-3">{item.title}</h4>
                                <p className="text-ink-muted text-[0.9375rem] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative section-padding bg-emerald overflow-hidden">
                <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] rounded-full bg-emerald-muted blur-[120px] opacity-30 pointer-events-none" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#157a5e] blur-[100px] opacity-25 pointer-events-none" />

                <div className="relative z-10 container-narrow text-center">
                    <div className="max-w-xl mx-auto">
                        <h2 className="reveal font-display text-white text-[clamp(2rem,4vw,3rem)] leading-tight mb-5">
                            Ready to send your <span className="italic text-emerald-light">first gift?</span>
                        </h2>
                        <p className="reveal reveal-delay-1 text-white/50 text-lg mb-10 max-w-md mx-auto">
                            Join the thousands of people who have already discovered a better way to give.
                        </p>

                        <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/signup">
                                <button className="group w-full sm:w-auto bg-white text-emerald px-9 py-3.5 rounded-full font-semibold text-[0.9375rem] hover:bg-emerald-light transition-all duration-200 shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
                                    Get Started Free
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
