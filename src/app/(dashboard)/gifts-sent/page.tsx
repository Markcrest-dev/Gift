'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Mock Data
const MOCK_SENT_GIFTS = [
    { id: 1, recipient: { name: 'Sarah Smith', email: 'sarah@example.com' }, gift: { name: 'Premium Coffee Set', price: 85.00, currency: 'USD', image: 'https://placehold.co/100x100?text=Coffee' }, sentAt: '2023-12-20', status: 'delivered', trackingCode: 'TRK-123456' },
    { id: 2, recipient: { name: 'David Wilson', email: 'david@example.com' }, gift: { name: 'Wireless Headphones', price: 129.99, currency: 'USD', image: 'https://placehold.co/100x100?text=Headphones' }, sentAt: '2023-12-19', status: 'pending', trackingCode: 'TRK-789012' },
    { id: 3, recipient: { name: 'Michael Brown', email: 'mike@example.com' }, gift: { name: 'Amazon Gift Card', price: 50.00, currency: 'USD', image: 'https://placehold.co/100x100?text=GiftCard' }, sentAt: '2023-12-15', status: 'claimed', trackingCode: 'TRK-345678', message: 'Merry Christmas Mike!' }
];

export default function GiftsSentPage() {
    const [gifts, setGifts] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setGifts(MOCK_SENT_GIFTS);
            setLoading(false);
        }, 800);
    }, []);

    const filteredGifts = filter === 'all'
        ? gifts
        : gifts.filter(gift => gift.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'badge-warning';
            case 'delivered': return 'badge-info';
            case 'claimed': return 'badge-success';
            default: return 'badge-secondary';
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
    };

    if (loading) {
        return <div className="p-xl text-center">Loading your sent gifts...</div>;
    }

    return (
        <>
            <div className="page-header fade-in-up">
                <h1 className="page-title">Gifts Sent 📤</h1>
                <p className="page-subtitle">Track all the gifts you&apos;ve sent to others</p>
            </div>

            <div className="gifts-table fade-in-up">
                {/* Table Header / Filters */}
                <div className="table-header">
                    <div className="filter-tabs">
                        {['all', 'pending', 'delivered', 'claimed'].map((f) => (
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
                            {filteredGifts.length} gift{filteredGifts.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Gifts List */}
                <div id="giftsContainer">
                    {filteredGifts.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <h3 className="empty-title">No gifts {filter !== 'all' ? filter : 'sent yet'}</h3>
                            <p className="empty-text">
                                {filter === 'all'
                                    ? 'Start spreading joy by sending gifts to your friends and family!'
                                    : `You don't have any ${filter} gifts.`}
                            </p>
                            {filter === 'all' && <Link href="/marketplace" className="btn btn-primary">Browse Gifts</Link>}
                        </div>
                    ) : (
                        filteredGifts.map((item) => (
                            <div key={item.id} className="gift-item">
                                <img src={item.gift.image} alt={item.gift.name} className="gift-image" />
                                <div className="gift-details">
                                    <div className="gift-name">{item.gift.name}</div>
                                    <div className="gift-meta">
                                        <div className="meta-item">
                                            <span>👤</span>
                                            <span>{item.recipient.name}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span>📧</span>
                                            <span>{item.recipient.email}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span>📅</span>
                                            <span>{item.sentAt}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span>💰</span>
                                            <span>{formatCurrency(item.gift.price, item.gift.currency)}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', marginTop: 'var(--space-sm)' }}>
                                        <span className={`badge ${getStatusColor(item.status)} uppercase`}>{item.status}</span>
                                        <span className="tracking-code">ID: {item.trackingCode}</span>
                                    </div>
                                    {item.message && (
                                        <div style={{ marginTop: 'var(--space-sm)', padding: 'var(--space-md)', background: 'var(--cream)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                                            &quot;{item.message}&quot;
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
