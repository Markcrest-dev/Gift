'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { giftFlow, wishlistFlow } from '@/lib/giftFlow';
import { Order, WishlistItem } from '@/lib/types';
import Button from '@/components/ui/Button';
import { Send, ShoppingBag, ArrowRight } from 'lucide-react';
import GiftPlaceholder from '@/components/ui/GiftPlaceholder';

export default function DashboardPage() {
    const [userName, setUserName] = useState('User');
    const [sentOrders, setSentOrders] = useState<Order[]>([]);
    const [receivedOrders, setReceivedOrders] = useState<Order[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const user = auth.getCurrentUser();
            if (user) {
                setUserName(user.firstName);
            }

            try {
                const [sent, received, wish] = await Promise.all([
                    giftFlow.getSentGifts(),
                    giftFlow.getReceivedGifts(),
                    wishlistFlow.getWishlist(),
                ]);
                setSentOrders(sent);
                setReceivedOrders(received);
                setWishlist(wish);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            }
            setLoading(false);
        };

        loadData();
    }, []);

    const pendingCount = sentOrders.filter(o => o.status === 'pending' || o.status === 'sent').length;

    const recentActivity = [
        ...sentOrders.map(o => ({ ...o, activityType: 'sent' as const })),
        ...receivedOrders.map(o => ({ ...o, activityType: 'received' as const })),
    ]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    const stats = [
        { label: 'Gifts Sent', value: sentOrders.length },
        { label: 'Received', value: receivedOrders.length },
        { label: 'Pending', value: pendingCount },
        { label: 'Wishlist', value: wishlist.length },
    ];

    return (
        <>
            <div className="mb-10">
                <h1 className="text-[22px] font-semibold text-[#F5F0E8] mb-1">
                    Welcome back, <span id="userName">{userName}</span>
                </h1>
                <p className="text-[#6B6055] text-[13px]">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/marketplace">
                    <Button variant="primary" size="md">
                        <Send className="w-4 h-4" />
                        Send a Gift
                    </Button>
                </Link>
                <Link href="/marketplace">
                    <Button variant="ghost" size="md">
                        <ShoppingBag className="w-4 h-4" />
                        Browse Marketplace
                    </Button>
                </Link>
            </div>

            {/* Stats — flat bg-surface, no shadows, no hover-lift */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-[#1C1814] border border-[#1E1A14] border-l-[2px] border-l-[#B8922A] rounded-[3px] py-[24px] px-[28px]">
                        <div className="font-mono text-[40px] text-[#F5F0E8] leading-none mb-2">{stat.value}</div>
                        <div className="text-[#6B6055] text-[11px] uppercase tracking-[0.1em]">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity — clean rows, no card wrapper */}
            <div className="mb-10">
                <div className="border-b border-[#1E1A14] mb-4 pb-2">
                    <h2 className="text-[#6B6055] text-[13px] uppercase font-semibold tracking-[0.08em]">Recent Activity</h2>
                </div>
                <div>
                    {loading ? (
                        <p className="text-paper/30 text-sm py-8 text-center">Loading activity...</p>
                    ) : recentActivity.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-[#2E2820] rounded-[3px]">
                            <h3 className="text-[#F5F0E8] text-[16px] font-medium mb-1">No gifts sent yet</h3>
                            <p className="text-[#6B6055] text-[14px] mb-4">Browse the marketplace and send your first gift.</p>
                            <Link href="/marketplace" className="text-[#B8922A] text-[14px] hover:underline">Browse Gifts →</Link>
                        </div>
                    ) : (
                        recentActivity.map((item) => (
                            <div key={item.id} className="flex items-start gap-4 py-4 border-b border-paper/5 last:border-b-0">
                                <div className="w-8 h-8 rounded-full bg-paper/5 flex items-center justify-center shrink-0 mt-0.5">
                                    {item.activityType === 'sent' ? (
                                        <Send className="w-3.5 h-3.5 text-paper/40" />
                                    ) : (
                                        <ArrowRight className="w-3.5 h-3.5 text-paper/40" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-paper text-sm font-medium truncate">
                                        {item.activityType === 'sent' ? `Sent ${item.gift?.name}` : `Received ${item.gift?.name}`}
                                    </p>
                                    <p className="text-paper/30 text-xs mt-0.5">
                                        {item.activityType === 'sent' ? `To: ${item.recipientName}` : `Order #${item.id.slice(0, 8)}`}
                                    </p>
                                    <p className="text-paper/20 text-xs mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                                    item.status === 'redeemed' ? 'bg-green/15 text-green' :
                                    item.status === 'pending' || item.status === 'sent' ? 'bg-gold/10 text-gold' :
                                    'bg-paper/5 text-paper/40'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Wishlist — embedded grid, no floating cards */}
            <div>
                <div className="flex justify-between items-end border-b border-[#1E1A14] mb-4 pb-2">
                    <h2 className="text-[#6B6055] text-[13px] uppercase font-semibold tracking-[0.08em]">Wishlist</h2>
                    <Link href="/marketplace">
                        <Button variant="ghost" size="sm">Browse Gifts</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {loading ? (
                        <div className="col-span-full text-paper/30 text-sm text-center py-8">Loading wishlist...</div>
                    ) : wishlist.length === 0 ? (
                        <div className="col-span-full text-center p-12 border border-dashed border-[#2E2820] rounded-[3px]">
                            <h3 className="text-[#F5F0E8] text-[16px] font-medium mb-1">Your wishlist is empty</h3>
                            <p className="text-[#6B6055] text-[14px] mb-4">Browse the marketplace and save your favorites.</p>
                            <Link href="/marketplace" className="text-[#B8922A] text-[14px] hover:underline">Browse Gifts →</Link>
                        </div>
                    ) : (
                        wishlist.map((item) => (
                            <Link key={item.id} href={`/gift/${item.giftId}`} className="bg-surface rounded-lg overflow-hidden group">
                                <div className="h-28 flex items-center justify-center bg-[#141210]">
                                    <GiftPlaceholder name={item.gift?.name || '?'} />
                                </div>
                                <div className="p-3.5">
                                    <h4 className="text-paper text-sm font-medium truncate mb-1 group-hover:text-gold transition-colors">{item.gift?.name}</h4>
                                    <div className="font-mono text-gold/80 text-sm">{formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
