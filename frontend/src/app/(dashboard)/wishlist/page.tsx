'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WishlistItem } from '@/lib/types';
import { wishlistFlow } from '@/lib/giftFlow';
import Button from '@/components/ui/Button';
import { X } from 'lucide-react';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        wishlistFlow.getWishlist().then(setWishlist).catch(err => console.error('Failed:', err)).finally(() => setLoading(false));
    }, []);

    const removeFromWishlist = async (id: string) => {
        try { await wishlistFlow.removeFromWishlist(id); setWishlist(wishlist.filter(i => i.id !== id)); } catch (e) { console.error(e); }
    };

    const formatCurrency = (amount: number, currency: string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

    if (loading) return <div className="text-paper/30 text-sm py-16 text-center">Loading...</div>;

    return (
        <>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-paper mb-2">Wishlist</h1>
                    <p className="text-paper/40 text-sm">Your saved gifts</p>
                </div>
                <Link href="/marketplace"><Button variant="ghost" size="sm">Browse More</Button></Link>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-paper/30 text-sm mb-6">Your wishlist is empty</p>
                    <Link href="/marketplace"><Button variant="primary" size="sm">Browse Gifts</Button></Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {wishlist.map((item) => (
                        <div key={item.id} className="bg-surface rounded-lg overflow-hidden relative group">
                            <button onClick={() => removeFromWishlist(item.id)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-base/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Remove">
                                <X className="w-3 h-3 text-paper/50" />
                            </button>
                            <div className="h-32 flex items-center justify-center text-4xl bg-paper/3">{item.gift?.emoji || '🎁'}</div>
                            <div className="p-3.5">
                                <p className="text-paper/30 text-xs capitalize mb-1">{item.gift?.category}</p>
                                <h3 className="text-paper text-sm font-medium truncate mb-1">{item.gift?.name}</h3>
                                <div className="font-mono text-gold/80 text-sm mb-3">{formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}</div>
                                <Link href={`/gift/${item.giftId}`}><Button variant="primary" size="sm" fullWidth>View</Button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
