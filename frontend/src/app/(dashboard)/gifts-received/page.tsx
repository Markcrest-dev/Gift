'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { giftFlow } from '@/lib/giftFlow';

export default function GiftsReceivedPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [redemptionOption, setRedemptionOption] = useState<string | null>(null);

    useEffect(() => {
        giftFlow.getReceivedGifts()
            .then(setOrders)
            .catch((err) => console.error('Failed to load received gifts:', err))
            .finally(() => setLoading(false));
    }, []);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    const handleConfirm = () => {
        if (selectedOrder) {
            setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'redeemed' } : o));
            setSelectedOrder(null);
            setRedemptionOption(null);
        }
    };

    if (loading) {
        return <div className="text-gray-500 text-sm p-12 text-center">Loading your received gifts...</div>;
    }

    return (
        <div className="font-body pb-12 relative">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
                <h1 className="text-3xl font-display text-[#0A4535]">Gifts Received</h1>
            </div>

            {/* List / Empty State */}
            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-display text-[#0A4535] mb-2">No gifts received yet</h2>
                    <p className="text-gray-500 text-sm mb-6">Find something meaningful in the marketplace.</p>
                    <Link href="/marketplace" className="inline-block bg-[#0A4535] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-[#073528] transition-colors">
                        Browse Gifts
                    </Link>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-100">
                    {orders.map((order) => {
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

                        let choice = "—";
                        if (status === 'redeemed') {
                            choice = "Kept item";
                        }

                        const senderName = "Michael Chen";
                        const senderCountry = "United States";

                        return (
                            <div 
                                key={order.id} 
                                className="group flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50 transition-colors gap-4 cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 w-full items-center gap-4">
                                    <div className="md:col-span-1">
                                        <div className="text-[#0A4535] text-base font-semibold mb-1">{senderName}</div>
                                        <div className="text-gray-500 text-sm">{senderCountry}</div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="text-gray-700 font-medium text-sm mb-1 truncate pr-4">{order.gift?.name || 'Gift'}</div>
                                        <div className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="font-mono text-gray-900 font-bold text-lg">{formatCurrency(order.gift?.price || 0, order.gift?.currency || 'USD')}</div>
                                    </div>
                                    <div className="md:col-span-1">
                                        <div className="text-gray-500 text-sm font-medium">{choice}</div>
                                    </div>
                                    <div className="md:col-span-1 flex items-center justify-between md:justify-end gap-4 w-full">
                                        <div>{statusUI}</div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity md:block hidden">
                                            <span className="text-[#0A4535] font-bold text-sm hover:underline">
                                                View &rarr;
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Redemption Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="w-full max-w-[560px] bg-white shadow-2xl rounded-3xl relative overflow-hidden p-8 md:p-12">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A4535]"></div>
                        
                        <button 
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => setSelectedOrder(null)}
                        >
                            &times;
                        </button>

                        <div className="mb-2 flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-[#0A4535]"></span>
                            <span className="text-xs uppercase tracking-widest font-bold text-[#0A4535]">GIFT RECEIVED</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-1 font-medium">A gift from Michael Chen</div>
                        <div className="text-3xl font-display text-[#0A4535] mb-6">Michael Chen</div>

                        <div className="h-px bg-gray-200 my-6 w-full"></div>

                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500 font-medium">Item</span>
                            <span className="text-base text-gray-900 font-semibold">{selectedOrder.gift?.name || 'Gift'}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-gray-500 font-medium">Value</span>
                            <span className="font-mono text-xl text-gray-900 font-bold">{formatCurrency(selectedOrder.gift?.price || 0, selectedOrder.gift?.currency || 'USD')}</span>
                        </div>

                        <div className="h-px bg-gray-200 my-6 w-full"></div>

                        <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                            CHOOSE HOW TO RECEIVE
                        </div>

                        <div className="flex flex-col mb-6 gap-3">
                            {[
                                { id: 'physical', title: `Accept the ${selectedOrder.gift?.name || 'item'}`, detail: 'Physical delivery', isMono: false },
                                { id: 'cash', title: `Take $${selectedOrder.gift?.price || 0} as cash`, detail: `${formatCurrency(selectedOrder.gift?.price || 0, 'USD')}`, isMono: true },
                                { id: 'crypto', title: 'Convert to crypto', detail: '≈ 0.0041 BTC', isMono: true }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => setRedemptionOption(opt.id)}
                                    className={`w-full flex items-center justify-between text-left transition-all border p-5 rounded-2xl ${
                                        redemptionOption === opt.id 
                                            ? 'bg-[#F4F0EB] border-[#0A4535] shadow-sm' 
                                            : 'bg-white border-gray-200 hover:border-[#0A4535]'
                                    }`}
                                >
                                    <span className="text-sm text-gray-900 font-bold">{opt.title}</span>
                                    {opt.isMono ? (
                                        <span className="font-mono text-sm font-bold text-gray-600">{opt.detail}</span>
                                    ) : (
                                        <span className="text-xs text-gray-500 font-medium">{opt.detail}</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button 
                            className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors py-4 rounded-full shadow-md"
                            onClick={handleConfirm}
                        >
                            Confirm My Choice
                        </button>
                        
                        <div className="text-center mt-4">
                            <span className="text-xs font-medium text-gray-400">Once confirmed, this cannot be changed.</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
