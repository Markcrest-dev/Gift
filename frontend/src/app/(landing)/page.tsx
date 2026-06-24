import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
    return (
        <>
            {/* Hero — The thesis. One moment, one message. */}
            <section className="min-h-screen flex items-center pt-[140px] pb-[140px] px-4 max-w-[1200px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 w-full">
                    {/* Left Column (55%) */}
                    <div className="lg:w-[55%] w-full">
                        <div className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em] mb-6">
                            CROSS-BORDER GIFTING · 120+ COUNTRIES
                        </div>
                        <h1 className="font-display text-[68px] font-bold leading-[1.05] tracking-tight text-[#F5F0E8] mb-8">
                            The gift arrives.<br />
                            <span className="text-[#F5F0E8]/40">They choose how to receive it.</span>
                        </h1>
                        <p className="text-[#9A8E7A] text-[17px] font-light leading-relaxed max-w-[420px] mb-12">
                            Send gifts across 120+ countries. Your recipient decides — keep the item, take the cash, or convert to crypto. One gesture, their terms.
                        </p>
                        <Link href="/signup">
                            <button className="bg-[#C0292B] hover:bg-[#A02020] text-[#F5F0E8] font-medium text-[15px] px-[32px] py-[14px] rounded-[3px] transition-colors inline-flex items-center">
                                Send a Gift
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        </Link>
                    </div>
                    
                    {/* Right Column (45%) */}
                    <div className="lg:w-[45%] w-full flex justify-center lg:justify-end reveal">
                        <div className="bg-[#1C1814] border border-[#2E2820] rounded-[4px] p-[28px] md:p-[32px] w-full max-w-[440px] text-left shadow-[0_0_60px_rgba(184,146,42,0.06)]">
                            <div className="flex items-center gap-2 mb-8">
                                <span className="text-[#B8922A]">●</span>
                                <span className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em]">GIFT NOTIFICATION</span>
                            </div>

                            <p className="text-[#9A8E7A] text-[13px] mb-1">You received a gift from</p>
                            <p className="text-[#F5F0E8] font-semibold text-[20px] mb-6 mt-1">Michael Chen</p>

                            <div className="border-t border-[#2E2820] my-[20px]"></div>
                            
                            <div className="mb-2">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-[#9A8E7A] text-[14px]">Item</span>
                                    <span className="text-[#F5F0E8] text-[14px]">Sony WH-1000XM5</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[#9A8E7A] text-[14px]">Value</span>
                                    <span className="font-mono text-[#B8922A] text-[16px]">$349.00</span>
                                </div>
                            </div>

                            <div className="border-t border-[#2E2820] my-[20px]"></div>

                            <p className="text-[#B8922A] text-[11px] mb-4 uppercase tracking-[0.12em] font-medium">CHOOSE HOW TO RECEIVE</p>
                            <div className="space-y-[8px]">
                                <button className="w-full text-left px-[16px] py-[12px] rounded-[3px] border border-[#B8922A] bg-[#1F1A10] text-[#C4B99A] text-[14px] font-medium transition-colors cursor-pointer">
                                    Accept the headphones
                                </button>
                                <button className="w-full text-left px-[16px] py-[12px] rounded-[3px] border border-[#2E2820] bg-transparent text-[#C4B99A] text-[14px] font-medium transition-colors cursor-pointer hover:border-[#B8922A]/50">
                                    Take <span className="font-mono">$349.00</span> as cash
                                </button>
                                <button className="w-full text-left px-[16px] py-[12px] rounded-[3px] border border-[#2E2820] bg-transparent text-[#C4B99A] text-[14px] font-medium transition-colors cursor-pointer hover:border-[#B8922A]/50">
                                    Convert to crypto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social proof — Stats bar */}
            <div className="border-y border-[#1E1A14] py-[20px] bg-transparent">
                <div className="max-w-[900px] mx-auto flex items-center justify-center divide-x divide-[#1E1A14]">
                    <div className="px-8 md:px-16 text-center">
                        <div className="font-mono text-[22px] text-[#F5F0E8] mb-1">50,000+</div>
                        <div className="text-[#6B6055] text-[11px] uppercase tracking-[0.12em]">Gifts Delivered</div>
                    </div>
                    <div className="px-8 md:px-16 text-center">
                        <div className="font-mono text-[22px] text-[#F5F0E8] mb-1">120+</div>
                        <div className="text-[#6B6055] text-[11px] uppercase tracking-[0.12em]">Countries</div>
                    </div>
                    <div className="px-8 md:px-16 text-center">
                        <div className="font-mono text-[22px] text-[#F5F0E8] mb-1">98%</div>
                        <div className="text-[#6B6055] text-[11px] uppercase tracking-[0.12em]">Satisfaction</div>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <section className="bg-transparent py-[96px] px-4">
                <div className="max-w-[700px] mx-auto">
                    <h2 className="font-display text-[48px] font-bold text-[#F5F0E8] mb-24 reveal text-center">
                        Three steps.{' '}
                        <span className="text-[#F5F0E8]/30">No complexity.</span>
                    </h2>

                    <div className="space-y-[64px] flex flex-col">
                        {/* Step 1 */}
                        <div className="relative flex items-start reveal">
                            <span className="absolute -left-4 -top-8 font-mono text-[120px] font-medium text-[#B8922A] opacity-15 leading-none select-none z-0">01</span>
                            <div className="pl-6 border-l border-[#2E2820] relative z-10 pt-2">
                                <h3 className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em] mb-2">Step 1</h3>
                                <h4 className="text-[#F5F0E8] text-[24px] font-semibold mb-3 font-display">Choose a gift</h4>
                                <p className="text-[#C4B99A] text-[16px] leading-relaxed max-w-md">
                                    Browse curated items across electronics, experiences, fashion, and more. Filter by price, category, or occasion.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-start reveal">
                            <span className="absolute -left-4 -top-8 font-mono text-[120px] font-medium text-[#B8922A] opacity-15 leading-none select-none z-0">02</span>
                            <div className="pl-6 border-l border-[#2E2820] relative z-10 pt-2">
                                <h3 className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em] mb-2">Step 2</h3>
                                <h4 className="text-[#F5F0E8] text-[24px] font-semibold mb-3 font-display">Add your recipient</h4>
                                <p className="text-[#C4B99A] text-[16px] leading-relaxed max-w-md">
                                    Enter their email, write a personal note, and schedule delivery. International addresses handled automatically.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-start reveal">
                            <span className="absolute -left-4 -top-8 font-mono text-[120px] font-medium text-[#B8922A] opacity-15 leading-none select-none z-0">03</span>
                            <div className="pl-6 border-l border-[#2E2820] relative z-10 pt-2">
                                <h3 className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em] mb-2">Step 3</h3>
                                <h4 className="text-[#F5F0E8] text-[24px] font-semibold mb-3 font-display">They choose</h4>
                                <p className="text-[#C4B99A] text-[16px] leading-relaxed max-w-md">
                                    Your recipient gets a notification. They accept the item, take its value as cash in their local currency, or convert to crypto. Their call.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Recipient Experience */}
            <section className="bg-[#0F0D0C] py-[120px] px-4">
                <div className="max-w-[520px] mx-auto text-center">
                    <h2 className="font-display text-[48px] font-bold text-[#F5F0E8] mb-4 reveal">
                        What your recipient sees
                    </h2>
                    <p className="text-[#6B6055] text-[15px] mb-16 reveal">
                        A real moment from the product — not marketing copy.
                    </p>

                    {/* Stylized gift receipt card */}
                    <div className="bg-[#1C1814] border border-[#2E2820] rounded-[4px] p-[28px] md:p-[32px] w-full text-left mx-auto reveal shadow-[0_0_60px_rgba(184,146,42,0.06)]">
                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-[#B8922A]">●</span>
                            <span className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em]">GIFT NOTIFICATION</span>
                        </div>

                        <p className="text-[#9A8E7A] text-[13px] mb-1">You received a gift from</p>
                        <p className="text-[#F5F0E8] font-semibold text-[20px] mb-6 mt-1">Michael Chen</p>

                        <div className="border-t border-[#2E2820] my-[20px]"></div>
                        
                        <div className="mb-2">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="text-[#9A8E7A] text-[14px]">Item</span>
                                <span className="text-[#F5F0E8] text-[14px]">Sony WH-1000XM5</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-[#9A8E7A] text-[14px]">Value</span>
                                <span className="font-mono text-[#B8922A] text-[16px]">$349.00</span>
                            </div>
                        </div>

                        <div className="border-t border-[#2E2820] my-[20px]"></div>

                        <p className="text-[#B8922A] text-[11px] mb-4 uppercase tracking-[0.12em] font-medium">CHOOSE HOW TO RECEIVE</p>
                        <div className="space-y-[8px]">
                            <button className="w-full text-left px-[16px] py-[12px] rounded-[3px] border border-[#B8922A] bg-[#1F1A10] text-[#C4B99A] text-[14px] font-medium transition-colors cursor-pointer">
                                Accept the headphones
                            </button>
                            <button className="w-full text-left px-[16px] py-[12px] rounded-[3px] border border-[#2E2820] bg-transparent text-[#C4B99A] text-[14px] font-medium transition-colors cursor-pointer hover:border-[#B8922A]/50">
                                Take <span className="font-mono">$349.00</span> as cash
                            </button>
                            <button className="w-full text-left px-[16px] py-[12px] rounded-[3px] border border-[#2E2820] bg-transparent text-[#C4B99A] text-[14px] font-medium transition-colors cursor-pointer hover:border-[#B8922A]/50">
                                Convert to crypto
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="bg-[#0A0806] py-[120px] px-4">
                <div className="max-w-[760px] mx-auto text-center reveal">
                    <blockquote className="font-display text-[36px] italic text-[#F5F0E8] leading-[1.5] mb-8">
                        &ldquo;I sent my sister an iPhone from New York to Lagos. She took the cash value instead — received it within minutes. Nothing else works like this.&rdquo;
                    </blockquote>
                    <p className="text-[#6B6055] text-[14px] mt-[32px] font-medium">
                        — Sarah Johnson, New York
                    </p>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-[#1C1814] border-t border-[#B8922A] py-[96px] px-4">
                <div className="max-w-[640px] mx-auto text-center reveal">
                    <h2 className="font-display text-[56px] font-bold text-[#F5F0E8] mb-6">
                        Start giving
                    </h2>
                    <p className="text-[#9A8E7A] text-[16px] mb-10 max-w-[440px] mx-auto">
                        Create an account in 30 seconds. Browse gifts. Send one today. They choose how to receive it.
                    </p>
                    <Link href="/signup">
                        <button className="bg-[#C0292B] hover:bg-[#A02020] text-[#F5F0E8] font-medium text-[15px] px-[32px] py-[14px] rounded-[3px] transition-colors inline-flex items-center">
                            Send a Gift
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
}
