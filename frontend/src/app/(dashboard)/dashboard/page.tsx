'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { giftFlow, wishlistFlow } from '@/lib/giftFlow';
import { Order, WishlistItem } from '@/lib/types';
import Button from '@/components/ui/Button';
import { Send, ShoppingBag, ArrowRight } from 'lucide-react';

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
                <h1 className="font-display text-3xl md:text-4xl font-bold text-paper mb-2">
                    Welcome back, <span id="userName">{userName}</span>
                </h1>
                <p className="text-paper/40 text-sm">Your gift exchange overview</p>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-surface rounded-lg p-5">
                        <div className="font-mono text-2xl font-medium text-paper mb-1">{stat.value}</div>
                        <div className="text-paper/35 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity — clean rows, no card wrapper */}
            <div className="mb-10">
                <h2 className="text-paper font-semibold text-base mb-4">Recent Activity</h2>
                <div>
                    {loading ? (
                        <p className="text-paper/30 text-sm py-8 text-center">Loading activity...</p>
                    ) : recentActivity.length === 0 ? (
                        <p className="text-paper/30 text-sm py-8 text-center">
                            No activity yet.{' '}
                            <Link href="/marketplace" className="text-gold/70 hover:text-gold transition-colors font-medium">Start by browsing gifts</Link>
                        </p>
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
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-paper font-semibold text-base">Wishlist</h2>
                    <Link href="/marketplace">
                        <Button variant="ghost" size="sm">Browse Gifts</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {loading ? (
                        <div className="col-span-full text-paper/30 text-sm text-center py-8">Loading wishlist...</div>
                    ) : wishlist.length === 0 ? (
                        <div className="col-span-full text-paper/30 text-sm text-center py-8">
                            Your wishlist is empty.{' '}
                            <Link href="/marketplace" className="text-gold/70 hover:text-gold transition-colors font-medium">Add some gifts</Link>
                        </div>
                    ) : (
                        wishlist.map((item) => (
                            <Link key={item.id} href={`/gift/${item.giftId}`} className="bg-surface rounded-lg overflow-hidden group">
                                <div className="h-28 flex items-center justify-center text-4xl bg-paper/3">
                                    {item.gift?.emoji || '🎁'}
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
