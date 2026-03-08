'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const [user, setUser] = useState({ fullName: 'User' });
    const [stats, setStats] = useState({ sent: 0, received: 0, pending: 0, wishlist: 0 });
    const [activity, setActivity] = useState<any[]>([]);
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            setUser({ fullName: 'Alex Johnson' });
            setStats({ sent: 12, received: 8, pending: 3, wishlist: 5 });

            setActivity([
                { type: 'sent', id: 1, name: 'Premium Coffee Set', recipient: 'Sarah Smith', date: '2023-12-20', status: 'delivered' },
                { type: 'received', id: 2, name: 'Amazon Gift Card', from: 'Mike Brown', date: '2023-12-18', status: 'claimed' },
                { type: 'sent', id: 3, name: 'Wireless Headphones', recipient: 'David Wilson', date: '2023-12-15', status: 'pending' }
            ]);

            setWishlist([
                { id: 101, name: 'Sony WH-1000XM5', price: 349.99, image: 'https://placehold.co/300x300?text=Headphones', currency: 'USD' },
                { id: 102, name: 'Kindle Paperwhite', price: 139.99, image: 'https://placehold.co/300x300?text=Kindle', currency: 'USD' },
                { id: 103, name: 'Nespresso Vertuo', price: 199.00, image: 'https://placehold.co/300x300?text=Coffee', currency: 'USD' },
                { id: 104, name: 'Apple AirTag 4-Pack', price: 99.00, image: 'https://placehold.co/300x300?text=AirTag', currency: 'USD' },
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
    };

    return (
        <>
            <div className="dashboard-header fade-in-up">
                <h1 className="dashboard-welcome">Welcome back, <span id="userName">{user.fullName.split(' ')[0]}</span>! <i className="fas fa-tree text-green-600"></i></h1>
                <p className="dashboard-subtitle">Here&apos;s your gift exchange activity</p>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions fade-in-up">
                <Link href="/marketplace" className="btn btn-primary btn-lg"><i className="fas fa-gift"></i> Send a Gift</Link>
                <Link href="/marketplace" className="btn btn-gold btn-lg"><i className="fas fa-shopping-bag"></i> Browse Marketplace</Link>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card fade-in-up stagger-1">
                    <div className="stat-icon"><i className="fas fa-paper-plane"></i></div>
                    <div className="stat-value">{stats.sent}</div>
                    <div className="stat-label">Gifts Sent</div>
                </div>

                <div className="stat-card fade-in-up stagger-2">
                    <div className="stat-icon"><i className="fas fa-inbox"></i></div>
                    <div className="stat-value">{stats.received}</div>
                    <div className="stat-label">Gifts Received</div>
                </div>

                <div className="stat-card fade-in-up stagger-3">
                    <div className="stat-icon"><i className="fas fa-hourglass-half"></i></div>
                    <div className="stat-value">{stats.pending}</div>
                    <div className="stat-label">Pending</div>
                </div>

                <div className="stat-card fade-in-up stagger-4">
                    <div className="stat-icon"><i className="fas fa-star"></i></div>
                    <div className="stat-value">{stats.wishlist}</div>
                    <div className="stat-label">Wishlist Items</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card fade-in-up">
                <div className="card-body">
                    <h2 className="card-title">Recent Activity</h2>
                    <div id="recentActivity">
                        {loading ? (
                            <p className="text-center py-2xl text-secondary">Loading activity...</p>
                        ) : activity.length === 0 ? (
                            <p className="text-center py-2xl text-secondary">No activity yet. <Link href="/marketplace" className="text-red font-semibold">Start by browsing gifts!</Link></p>
                        ) : (
                            activity.map((item, index) => (
                                <div key={index} className="py-md border-bottom">
                                    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '2rem' }}>
                                            <i className={`fas ${item.type === 'sent' ? 'fa-paper-plane' : 'fa-inbox'}`}></i>
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <div className="font-semibold">{item.type === 'sent' ? `Sent ${item.name}` : `Received ${item.name}`}</div>
                                            <div className="text-sm text-secondary">{item.type === 'sent' ? `To: ${item.recipient}` : `From: ${item.from}`}</div>
                                            <div className="text-xs text-light">{item.date}</div>
                                        </div>
                                        <span className={`badge ${item.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>{item.status}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* My Wishlist Section */}
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
                            wishlist.map((gift) => (
                                <div key={gift.id} className="card hover-lift">
                                    <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '150px', objectFit: 'contain', background: 'var(--cream)', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
                                    <div className="card-body">
                                        <h4 className="font-semibold text-sm mb-xs truncate">{gift.name}</h4>
                                        <div className="text-red font-bold mb-md">{formatCurrency(gift.price, gift.currency)}</div>
                                        <Link href={`/gift/${gift.id}`} className="btn btn-primary btn-sm w-full">View</Link>
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
