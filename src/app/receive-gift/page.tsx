'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ReceiveGiftPage() {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const redemptionMethods = [
        {
            id: 'physical',
            icon: 'fa-box',
            title: 'Physical Delivery',
            description: 'Receive the gift at your address',
            color: 'text-blue-600'
        },
        {
            id: 'cash',
            icon: 'fa-money-bill-wave',
            title: 'Cash Value',
            description: 'Get the cash equivalent to your bank account',
            color: 'text-green-600'
        },
        {
            id: 'crypto',
            icon: 'fa-bitcoin',
            title: 'Cryptocurrency',
            description: 'Receive value in Bitcoin, Ethereum, or other crypto',
            color: 'text-orange-500'
        },
        {
            id: 'charity',
            icon: 'fa-heart',
            title: 'Donate to Charity',
            description: 'Donate the value to a charity of your choice',
            color: 'text-red-600'
        }
    ];

    const handleSelectMethod = (methodId: string) => {
        setSelectedMethod(methodId);
        setShowForm(true);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="container max-w-4xl">
                    {/* Gift Display */}
                    <Card className="mb-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🎁</div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                                You've Received a Gift!
                            </h1>
                            <p className="text-xl text-gray-600 mb-4">
                                From: <span className="font-semibold text-[#C41E3A]">Sarah Johnson</span>
                            </p>
                            <div className="bg-gray-50 rounded-lg p-6 my-6 max-w-2xl mx-auto">
                                <p className="text-gray-700 italic">
                                    "Merry Christmas! Hope you love this gift. You deserve all the happiness in the world! ❤️"
                                </p>
                            </div>
                            <div className="text-2xl font-bold text-[#C41E3A]">Gift Value: $299.00</div>
                        </div>
                    </Card>

                    {/* Redemption Options */}
                    {!showForm && (
                        <div>
                            <h2 className="text-2xl font-heading font-bold mb-6 text-center">
                                Choose How You'd Like to Receive This Gift
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {redemptionMethods.map((method) => (
                                    <Card
                                        key={method.id}
                                        hover
                                        className="cursor-pointer"
                                        onClick={() => handleSelectMethod(method.id)}
                                    >
                                        <div className="text-center">
                                            <i className={`fas ${method.icon} text-5xl mb-4 ${method.color}`}></i>
                                            <h3 className="text-xl font-heading font-bold mb-2">{method.title}</h3>
                                            <p className="text-gray-600">{method.description}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Redemption Form */}
                    {showForm && selectedMethod && (
                        <Card>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-600 hover:text-gray-900 mb-6 flex items-center"
                            >
                                <i className="fas fa-arrow-left mr-2"></i> Back to options
                            </button>

                            <h2 className="text-2xl font-heading font-bold mb-6">
                                {redemptionMethods.find(m => m.id === selectedMethod)?.title}
                            </h2>

                            <form className="space-y-6">
                                {selectedMethod === 'physical' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Street Address
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent outline-none"
                                                placeholder="123 Main St"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Zip Code</label>
                                                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none" required />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {selectedMethod === 'cash' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                                            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                                            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none" required />
                                        </div>
                                    </>
                                )}

                                {selectedMethod === 'crypto' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Select Cryptocurrency
                                            </label>
                                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none">
                                                <option value="BTC">Bitcoin (BTC)</option>
                                                <option value="ETH">Ethereum (ETH)</option>
                                                <option value="USDT">Tether (USDT)</option>
                                                <option value="BNB">Binance Coin (BNB)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet Address</label>
                                            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none" required />
                                        </div>
                                    </>
                                )}

                                {selectedMethod === 'charity' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Select Charity
                                            </label>
                                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] outline-none">
                                                <option value="red-cross">Red Cross</option>
                                                <option value="unicef">UNICEF</option>
                                                <option value="world-vision">World Vision</option>
                                                <option value="doctors-without-borders">Doctors Without Borders</option>
                                                <option value="feeding-america">Feeding America</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <Button type="submit" size="lg" fullWidth>
                                    <i className="fas fa-check mr-2"></i> Confirm Redemption
                                </Button>
                            </form>
                        </Card>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
