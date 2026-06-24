import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
    return (
        <>
            <section className="py-32 px-4">
                <div className="max-w-[700px] mx-auto">
                    <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-paper mb-8 reveal">About us</h1>
                    <p className="text-paper/45 text-lg leading-relaxed mb-6 reveal">
                        Global Gift Exchange exists to remove the friction from cross-border generosity. Distance, currency, and logistics shouldn&apos;t stand between a gesture and its recipient.
                    </p>
                    <p className="text-paper/35 text-base leading-relaxed reveal">
                        We built a platform where you choose the gift, and your recipient chooses how to receive it — as the item itself, as cash in their local currency, or as cryptocurrency. One gesture, their terms.
                    </p>
                </div>
            </section>

            <section className="bg-surface py-20 px-4">
                <div className="max-w-[700px] mx-auto">
                    <div className="flex flex-wrap gap-x-16 gap-y-8 reveal">
                        <div><div className="font-mono text-3xl text-paper mb-1">50K+</div><div className="text-paper/30 text-xs uppercase tracking-wider">Gifts Delivered</div></div>
                        <div><div className="font-mono text-3xl text-paper mb-1">120+</div><div className="text-paper/30 text-xs uppercase tracking-wider">Countries</div></div>
                        <div><div className="font-mono text-3xl text-paper mb-1">98%</div><div className="text-paper/30 text-xs uppercase tracking-wider">Satisfaction</div></div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-4">
                <div className="max-w-[700px] mx-auto text-center reveal">
                    <h2 className="font-display text-3xl font-bold text-paper mb-6">Ready to send your first gift?</h2>
                    <Link href="/signup"><Button variant="primary" size="lg">Get Started <ArrowRight className="w-4 h-4" /></Button></Link>
                </div>
            </section>
        </>
    );
}
