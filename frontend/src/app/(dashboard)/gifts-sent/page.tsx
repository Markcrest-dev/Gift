'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';
import Button from '@/components/ui/Button';

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

    const statusStyle = (status: string) => {
        switch (status) {
            case 'pending': case 'sent': return 'bg-gold/10 text-gold';
            case 'redeemed': return 'bg-green/15 text-green';
            default: return 'bg-paper/5 text-paper/40';
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    if (loading) {
        return <div className="text-paper/30 text-sm py-16 text-center">Loading your sent gifts...</div>;
    }

    const filters = ['all', 'pending', 'sent', 'redeemed'];

    return (
        <>
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-paper mb-2">Gifts Sent</h1>
                <p className="text-paper/40 text-sm">Track all the gifts you&apos;ve sent</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex gap-1">
                    {filters.map((f) => (
                        <button
                            key={f}
                            className={`px-3 py-1.5 text-sm rounded-[4px] capitalize transition-colors ${
                                filter === f ? 'bg-gold/10 text-gold' : 'text-paper/35 hover:text-paper/60'
                            }`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <span className="text-paper/25 text-sm">
                    {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                </span>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-paper/30 text-sm mb-4">
                        {filter === 'all' ? 'No gifts sent yet' : `No ${filter} gifts`}
                    </p>
                    {filter === 'all' && (
                        <Link href="/marketplace">
                            <Button variant="primary" size="sm">Browse Gifts</Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-0">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="flex items-start gap-4 py-5 border-b border-paper/5 last:border-b-0">
                            <div className="w-14 h-14 rounded-lg bg-surface flex items-center justify-center text-2xl shrink-0">
                                {order.gift?.emoji || '🎁'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-paper text-sm font-medium">{order.gift?.name || 'Gift'}</p>
                                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                                    <span className="text-paper/30 text-xs">To: {order.recipientName}</span>
                                    <span className="text-paper/30 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    <span className="font-mono text-paper/50 text-xs">{formatCurrency(order.totalAmount, 'USD')}</span>
                                </div>
                                {order.message && (
                                    <p className="text-paper/20 text-xs mt-2 italic">&ldquo;{order.message}&rdquo;</p>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyle(order.status)}`}>
                                    {order.status}
                                </span>
                                <span className="font-mono text-paper/15 text-xs">{order.id.slice(0, 8)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
