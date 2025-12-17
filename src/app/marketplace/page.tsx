'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <section className="bg-gradient-to-br from-[#C41E3A] to-[#8B0000] text-white py-12">
                    <div className="container">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Gift Marketplace</h1>
                        <p className="text-lg md:text-xl text-white/95">Browse our curated collection of premium gifts</p>
                    </div>
                </section>

                <div className="container py-8 md:py-12">
                    {/* Search and Filters */}
                    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search gifts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent outline-none"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent outline-none"
                            >
                                <option value="all">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="toys">Toys</option>
                                <option value="experiences">Experiences</option>
                                <option value="gift-cards">Gift Cards</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sampleGifts.map((gift) => (
                            <div key={gift.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden group">
                                <div className="aspect-square bg-gray-200 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                        {gift.emoji}
                                    </div>
                                    <div className="absolute top-4 right-4 bg-[#C41E3A] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        ${gift.price}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-[#C41E3A] transition-colors">
                                        {gift.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{gift.description}</p>
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fas fa-star text-sm ${i < gift.rating ? 'text-[#FFD700]' : 'text-gray-300'}`}></i>
                                        ))}
                                        <span className="text-sm text-gray-500 ml-2">({gift.reviews})</span>
                                    </div>
                                    <button className="w-full bg-[#C41E3A] text-white py-2.5 rounded-lg font-semibold hover:bg-[#8B0000] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

const sampleGifts = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999,
        emoji: "📱",
        description: "Latest flagship smartphone with advanced camera system",
        rating: 5,
        reviews: 234,
        category: "electronics"
    },
    {
        id: 2,
        name: "AirPods Pro",
        price: 249,
        emoji: "🎧",
        description: "Premium wireless earbuds with active noise cancellation",
        rating: 5,
        reviews: 512,
        category: "electronics"
    },
    {
        id: 3,
        name: "Designer Handbag",
        price: 599,
        emoji: "👜",
        description: "Luxury leather handbag for the fashion-forward",
        rating: 4,
        reviews: 89,
        category: "fashion"
    },
    {
        id: 4,
        name: "LEGO Boost Kit",
        price: 159,
        emoji: "🧱",
        description: "Creative robotics building set for kids",
        rating: 5,
        reviews: 156,
        category: "toys"
    },
    {
        id: 5,
        name: "Spa Day Package",
        price: 299,
        emoji: "💆",
        description: "Relaxing full-day spa experience",
        rating: 5,
        reviews: 203,
        category: "experiences"
    },
    {
        id: 6,
        name: "Amazon Gift Card",
        price: 100,
        emoji: "🎁",
        description: "Digital gift card for endless shopping",
        rating: 5,
        reviews: 1024,
        category: "gift-cards"
    },
    {
        id: 7,
        name: "Apple Watch",
        price: 399,
        emoji: "⌚",
        description: "Smart watch with health and fitness tracking",
        rating: 5,
        reviews: 345,
        category: "electronics"
    },
    {
        id: 8,
        name: "Perfume Set",
        price: 129,
        emoji: "🌸",
        description: "Premium fragrance collection",
        rating: 4,
        reviews: 78,
        category: "fashion"
    }
];
