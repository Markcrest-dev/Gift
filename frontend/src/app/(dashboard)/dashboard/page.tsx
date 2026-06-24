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
        <div className="font-body">
            <div className="mb-10">
                <h1 className="text-3xl font-display text-[#0A4535] mb-2">
                    Welcome back, <span id="userName">{userName}</span>
                </h1>
                <p className="text-gray-500 text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
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

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D1FAE5]"></div>
                        <div className="font-display text-4xl text-[#0A4535] leading-none mb-3 pl-3">{stat.value}</div>
                        <div className="text-gray-500 text-xs uppercase tracking-widest font-bold pl-3">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mb-12">
                <div className="border-b border-gray-200 mb-6 pb-3">
                    <h2 className="text-[#0A4535] text-sm uppercase font-bold tracking-widest">Recent Activity</h2>
                </div>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <p className="text-gray-400 text-sm py-12 text-center">Loading activity...</p>
                    ) : recentActivity.length === 0 ? (
                        <div className="text-center p-12">
                            <h3 className="text-[#0A4535] text-lg font-semibold mb-2">No gifts sent yet</h3>
                            <p className="text-gray-500 text-sm mb-6">Browse the marketplace and send your first gift.</p>
                            <Link href="/marketplace">
                                <Button variant="primary">Browse Gifts</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {recentActivity.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.activityType === 'sent' ? 'bg-[#D1FAE5] text-[#0A4535]' : 'bg-[#FEE2E2] text-red-700'}`}>
                                        {item.activityType === 'sent' ? (
                                            <Send className="w-4 h-4" />
                                        ) : (
                                            <ArrowRight className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[#0A4535] text-sm font-semibold truncate">
                                            {item.activityType === 'sent' ? `Sent ${item.gift?.name}` : `Received ${item.gift?.name}`}
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {item.activityType === 'sent' ? `To: ${item.recipientName}` : `Order #${item.id.slice(0, 8)}`} • {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
                                        item.status === 'redeemed' ? 'bg-[#D1FAE5] text-[#0A4535]' :
                                        item.status === 'pending' || item.status === 'sent' ? 'bg-amber-100 text-amber-800' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        {item.status.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Wishlist */}
            <div>
                <div className="flex justify-between items-end border-b border-gray-200 mb-6 pb-3">
                    <h2 className="text-[#0A4535] text-sm uppercase font-bold tracking-widest">Wishlist</h2>
                    <Link href="/marketplace">
                        <span className="text-[#0A4535] text-sm font-bold hover:underline">View All &rarr;</span>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {loading ? (
                        <div className="col-span-full text-gray-400 text-sm text-center py-12">Loading wishlist...</div>
                    ) : wishlist.length === 0 ? (
                        <div className="col-span-full bg-white rounded-3xl border border-gray-100 shadow-sm text-center p-12">
                            <h3 className="text-[#0A4535] text-lg font-semibold mb-2">Your wishlist is empty</h3>
                            <p className="text-gray-500 text-sm mb-6">Browse the marketplace and save your favorites.</p>
                            <Link href="/marketplace">
                                <Button variant="primary">Browse Gifts</Button>
                            </Link>
                        </div>
                    ) : (
                        wishlist.map((item) => (
                            <Link key={item.id} href={`/gift/${item.giftId}`} className="bg-white rounded-3xl overflow-hidden group shadow-sm border border-gray-100 hover:shadow-md transition-all block">
                                <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                                    <GiftPlaceholder name={item.gift?.name || '?'} />
                                </div>
                                <div className="p-4 border-t border-gray-50">
                                    <h4 className="text-[#0A4535] text-sm font-semibold truncate mb-1 group-hover:text-[#0A4535]/70 transition-colors">{item.gift?.name}</h4>
                                    <div className="font-mono font-bold text-gray-900 text-sm">{formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
