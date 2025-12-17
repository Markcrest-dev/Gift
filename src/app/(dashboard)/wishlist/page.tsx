'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock Data
const MOCK_WISHLIST = [
    { id: 101, name: 'Sony WH-1000XM5', price: 349.99, image: 'https://placehold.co/300x300?text=Headphones', currency: 'USD', category: "Electronics", rating: 4.8 },
    { id: 102, name: 'Kindle Paperwhite', price: 139.99, image: 'https://placehold.co/300x300?text=Kindle', currency: 'USD', category: "Electronics", rating: 4.7 },
    { id: 103, name: 'Nespresso Vertuo', price: 199.00, image: 'https://placehold.co/300x300?text=Coffee', currency: 'USD', category: "Home", rating: 4.5 },
    { id: 104, name: 'Apple AirTag 4-Pack', price: 99.00, image: 'https://placehold.co/300x300?text=AirTag', currency: 'USD', category: "Electronics", rating: 4.9 },
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setWishlist(MOCK_WISHLIST);
            setLoading(false);
        }, 800);
    }, []);

    const removeFromWishlist = (id: number) => {
        setWishlist(wishlist.filter(item => item.id !== id));
        // In a real app, you'd show a toast here
        alert('Removed from wishlist');
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
    };

    if (loading) {
        return <div className="p-xl text-center">Loading your wishlist...</div>;
    }

    return (
        <>
            <div className="page-header fade-in-up">
                <div>
                    <h1 className="page-title">My Wishlist <i className="fas fa-star text-yellow-400"></i></h1>
                    <p className="page-subtitle">Your favorite gifts in one place</p>
                </div>
                <div>
                    <Link href="/marketplace" className="btn btn-primary">Browse More Gifts</Link>
                </div>
            </div>

            <div id="wishlistContainer">
                {wishlist.length === 0 ? (
                    <div className="empty-state fade-in-up">
                        <div className="empty-icon"><i className="fas fa-star"></i></div>
                        <h3 className="empty-title">Your wishlist is empty</h3>
                        <p className="empty-text">
                            Start adding gifts you love to your wishlist!<br />
                            Browse our marketplace and click the star icon on any gift.
                        </p>
                        <Link href="/marketplace" className="btn btn-primary">Browse Gifts</Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((gift, index) => (
                            <div key={gift.id} className={`wishlist-card fade-in-up stagger-${(index % 4) + 1}`}>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromWishlist(gift.id)}
                                    title="Remove from wishlist"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                                <img src={gift.image} alt={gift.name} className="wishlist-card-image" />
                                <div className="wishlist-card-content">
                                    <div className="wishlist-card-category">{gift.category}</div>
                                    <h3 className="wishlist-card-title">{gift.name}</h3>
                                    <div className="wishlist-card-price">
                                        {formatCurrency(gift.price, gift.currency)}
                                    </div>
                                    {gift.rating && (
                                        <div className="rating">
                                            <div className="stars text-yellow-400">
                                                {'★'.repeat(Math.round(gift.rating))}
                                                {'☆'.repeat(5 - Math.round(gift.rating))}
                                            </div>
                                            <span className="rating-count">({gift.rating})</span>
                                        </div>
                                    )}
                                    <div className="card-actions">
                                        <Link href={`/gift/${gift.id}`} className="btn btn-primary flex-1 text-center">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
