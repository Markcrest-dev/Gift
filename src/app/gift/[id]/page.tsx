'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function GiftDetailPage() {
    const [quantity, setQuantity] = useState(1);

    const gift = {
        id: '1',
        name: 'iPhone 15 Pro',
        price: 999,
        emoji: '📱',
        description: 'The latest flagship smartphone with advanced camera system and A17 Pro chip.',
        rating: 5,
        reviews: 234,
        category: 'Electronics',
        inStock: true,
        features: [
            'A17 Pro chip for incredible performance',
            'Pro camera system with 48MP Main',
            'Titanium design with Action button',
            'Up to 29 hours video playback',
            'Emergency SOS via satellite'
        ]
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-600 mb-6">
                        <a href="/marketplace" className="hover:text-[#C41E3A]">Marketplace</a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{gift.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        {/* Image Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                                <div className="text-9xl">{gift.emoji}</div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{gift.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fas fa-star ${i < gift.rating ? 'text-[#FFD700]' : 'text-gray-300'}`}></i>
                                    ))}
                                </div>
                                <span className="text-gray-600">({gift.reviews} reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="text-4xl font-bold text-[#C41E3A] mb-6">${gift.price}</div>

                            {/* Description */}
                            <p className="text-gray-700 leading-relaxed mb-6">{gift.description}</p>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className={`w-3 h-3 rounded-full ${gift.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className={gift.inStock ? 'text-green-600' : 'text-red-600'}>
                                    {gift.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Quantity:</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-[#C41E3A] transition-colors"
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-20 text-center px-4 py-2 border-2 border-gray-300 rounded-lg"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-[#C41E3A] transition-colors"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Button size="lg" fullWidth>
                                    <i className="fas fa-gift mr-2"></i> Send This Gift
                                </Button>
                                <Button variant="outline" size="lg" fullWidth>
                                    <i className="fas fa-heart mr-2"></i> Add to Wishlist
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="font-heading font-bold text-lg mb-4">Key Features</h3>
                                <ul className="space-y-2">
                                    {gift.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <i className="fas fa-check text-green-600 mt-1"></i>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                        <h2 className="text-2xl font-heading font-bold mb-6">Customer Reviews</h2>

                        <div className="space-y-6">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className="fas fa-star text-[#FFD700]"></i>
                                        ))}
                                    </div>
                                    <p className="font-semibold mb-1">Amazing product!</p>
                                    <p className="text-gray-600 mb-2">
                                        This is an excellent gift. The recipient absolutely loved it. Highly recommend!
                                    </p>
                                    <p className="text-sm text-gray-500">- John D., 2 days ago</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Products */}
                    <div>
                        <h2 className="text-2xl font-heading font-bold mb-6">Related Gifts</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {['🎧', '⌚', '💻', '📷'].map((emoji, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                        <div className="text-6xl">{emoji}</div>
                                    </div>
                                    <h3 className="font-semibold mb-2">Related Product {index + 1}</h3>
                                    <p className="text-[#C41E3A] font-bold">${199 + index * 50}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
