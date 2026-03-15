'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';

export default function GiftsReceivedPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        giftFlow.getReceivedGifts()
            .then(setOrders)
            .catch((err) => console.error('Failed to load received gifts:', err))
            .finally(() => setLoading(false));
    }, []);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    if (loading) {
        return <div className="p-xl text-center">Loading your received gifts...</div>;
    }

    return (
        <>
            <div className="page-header fade-in-up">
                <h1 className="page-title">Gifts Received</h1>
                <p className="page-subtitle">All the wonderful gifts you&apos;ve received</p>
            </div>

            <div id="giftsContainer">
                {orders.length === 0 ? (
                    <div className="empty-state fade-in-up">
                        <div className="empty-icon"><i className="fas fa-gift"></i></div>
                        <h3 className="empty-title">No gifts received yet</h3>
                        <p className="empty-text">
                            When someone sends you a gift, it will appear here.<br />
                            Share your email with friends and family!
                        </p>
                        <Link href="/marketplace" className="btn btn-primary">Browse Gifts</Link>
                    </div>
                ) : (
                    <div className="gifts-grid">
                        {orders.map((order, index) => (
                            <div key={order.id} className={`gift-card fade-in-up stagger-${(index % 4) + 1}`}>
                                <div className="gift-card-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', background: 'var(--cream)', height: '200px' }}>
                                    {order.gift?.emoji || '🎁'}
                                </div>
                                <div className="gift-card-content">
                                    <h3 className="gift-card-title">{order.gift?.name || 'Gift'}</h3>
                                    <div className="gift-card-meta">
                                        <div className="meta-row"><span>Date:</span> <span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                                        <div className="meta-row"><span>Value:</span> <span>{formatCurrency(order.gift?.price || 0, order.gift?.currency || 'USD')}</span></div>
                                    </div>
                                    <div className="redemption-info">
                                        <span className={`badge ${order.status === 'redeemed' ? 'badge-success' : 'badge-warning'} uppercase`}>{order.status}</span>
                                    </div>
                                    {order.status !== 'redeemed' && (
                                        <Link href={`/receive-gift?orderId=${order.id}`} className="btn btn-primary w-full text-center block mt-md">
                                            Redeem Gift
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
