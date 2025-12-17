'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function GiftsReceivedPage() {
    const receivedGifts = [
        {
            id: '1',
            senderName: 'John Smith',
            giftName: 'Apple Watch Series 9',
            amount: 399,
            status: 'unclaimed',
            receivedDate: '2024-12-16',
            message: 'Happy Birthday! Hope you enjoy this gift!',
            emoji: '⌚'
        },
        {
            id: '2',
            senderName: 'Anonymous',
            giftName: 'Amazon Gift Card',
            amount: 100,
            status: 'redeemed',
            receivedDate: '2024-12-15',
            redemptionMethod: 'Cash',
            emoji: '🎁'
        },
        {
            id: '3',
            senderName: 'Lisa Anderson',
            giftName: 'Spa Day Package',
            amount: 299,
            status: 'redeemed',
            receivedDate: '2024-12-14',
            redemptionMethod: 'Physical Delivery',
            emoji: '💆'
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Gifts Received</h1>
                        <p className="text-gray-600">Manage all the gifts you've received</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#C41E3A] mb-1">12</div>
                                <div className="text-sm text-gray-600">Total Received</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-600 mb-1">3</div>
                                <div className="text-sm text-gray-600">Unclaimed</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">9</div>
                                <div className="text-sm text-gray-600">Redeemed</div>
                            </div>
                        </Card>
                    </div>

                    {/* Gifts List */}
                    <div className="space-y-4">
                        {receivedGifts.map((gift) => (
                            <Card key={gift.id} hover>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <div className="text-4xl">{gift.emoji}</div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                            <h3 className="text-xl font-heading font-bold">{gift.giftName}</h3>
                                            <span className="text-2xl font-bold text-[#C41E3A]">${gift.amount}</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <span className="text-sm text-gray-600">From:</span>
                                                <p className="font-semibold">{gift.senderName}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-600">Received:</span>
                                                <p className="font-semibold">
                                                    {new Date(gift.receivedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        {gift.message && (
                                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                                                <p className="text-sm italic text-gray-700">"{gift.message}"</p>
                                            </div>
                                        )}

                                        {gift.status === 'redeemed' && gift.redemptionMethod && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <i className="fas fa-check-circle text-green-500"></i>
                                                <span className="text-gray-600">Redeemed as: <span className="font-semibold">{gift.redemptionMethod}</span></span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex md:flex-col gap-2">
                                        {gift.status === 'unclaimed' ? (
                                            <Button size="md">
                                                <i className="fas fa-gift mr-2"></i>Claim Gift
                                            </Button>
                                        ) : (
                                            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                                                <i className="fas fa-eye mr-2"></i>View Details
                                            </button>
                                        )}
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
