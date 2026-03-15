'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { giftFlow, wishlistFlow } from '@/lib/giftFlow';
import { Order, WishlistItem } from '@/lib/types';

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

    return (
        <>
            <div className="dashboard-header fade-in-up">
                <h1 className="dashboard-welcome">Welcome back, <span id="userName">{userName}</span>! <i className="fas fa-tree text-green-600"></i></h1>
                <p className="dashboard-subtitle">Here&apos;s your gift exchange activity</p>
            </div>

            <div className="quick-actions fade-in-up">
                <Link href="/marketplace" className="btn btn-primary btn-lg"><i className="fas fa-gift"></i> Send a Gift</Link>
                <Link href="/marketplace" className="btn btn-gold btn-lg"><i className="fas fa-shopping-bag"></i> Browse Marketplace</Link>
            </div>

            <div className="stats-grid">
                <div className="stat-card fade-in-up stagger-1">
                    <div className="stat-icon"><i className="fas fa-paper-plane"></i></div>
                    <div className="stat-value">{sentOrders.length}</div>
                    <div className="stat-label">Gifts Sent</div>
                </div>
                <div className="stat-card fade-in-up stagger-2">
                    <div className="stat-icon"><i className="fas fa-inbox"></i></div>
                    <div className="stat-value">{receivedOrders.length}</div>
                    <div className="stat-label">Gifts Received</div>
                </div>
                <div className="stat-card fade-in-up stagger-3">
                    <div className="stat-icon"><i className="fas fa-hourglass-half"></i></div>
                    <div className="stat-value">{pendingCount}</div>
                    <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card fade-in-up stagger-4">
                    <div className="stat-icon"><i className="fas fa-star"></i></div>
                    <div className="stat-value">{wishlist.length}</div>
                    <div className="stat-label">Wishlist Items</div>
                </div>
            </div>

            <div className="card fade-in-up">
                <div className="card-body">
                    <h2 className="card-title">Recent Activity</h2>
                    <div id="recentActivity">
                        {loading ? (
                            <p className="text-center py-2xl text-secondary">Loading activity...</p>
                        ) : recentActivity.length === 0 ? (
                            <p className="text-center py-2xl text-secondary">No activity yet. <Link href="/marketplace" className="text-red font-semibold">Start by browsing gifts!</Link></p>
                        ) : (
                            recentActivity.map((item) => (
                                <div key={item.id} className="py-md border-bottom">
                                    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '2rem' }}>
                                            <i className={`fas ${item.activityType === 'sent' ? 'fa-paper-plane' : 'fa-inbox'}`}></i>
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <div className="font-semibold">
                                                {item.activityType === 'sent' ? `Sent ${item.gift?.name}` : `Received ${item.gift?.name}`}
                                            </div>
                                            <div className="text-sm text-secondary">
                                                {item.activityType === 'sent' ? `To: ${item.recipientName}` : `Order #${item.id.slice(0, 8)}`}
                                            </div>
                                            <div className="text-xs text-light">{new Date(item.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <span className={`badge ${item.status === 'pending' || item.status === 'sent' ? 'badge-warning' : 'badge-success'}`}>{item.status}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="card fade-in-up mt-xl">
                <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                        <h2 className="card-title" style={{ margin: 0 }}>My Wishlist</h2>
                        <Link href="/marketplace" className="btn btn-outline btn-sm">Browse Gifts</Link>
                    </div>
                    <div id="wishlistItems" className="grid grid-cols-4 gap-lg">
                        {loading ? (
                            <div className="col-span-4 text-center">Loading wishlist...</div>
                        ) : wishlist.length === 0 ? (
                            <div className="col-span-4 text-center py-2xl text-secondary">
                                Your wishlist is empty. <Link href="/marketplace" className="text-red font-semibold">Add some gifts!</Link>
                            </div>
                        ) : (
                            wishlist.map((item) => (
                                <div key={item.id} className="card hover-lift">
                                    <div style={{ width: '100%', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', fontSize: '3rem' }}>
                                        {item.gift?.emoji || '🎁'}
                                    </div>
                                    <div className="card-body">
                                        <h4 className="font-semibold text-sm mb-xs truncate">{item.gift?.name}</h4>
                                        <div className="text-red font-bold mb-md">{formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}</div>
                                        <Link href={`/gift/${item.giftId}`} className="btn btn-primary btn-sm w-full">View</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
