'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WishlistItem } from '@/lib/types';
import { wishlistFlow } from '@/lib/giftFlow';
import { X } from 'lucide-react';

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
        return <div className="text-paper/30 text-sm p-8 text-center">Loading your wishlist...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-baseline gap-3 mb-8">
                <h1 className="font-sans text-[22px] font-semibold text-[#F5F0E8]">Wishlist</h1>
                <span className="font-sans text-[13px] text-[#6B6055]">{wishlist.length} items</span>
            </div>

            {/* List / Empty State */}
            {wishlist.length === 0 ? (
                <div className="text-center py-20 border border-[#1E1A14] bg-[#161210]" style={{ borderRadius: '4px' }}>
                    <h2 className="font-sans text-[18px] text-[#F5F0E8] mb-2">Your wishlist is empty</h2>
                    <p className="font-sans text-[14px] text-[#6B6055] mb-6">Browse the marketplace and save gifts you love.</p>
                    <Link href="/marketplace" className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                        Browse Gifts &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item, index) => {
                        const isFeatured = index === 0;
                        const cardClasses = isFeatured
                            ? "md:col-span-2 md:row-span-2 group relative border border-[#1E1A14] bg-[#0A0806] hover:border-[#3A3020] transition-colors cursor-pointer flex flex-col"
                            : "group relative border border-[#1E1A14] bg-[#0A0806] hover:border-[#3A3020] transition-colors cursor-pointer flex flex-col";
                        
                        return (
                            <Link href={`/send-gift?id=${item.giftId}`} key={item.id} className={cardClasses} style={{ minHeight: isFeatured ? '480px' : '320px', borderRadius: '4px' }}>
                                {/* Hover Remove Button */}
                                <button 
                                    onClick={(e) => removeFromWishlist(item.id, e)}
                                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity font-sans text-[13px] text-[#4A4038] hover:text-[#C0292B] z-10"
                                >
                                    &times;
                                </button>
                                
                                <div className="flex-1 flex flex-col p-6">
                                    <div className="flex-1 flex items-center justify-center bg-[#111009] mb-6" style={{ borderRadius: '2px' }}>
                                        {/* Mock image placeholder using geometric shapes per Phase 2 styling */}
                                        <div className="w-16 h-16 border border-[#2E2820] flex items-center justify-center text-[#F5F0E8] font-mono text-[10px] tracking-widest bg-[#161210]">
                                            {item.gift?.category?.substring(0,3).toUpperCase() || 'GFT'}
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="font-sans text-[12px] uppercase tracking-widest text-[#6B6055] mb-2">{item.gift?.category}</div>
                                        <div className="flex justify-between items-end gap-4 mb-4">
                                            <h3 className={`font-sans font-medium text-[#F5F0E8] leading-snug ${isFeatured ? 'text-[24px]' : 'text-[16px]'}`}>
                                                {item.gift?.name}
                                            </h3>
                                            <div className="font-mono text-[#F5F0E8] whitespace-nowrap">
                                                {formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-[#1E1A14] pt-4 mt-auto">
                                            <div className="font-sans text-[13px] text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                                                Send as Gift &rarr;
                                            </div>
                                            <button 
                                                onClick={(e) => removeFromWishlist(item.id, e)}
                                                className="font-sans text-[12px] text-[#4A4038] hover:text-[#C0292B] opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                Remove from wishlist
                                            </button>
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
