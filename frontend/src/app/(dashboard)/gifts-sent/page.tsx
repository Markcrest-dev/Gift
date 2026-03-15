'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';

export default function GiftsSentPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        giftFlow.getSentGifts()
            .then(setOrders)
            .catch((err) => console.error('Failed to load sent gifts:', err))
            .finally(() => setLoading(false));
    }, []);

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'badge-warning';
            case 'sent': return 'badge-info';
            case 'received': return 'badge-info';
            case 'redeemed': return 'badge-success';
            default: return 'badge-secondary';
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    if (loading) {
        return <div className="p-xl text-center">Loading your sent gifts...</div>;
    }

    return (
        <>
            <div className="page-header fade-in-up">
                <h1 className="page-title">Gifts Sent</h1>
                <p className="page-subtitle">Track all the gifts you&apos;ve sent to others</p>
            </div>

            <div className="gifts-table fade-in-up">
                <div className="table-header">
                    <div className="filter-tabs">
                        {['all', 'pending', 'sent', 'redeemed'].map((f) => (
                            <button
                                key={f}
                                className={`filter-tab ${filter === f ? 'active' : ''} capitalize`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                <div id="giftsContainer">
                    {filteredOrders.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon"><i className="fas fa-paper-plane"></i></div>
                            <h3 className="empty-title">No gifts {filter !== 'all' ? filter : 'sent yet'}</h3>
                            <p className="empty-text">
                                {filter === 'all'
                                    ? 'Start spreading joy by sending gifts to your friends and family!'
                                    : `You don't have any ${filter} gifts.`}
                            </p>
                            {filter === 'all' && <Link href="/marketplace" className="btn btn-primary">Browse Gifts</Link>}
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order.id} className="gift-item">
                                <div style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'var(--cream)', borderRadius: 'var(--radius-md)' }}>
                                    {order.gift?.emoji || '🎁'}
                                </div>
                                <div className="gift-details">
                                    <div className="gift-name">{order.gift?.name || 'Gift'}</div>
                                    <div className="gift-meta">
                                        <div className="meta-item"><span>To:</span> <span>{order.recipientName}</span></div>
                                        <div className="meta-item"><span>Email:</span> <span>{order.recipientEmail}</span></div>
                                        <div className="meta-item"><span>Date:</span> <span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                                        <div className="meta-item"><span>Total:</span> <span>{formatCurrency(order.totalAmount, 'USD')}</span></div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', marginTop: 'var(--space-sm)' }}>
                                        <span className={`badge ${getStatusColor(order.status)} uppercase`}>{order.status}</span>
                                        <span className="tracking-code">ID: {order.id.slice(0, 8)}</span>
                                    </div>
                                    {order.message && (
                                        <div style={{ marginTop: 'var(--space-sm)', padding: 'var(--space-md)', background: 'var(--cream)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                            &quot;{order.message}&quot;
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
