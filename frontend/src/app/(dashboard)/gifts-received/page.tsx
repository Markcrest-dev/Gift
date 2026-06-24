'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';
import Button from '@/components/ui/Button';

export default function GiftsReceivedPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        giftFlow.getReceivedGifts()
            .then(setOrders)
            .catch((err) => console.error('Failed to load received gifts:', err))
            .finally(() => setLoading(false));
    }, []);

    const formatCurrency = (amount: number, currency: string) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

    if (loading) return <div className="text-paper/30 text-sm py-16 text-center">Loading...</div>;

    return (
        <>
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-paper mb-2">Gifts Received</h1>
                <p className="text-paper/40 text-sm">Gifts you&apos;ve received</p>
            </div>
            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-paper/30 text-sm mb-6">No gifts received yet</p>
                    <Link href="/marketplace"><Button variant="primary" size="sm">Browse Gifts</Button></Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-surface rounded-lg overflow-hidden">
                            <div className="h-36 flex items-center justify-center text-5xl bg-paper/3">{order.gift?.emoji || '🎁'}</div>
                            <div className="p-4">
                                <h3 className="text-paper text-sm font-medium mb-2">{order.gift?.name || 'Gift'}</h3>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-paper/30 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    <span className="font-mono text-gold/80 text-sm">{formatCurrency(order.gift?.price || 0, order.gift?.currency || 'USD')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${order.status === 'redeemed' ? 'bg-green/15 text-green' : 'bg-gold/10 text-gold'}`}>{order.status}</span>
                                    {order.status !== 'redeemed' && <Link href={`/receive-gift?orderId=${order.id}`}><Button variant="primary" size="sm">Redeem</Button></Link>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
