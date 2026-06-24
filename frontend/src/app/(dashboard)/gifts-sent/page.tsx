'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';
import Button from '@/components/ui/Button';

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
        return <div className="text-gray-500 text-sm p-12 text-center">Loading your sent gifts...</div>;
    }

    const filters = ['All', 'Pending', 'Delivered', 'Claimed', 'Expired'];

    return (
        <div className="font-body pb-12">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
                <h1 className="text-3xl font-display text-[#0A4535]">Gifts Sent</h1>
                <Link href="/marketplace">
                    <Button variant="primary">
                        Send a New Gift &rarr;
                    </Button>
                </Link>
            </div>

            {/* Filter Strip */}
            <div className="flex overflow-x-auto items-center gap-2 mb-8 pb-2 hide-scrollbar">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                            filter === f
                                ? 'text-white bg-[#0A4535]'
                                : 'text-gray-600 bg-white border border-gray-200 hover:border-[#0A4535] hover:text-[#0A4535]'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List / Empty State */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-display text-[#0A4535] mb-2">No gifts sent yet</h2>
                    <p className="text-gray-500 text-sm mb-6">Find something meaningful in the marketplace.</p>
                    <Link href="/marketplace">
                        <Button variant="primary">Browse Gifts</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-100">
                    {filteredOrders.map((order) => {
                        const status = order.status || 'pending';
                        
                        let statusUI = null;
                        if (status === 'pending') {
                            statusUI = <span className="text-xs font-bold uppercase tracking-widest bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full shadow-sm border border-amber-200">Pending</span>;
                        } else if (status === 'delivered' || status === 'sent') {
                            statusUI = <span className="text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full shadow-sm border border-blue-200">Delivered</span>;
                        } else if (status === 'redeemed' || status === 'claimed') {
                            statusUI = <span className="text-xs font-bold uppercase tracking-widest bg-[#D1FAE5] text-[#0A4535] px-3 py-1.5 rounded-full shadow-sm border border-emerald-200">Claimed</span>;
                        } else {
                            statusUI = <span className="text-xs font-bold uppercase tracking-widest bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full shadow-sm border border-gray-200">Expired</span>;
                        }

                        return (
                            <div key={order.id} className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50 transition-colors gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-5 w-full items-center gap-4">
                                    <div className="md:col-span-2">
                                        <div className="text-[#0A4535] text-base font-semibold mb-1">{order.recipientName}</div>
                                        <div className="text-gray-500 text-sm flex items-center gap-2">
                                            <span>{order.recipientCountry || 'Unknown Country'}</span>
                                        </div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="text-gray-700 font-medium text-sm mb-1 truncate pr-4">{order.gift?.name || 'Gift'}</div>
                                        <div className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="font-mono text-gray-900 font-bold text-lg">{formatCurrency(order.totalAmount, 'USD')}</div>
                                    </div>
                                    <div className="md:col-span-1 flex items-center justify-between md:justify-end gap-4 w-full">
                                        <div>{statusUI}</div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity md:block hidden">
                                            <button className="text-[#0A4535] font-bold text-sm hover:underline">
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
