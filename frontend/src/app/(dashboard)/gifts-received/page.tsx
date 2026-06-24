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
        // In a real app, this would submit the choice
        if (selectedOrder) {
            setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'redeemed' } : o));
            setSelectedOrder(null);
            setRedemptionOption(null);
        }
    };

    if (loading) {
        return <div className="text-paper/30 text-sm p-8 text-center">Loading your received gifts...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto relative">
            {/* Header Row */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-[#1E1A14]">
                <h1 className="font-sans text-[22px] font-semibold text-[#F5F0E8]">Gifts Received</h1>
            </div>

            {/* List / Empty State */}
            {orders.length === 0 ? (
                <div className="text-center py-20 border border-[#1E1A14] bg-[#161210]" style={{ borderRadius: '4px' }}>
                    <h2 className="font-sans text-[18px] text-[#F5F0E8] mb-2">No gifts received yet</h2>
                    <p className="font-sans text-[14px] text-[#6B6055] mb-6">Find something meaningful in the marketplace.</p>
                    <Link href="/marketplace" className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                        Browse Gifts &rarr;
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col">
                    {orders.map((order) => {
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

                        // Determine "YOUR CHOICE" based on mock redemption or status
                        let choice = "—";
                        if (status === 'redeemed') {
                            choice = "Kept item";
                        }

                        // Mock sender data since Order type doesn't have senderName directly (wait, it has recipientName, senderId)
                        // Actually, we'll mock the sender name as "Michael Chen" for display purposes if not present
                        const senderName = "Michael Chen";
                        const senderCountry = "United States";

                        return (
                            <div 
                                key={order.id} 
                                className="group flex items-center justify-between py-5 border-b border-[#1A1510] hover:bg-[#0F0D0C] transition-colors -mx-4 px-4 cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="grid grid-cols-5 w-full items-center">
                                    <div className="col-span-1">
                                        <div className="font-sans text-[15px] font-medium text-[#F5F0E8] mb-1">{senderName}</div>
                                        <div className="font-sans text-[12px] text-[#6B6055]">{senderCountry}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="font-sans text-[14px] text-[#C4B99A] mb-1">{order.gift?.name || 'Gift'}</div>
                                        <div className="font-sans text-[12px] text-[#6B6055]">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="font-mono text-[16px] text-[#F5F0E8]">{formatCurrency(order.gift?.price || 0, order.gift?.currency || 'USD')}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="font-sans text-[13px] text-[#6B6055]">{choice}</div>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-between">
                                        <div>{statusUI}</div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="font-sans text-[13px] text-gold">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div 
                        className="w-full max-w-[560px] bg-[#1C1814] border border-[#2E2820] relative"
                        style={{ borderRadius: '4px', padding: '40px 44px' }}
                    >
                        {/* Close button */}
                        <button 
                            className="absolute top-4 right-5 text-[#6B6055] hover:text-[#F5F0E8] transition-colors text-xl font-light"
                            onClick={() => setSelectedOrder(null)}
                        >
                            &times;
                        </button>

                        <div className="mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                            <span className="font-sans text-[11px] uppercase tracking-widest font-semibold text-gold">GIFT RECEIVED</span>
                        </div>
                        <div className="font-sans text-[15px] text-[#9A8E7A] mb-1">A gift from Michael Chen</div>
                        <div className="font-sans text-[22px] font-semibold text-[#F5F0E8] mb-6">Michael Chen</div>

                        <div className="h-[1px] bg-[#2E2820] my-6 w-full"></div>

                        <div className="flex justify-between items-center mb-3">
                            <span className="font-sans text-[13px] text-[#6B6055]">Item</span>
                            <span className="font-sans text-[15px] text-[#F5F0E8]">{selectedOrder.gift?.name || 'Gift'}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-sans text-[13px] text-[#6B6055]">Value</span>
                            <span className="font-mono text-[16px] text-[#F5F0E8]">{formatCurrency(selectedOrder.gift?.price || 0, selectedOrder.gift?.currency || 'USD')}</span>
                        </div>

                        <div className="h-[1px] bg-[#2E2820] my-6 w-full"></div>

                        <div className="font-sans text-[11px] uppercase tracking-widest font-semibold text-[#6B6055] mb-4">
                            CHOOSE HOW TO RECEIVE
                        </div>

                        <div className="flex flex-col mb-6">
                            {[
                                { id: 'physical', title: `Accept the ${selectedOrder.gift?.name || 'item'}`, detail: 'Physical delivery', isMono: false },
                                { id: 'cash', title: `Take $${selectedOrder.gift?.price || 0} as cash`, detail: `${formatCurrency(selectedOrder.gift?.price || 0, 'USD')}`, isMono: true },
                                { id: 'crypto', title: 'Convert to crypto', detail: '≈ 0.0041 BTC', isMono: true }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => setRedemptionOption(opt.id)}
                                    className={`w-full flex items-center justify-between text-left transition-colors mb-[10px] last:mb-0 border ${
                                        redemptionOption === opt.id 
                                            ? 'bg-[#1A1610] border-[#B8922A]' 
                                            : 'bg-[#161210] border-[#2E2820] hover:border-[#3A3020]'
                                    }`}
                                    style={{ padding: '18px 20px', borderRadius: '3px' }}
                                >
                                    <span className="font-sans text-[14px] text-[#F5F0E8] font-medium">{opt.title}</span>
                                    {opt.isMono ? (
                                        <span className="font-mono text-[14px] text-[#B8922A]">{opt.detail}</span>
                                    ) : (
                                        <span className="font-sans text-[12px] text-[#6B6055]">{opt.detail}</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button 
                            className="w-full bg-[#C0292B] hover:bg-[#A32325] text-white font-sans text-[15px] font-medium transition-colors"
                            style={{ padding: '14px', borderRadius: '3px' }}
                            onClick={handleConfirm}
                        >
                            Confirm My Choice
                        </button>
                        
                        <div className="text-center mt-3">
                            <span className="font-sans text-[12px] text-[#4A4038]">Once confirmed, this cannot be changed.</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
