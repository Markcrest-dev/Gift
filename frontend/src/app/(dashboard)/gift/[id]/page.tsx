'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftsApi, wishlistFlow } from '@/lib/giftFlow';
import { auth } from '@/lib/auth';
import { ChevronRight, Star } from 'lucide-react';

export default function GiftDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [gift, setGift] = useState<Gift | null>(null);
    const [relatedGifts, setRelatedGifts] = useState<Gift[]>([]);
    const [loading, setLoading] = useState(true);
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        const loadGift = async () => {
            try {
                const id = params.id as string;
                const foundGift = await giftsApi.getById(id);
                setGift(foundGift);
                const related = await giftsApi.getAll({ category: foundGift.category });
                setRelatedGifts(related.filter(g => g.id !== foundGift.id).slice(0, 4));
                if (auth.isAuthenticated()) { const isWished = await wishlistFlow.isInWishlist(id); setInWishlist(isWished); }
            } catch { router.push('/marketplace'); }
            setLoading(false);
        };
        loadGift();
    }, [params.id, router]);

    const handleWishlist = async () => {
        if (!auth.isAuthenticated()) { router.push('/login'); return; }
        if (!gift) return;
        try {
            if (inWishlist) {
                const wl = await wishlistFlow.getWishlist();
                const item = wl.find(w => w.giftId === gift.id);
                if (item) { await wishlistFlow.removeFromWishlist(item.id); setInWishlist(false); }
            } else { await wishlistFlow.addToWishlist(gift.id); setInWishlist(true); }
        } catch (e: any) {
            if (e.message === 'Gift already in wishlist') {
                setInWishlist(true);
            } else {
                console.error(e);
            }
        }
    };

    const formatCurrency = (amount: number, currency: string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

    if (loading) return <div className="text-paper/30 text-sm py-16 text-center">Loading...</div>;
    if (!gift) return null;

    return (
        <div className="max-w-[960px] mx-auto">
            <nav className="flex items-center gap-1.5 text-sm mb-8">
                <Link href="/" className="text-paper/30 hover:text-paper/50 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-paper/15" />
                <Link href="/marketplace" className="text-paper/30 hover:text-paper/50 transition-colors">Marketplace</Link>
                <ChevronRight className="w-3 h-3 text-paper/15" />
                <span className="text-paper/60">{gift.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="bg-surface rounded-2xl h-[400px] flex items-center justify-center text-[8rem] sticky top-24">{gift.emoji || '🎁'}</div>
                <div>
                    <span className="text-gold/60 text-xs font-medium uppercase tracking-wider">{gift.category}</span>
                    <h1 className="font-display text-3xl font-bold text-paper mt-2 mb-3">{gift.name}</h1>
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="w-3.5 h-3.5 text-gold/70 fill-gold/70" />
                        <span className="text-paper/50 text-sm">{gift.rating}</span>
                        <span className="text-paper/20 text-sm">({gift.reviews} reviews)</span>
                    </div>
                    <div className="font-mono text-4xl font-medium text-paper mb-6">{formatCurrency(gift.price, gift.currency)}</div>
                    <p className="text-paper/40 text-base leading-relaxed mb-8">{gift.description}</p>

                    <div className="bg-surface rounded-lg p-5 mb-8 space-y-3">
                        <div className="flex justify-between text-sm"><span className="text-paper/35">Category</span><span className="text-paper/70 capitalize">{gift.category}</span></div>
                        <div className="flex justify-between text-sm border-t border-paper/5 pt-3"><span className="text-paper/35">Gender</span><span className="text-paper/70 capitalize">{gift.gender}</span></div>
                    </div>

                    <div className="grid grid-cols-[2fr_1fr] gap-3">
                        <Button variant="primary" size="lg" className="w-full" onClick={() => router.push(`/send-gift?id=${gift.id}`)}>Send This Gift</Button>
                        <Button variant="ghost" size="lg" className="w-full" onClick={handleWishlist}>{inWishlist ? 'Saved' : 'Wishlist'}</Button>
                    </div>
                </div>
            </div>

            {relatedGifts.length > 0 && (
                <div>
                    <h2 className="text-paper font-semibold text-base mb-4">You may also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {relatedGifts.map(rg => (
                            <Link key={rg.id} href={`/gift/${rg.id}`} className="bg-surface rounded-lg overflow-hidden group">
                                <div className="h-28 flex items-center justify-center text-4xl bg-paper/3">{rg.emoji || '🎁'}</div>
                                <div className="p-3.5">
                                    <h3 className="text-paper text-sm font-medium truncate mb-1 group-hover:text-gold transition-colors">{rg.name}</h3>
                                    <div className="font-mono text-paper/60 text-sm">{formatCurrency(rg.price, rg.currency)}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
