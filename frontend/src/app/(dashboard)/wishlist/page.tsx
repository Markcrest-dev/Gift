'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WishlistItem } from '@/lib/types';
import { wishlistFlow } from '@/lib/giftFlow';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        wishlistFlow.getWishlist()
            .then(setWishlist)
            .catch((err) => console.error('Failed to load wishlist:', err))
            .finally(() => setLoading(false));
    }, []);

    const removeFromWishlist = async (id: string) => {
        try {
            await wishlistFlow.removeFromWishlist(id);
            setWishlist(wishlist.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
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
                        {wishlist.map((item, index) => (
                            <div key={item.id} className={`wishlist-card fade-in-up stagger-${(index % 4) + 1}`}>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromWishlist(item.id)}
                                    title="Remove from wishlist"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                                <div className="wishlist-card-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', background: 'var(--cream)', height: '200px' }}>
                                    {item.gift?.emoji || '🎁'}
                                </div>
                                <div className="wishlist-card-content">
                                    <div className="wishlist-card-category capitalize">{item.gift?.category}</div>
                                    <h3 className="wishlist-card-title">{item.gift?.name}</h3>
                                    <div className="wishlist-card-price">
                                        {formatCurrency(item.gift?.price || 0, item.gift?.currency || 'USD')}
                                    </div>
                                    {item.gift?.rating && (
                                        <div className="rating">
                                            <div className="stars text-yellow-400">
                                                {'*'.repeat(Math.round(item.gift.rating))}
                                            </div>
                                            <span className="rating-count">({item.gift.rating})</span>
                                        </div>
                                    )}
                                    <div className="card-actions">
                                        <Link href={`/gift/${item.giftId}`} className="btn btn-primary flex-1 text-center">
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
