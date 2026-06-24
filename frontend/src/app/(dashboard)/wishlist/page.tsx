'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WishlistItem } from '@/lib/types';
import { wishlistFlow } from '@/lib/giftFlow';
import Button from '@/components/ui/Button';
import GiftPlaceholder from '@/components/ui/GiftPlaceholder';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        wishlistFlow.getWishlist().then(setWishlist).catch(err => console.error('Failed:', err)).finally(() => setLoading(false));
    }, []);

    const removeFromWishlist = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try { 
            await wishlistFlow.removeFromWishlist(id); 
            setWishlist(wishlist.filter(i => i.id !== id)); 
        } catch (e) { 
            console.error(e); 
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    if (loading) {
        return <div className="text-gray-500 text-sm p-12 text-center">Loading your wishlist...</div>;
    }

    return (
        <div className="font-body pb-12">
            {/* Header */}
            <div className="flex items-baseline gap-4 border-b border-gray-200 pb-6 mb-8">
                <h1 className="text-3xl font-display text-[#0A4535]">Wishlist</h1>
                <span className="text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">{wishlist.length} items</span>
            </div>

            {/* List / Empty State */}
            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-display text-[#0A4535] mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 text-sm mb-6">Browse the marketplace and save gifts you love.</p>
                    <Link href="/marketplace">
                        <Button variant="primary">Browse Gifts</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item, index) => {
                        const isFeatured = index === 0;
                        const cardClasses = `group relative bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`;
                        
                        return (
                            <Link href={`/send-gift?id=${item.giftId}`} key={item.id} className={cardClasses} style={{ minHeight: isFeatured ? '480px' : '320px' }}>
                                {/* Hover Remove Button */}
                                <button 
                                    onClick={(e) => removeFromWishlist(item.id, e)}
                                    className="absolute top-4 right-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur text-gray-500 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full shadow-sm border border-gray-200 z-10"
                                    aria-label="Remove from wishlist"
                                >
                                    &times;
                                </button>
                                
                                <div className="flex-1 flex flex-col">
                                    <div className="flex-1 flex items-center justify-center bg-gray-50 border-b border-gray-100 min-h-[160px]">
                                        <GiftPlaceholder name={item.gift?.name || '?'} />
                                    </div>
                                    <div className="p-6 mt-auto">
                                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{item.gift?.category}</div>
                                        <div className="flex justify-between items-end gap-4 mb-4">
                                            <h3 className={`font-display text-[#0A4535] leading-snug group-hover:text-[#0A4535]/70 transition-colors ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                                                {item.gift?.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className={`font-mono text-gray-900 font-bold ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
                                                {formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity md:translate-y-2 md:group-hover:translate-y-0 duration-300">
                                                <span className="bg-[#0A4535] text-white px-4 py-2 rounded-full text-sm font-bold shadow-md whitespace-nowrap">Send &rarr;</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
