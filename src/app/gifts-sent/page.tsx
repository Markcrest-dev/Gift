'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { useState } from 'react';

export default function GiftsSentPage() {
    const [filter, setFilter] = useState('all');

    const sentGifts = [
        {
            id: '1',
            recipientName: 'Sarah Johnson',
            recipientEmail: 'sarah@example.com',
            giftName: 'iPhone 15 Pro',
            amount: 999,
            status: 'delivered',
            sentDate: '2024-12-15',
            emoji: '📱'
        },
        {
            id: '2',
            recipientName: 'Michael Chen',
            recipientEmail: 'michael@example.com',
            giftName: 'AirPods Pro',
            amount: 249,
            status: 'pending',
            sentDate: '2024-12-16',
            emoji: '🎧'
        },
        {
            id: '3',
            recipientName: 'Emma Rodriguez',
            recipientEmail: 'emma@example.com',
            giftName: 'Designer Handbag',
            amount: 599,
            status: 'redeemed',
            sentDate: '2024-12-14',
            emoji: '👜'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'redeemed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Gifts Sent</h1>
                            <p className="text-gray-600">Track all the gifts you've sent</p>
                        </div>

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none"
                        >
                            <option value="all">All Gifts</option>
                            <option value="delivered">Delivered</option>
                            <option value="pending">Pending</option>
                            <option value="redeemed">Redeemed</option>
                        </select>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#C41E3A] mb-1">24</div>
                                <div className="text-sm text-gray-600">Total Sent</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">18</div>
                                <div className="text-sm text-gray-600">Delivered</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-600 mb-1">3</div>
                                <div className="text-sm text-gray-600">Pending</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-1">15</div>
                                <div className="text-sm text-gray-600">Redeemed</div>
                            </div>
                        </Card>
                    </div>

                    {/* Gifts List */}
                    <div className="space-y-4">
                        {sentGifts.map((gift) => (
                            <Card key={gift.id} hover>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <div className="text-4xl">{gift.emoji}</div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                            <h3 className="text-xl font-heading font-bold">{gift.giftName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(gift.status)} w-fit`}>
                                                {gift.status.charAt(0).toUpperCase() + gift.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Recipient:</span>
                                                <p className="font-semibold">{gift.recipientName}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Email:</span>
                                                <p className="font-semibold">{gift.recipientEmail}</p>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Amount:</span>
                                                <p className="font-semibold text-[#C41E3A]">${gift.amount}</p>
                                            </div>
                                        </div>

                                        <div className="mt-3 text-xs text-gray-500">
                                            Sent on {new Date(gift.sentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col gap-2">
                                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                                            <i className="fas fa-eye mr-2"></i>View
                                        </button>
                                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                                            <i className="fas fa-share mr-2"></i>Share
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
