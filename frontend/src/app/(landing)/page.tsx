import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
    return (
        <>
            {/* Hero — The thesis. One moment, one message. */}
            <section className="min-h-screen flex items-center justify-center px-4 py-32">
                <div className="max-w-[900px] mx-auto">
                    <h1 className="font-display text-[clamp(3rem,7vw,5rem)] font-bold leading-[1.08] tracking-tight text-paper mb-8">
                        The gift arrives.{' '}
                        <span className="text-paper/40">They choose how to receive it.</span>
                    </h1>
                    <p className="text-paper/50 text-lg font-light leading-relaxed max-w-[540px] mb-12">
                        Send gifts across 120+ countries. Your recipient decides — keep the item, take the cash, or convert to crypto. One gesture, their terms.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/signup">
                            <Button variant="primary" size="lg">
                                Send a Gift
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social proof — A single line, not a stats grid */}
            <div className="border-y border-paper/5 py-6">
                <p className="text-center text-paper/30 text-sm font-medium tracking-wide">
                    <span className="font-mono text-paper/40">50,000+</span> gifts delivered across{' '}
                    <span className="font-mono text-paper/40">120</span> countries &middot;{' '}
                    <span className="font-mono text-paper/40">98%</span> satisfaction
                </p>
            </div>

            {/* How it works — Vertical, asymmetric. Not a 3-column icon grid. */}
            <section className="bg-surface py-32 px-4">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-paper mb-24 reveal">
                        Three steps.{' '}
                        <span className="text-paper/30">No complexity.</span>
                    </h2>

                    <div className="space-y-20">
                        {/* Step 1 */}
                        <div className="flex gap-8 md:gap-16 items-start reveal">
                            <span className="font-mono text-6xl md:text-8xl font-medium text-gold/15 leading-none shrink-0 select-none">01</span>
                            <div className="pt-2">
                                <h3 className="text-paper text-xl font-semibold mb-3">Choose a gift</h3>
                                <p className="text-paper/45 text-base leading-relaxed max-w-md">
                                    Browse curated items across electronics, experiences, fashion, and more. Filter by price, category, or occasion.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-8 md:gap-16 items-start reveal">
                            <span className="font-mono text-6xl md:text-8xl font-medium text-gold/15 leading-none shrink-0 select-none">02</span>
                            <div className="pt-2">
                                <h3 className="text-paper text-xl font-semibold mb-3">Add your recipient</h3>
                                <p className="text-paper/45 text-base leading-relaxed max-w-md">
                                    Enter their email, write a personal note, and schedule delivery. International addresses handled automatically.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-8 md:gap-16 items-start reveal">
                            <span className="font-mono text-6xl md:text-8xl font-medium text-gold/15 leading-none shrink-0 select-none">03</span>
                            <div className="pt-2">
                                <h3 className="text-paper text-xl font-semibold mb-3">They choose</h3>
                                <p className="text-paper/45 text-base leading-relaxed max-w-md">
                                    Your recipient gets a notification. They accept the item, take its value as cash in their local currency, or convert to crypto. Their call.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Recipient Experience — Show it, don't describe it */}
            <section className="py-32 px-4">
                <div className="max-w-[640px] mx-auto text-center">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-paper mb-6 reveal">
                        What your recipient sees
                    </h2>
                    <p className="text-paper/40 text-base mb-16 reveal">
                        A real moment from the product — not marketing copy.
                    </p>

                    {/* Stylized gift receipt card */}
                    <div className="bg-surface rounded-2xl p-8 md:p-12 text-left mx-auto reveal">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2 h-2 rounded-full bg-gold/60" />
                            <span className="text-paper/30 text-xs font-medium uppercase tracking-widest">Gift Notification</span>
                        </div>

                        <p className="text-paper/50 text-sm mb-1">You received a gift from</p>
                        <p className="text-paper font-semibold text-lg mb-6">Michael Chen</p>

                        <div className="border-t border-paper/5 pt-6 mb-8">
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-paper/40 text-sm">Item</span>
                                <span className="text-paper text-sm font-medium">Sony WH-1000XM5</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-paper/40 text-sm">Value</span>
                                <span className="font-mono text-gold text-lg font-medium">$349.00</span>
                            </div>
                        </div>

                        <p className="text-paper/30 text-xs mb-4 uppercase tracking-wider font-medium">Choose how to receive</p>
                        <div className="space-y-3">
                            <button className="w-full text-left px-5 py-3.5 rounded-lg border border-gold/25 text-paper text-sm font-medium hover:border-gold/50 hover:bg-gold/5 transition-all duration-200">
                                Accept the headphones
                            </button>
                            <button className="w-full text-left px-5 py-3.5 rounded-lg border border-paper/10 text-paper/70 text-sm font-medium hover:border-paper/20 hover:bg-paper/3 transition-all duration-200">
                                Take <span className="font-mono">$349.00</span> as cash
                            </button>
                            <button className="w-full text-left px-5 py-3.5 rounded-lg border border-paper/10 text-paper/70 text-sm font-medium hover:border-paper/20 hover:bg-paper/3 transition-all duration-200">
                                Convert to crypto
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial — Singular. One large quote. */}
            <section className="py-32 px-4">
                <div className="max-w-[700px] mx-auto text-center reveal">
                    <blockquote className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] italic text-paper/80 leading-snug mb-8">
                        &ldquo;I sent my sister an iPhone from New York to Lagos. She took the cash value instead — received it within minutes. Nothing else works like this.&rdquo;
                    </blockquote>
                    <div>
                        <p className="text-paper/60 text-sm font-medium">Sarah Johnson</p>
                        <p className="text-paper/30 text-xs">New York, USA</p>
                    </div>
                </div>
            </section>

            {/* Final CTA — bg-green for variety. One accent per section. */}
            <section className="bg-green py-32 px-4">
                <div className="max-w-[640px] mx-auto text-center reveal">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-paper mb-6">
                        Start giving
                    </h2>
                    <p className="text-paper/50 text-base mb-10 max-w-md mx-auto">
                        Create an account in 30 seconds. Browse gifts. Send one today. They choose how to receive it.
                    </p>
                    <Link href="/signup">
                        <Button variant="primary" size="lg">
                            Create Your Account
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
