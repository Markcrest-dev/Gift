'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';

export default function GiftsSentPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        giftFlow.getSentGifts()
            .then(setOrders)
            .catch((err) => console.error('Failed to load sent gifts:', err))
            .finally(() => setLoading(false));
    }, []);

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter(order => {
            const mappedFilter = filter.toLowerCase();
            return order.status === mappedFilter;
        });

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    if (loading) {
        return <div className="text-paper/30 text-sm p-8 text-center">Loading your sent gifts...</div>;
    }

    const filters = ['All', 'Pending', 'Delivered', 'Claimed', 'Expired'];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Row */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-[#1E1A14]">
                <h1 className="font-sans text-[22px] font-semibold text-[#F5F0E8]">Gifts Sent</h1>
                <Link href="/send-gift" className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                    Send a Gift &rarr;
                </Link>
            </div>

            {/* Filter Strip */}
            <div className="flex items-center gap-2 mb-8">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 text-[13px] font-medium transition-colors border ${
                            filter === f
                                ? 'border-[#2E2820] bg-[#161210] text-[#F5F0E8]'
                                : 'border-transparent text-[#6B6055] hover:text-[#9A8E7A]'
                        }`}
                        style={{ borderRadius: '2px' }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List / Empty State */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-20 border border-[#1E1A14] bg-[#161210]" style={{ borderRadius: '4px' }}>
                    <h2 className="font-sans text-[18px] text-[#F5F0E8] mb-2">No gifts sent yet</h2>
                    <p className="font-sans text-[14px] text-[#6B6055] mb-6">Find something meaningful in the marketplace.</p>
                    <Link href="/marketplace" className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                        Browse Gifts &rarr;
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col">
                    {filteredOrders.map((order) => {
                        const status = order.status || 'pending';
                        
                        let statusUI = null;
                        if (status === 'pending') {
                            statusUI = <span className="font-sans text-[11px] uppercase tracking-wide border border-[#B8922A] text-[#B8922A] bg-[#1A1410] px-[10px] py-[3px]" style={{ borderRadius: '2px' }}>Pending</span>;
                        } else if (status === 'delivered' || status === 'sent') {
                            statusUI = <span className="font-sans text-[11px] uppercase tracking-wide border border-[#2A4A35] text-[#4A8A65] bg-[#111A13] px-[10px] py-[3px]" style={{ borderRadius: '2px' }}>Delivered</span>;
                        } else if (status === 'redeemed' || status === 'claimed') {
                            statusUI = <span className="font-sans text-[11px] uppercase tracking-wide border border-[#1E2A1E] text-[#6B6055] px-[10px] py-[3px]" style={{ borderRadius: '2px' }}>Claimed</span>;
                        } else {
                            statusUI = <span className="font-sans text-[11px] uppercase tracking-wide text-[#3A342E] px-[10px] py-[3px]">Expired</span>;
                        }

                        return (
                            <div key={order.id} className="group flex items-center justify-between py-5 border-b border-[#1A1510] hover:bg-[#0F0D0C] transition-colors -mx-4 px-4">
                                <div className="grid grid-cols-5 w-full items-center">
                                    <div className="col-span-2">
                                        <div className="font-sans text-[15px] font-medium text-[#F5F0E8] mb-1">{order.recipientName}</div>
                                        <div className="font-sans text-[12px] text-[#6B6055]">{order.recipientCountry || 'Unknown Country'}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="font-sans text-[14px] text-[#C4B99A] mb-1">{order.gift?.name || 'Gift'}</div>
                                        <div className="font-sans text-[12px] text-[#6B6055]">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="font-mono text-[16px] text-[#F5F0E8]">{formatCurrency(order.totalAmount, 'USD')}</div>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-between">
                                        <div>{statusUI}</div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="font-sans text-[13px] text-gold hover:text-gold/80 transition-colors">
                                                View &rarr;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
