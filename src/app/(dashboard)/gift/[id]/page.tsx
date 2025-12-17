'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

// Mock Data (Shared source ideally, but duplicated for now to ensure self-containment)
const MOCK_GIFTS = [
    { id: 1, name: "Wireless Noise Cancelling Headphones", price: 299.99, image: "https://placehold.co/600x600?text=Headphones", category: "Electronics", rating: 4.8, reviews: 1250, description: "Experience music like never before with industry-leading noise cancellation.", gender: ["male", "female"], ageRange: "12+", inStock: true, currency: "USD" },
    { id: 2, name: "Premium Coffee Maker", price: 149.50, image: "https://placehold.co/600x600?text=Coffee+Maker", category: "Home & Kitchen", rating: 4.6, reviews: 850, description: "Brew the perfect cup every morning with this programmable coffee maker.", gender: ["male", "female"], ageRange: "18+", inStock: true, currency: "USD" },
    { id: 3, name: "Luxury Skincare Set", price: 89.00, image: "https://placehold.co/600x600?text=Skincare", category: "Beauty", rating: 4.9, reviews: 520, description: "Rejuvenate your skin with this complete luxury set.", gender: ["female"], ageRange: "16+", inStock: true, currency: "USD" },
    { id: 4, name: "Smart Watch Series 7", price: 399.00, image: "https://placehold.co/600x600?text=Smart+Watch", category: "Electronics", rating: 4.7, reviews: 2100, description: "Stay connected and active with the latest smartwatch technology.", gender: ["male", "female"], ageRange: "12+", inStock: true, currency: "USD" },
    { id: 5, name: "Organic Tea Collection", price: 45.00, image: "https://placehold.co/600x600?text=Tea+Set", category: "Food & Drink", rating: 4.5, reviews: 320, description: "A selection of the finest organic teas from around the world.", gender: ["male", "female"], ageRange: "18+", inStock: true, currency: "USD" },
    { id: 6, name: "Portable Bluetooth Speaker", price: 79.99, image: "https://placehold.co/600x600?text=Speaker", category: "Electronics", rating: 4.4, reviews: 890, description: "Take your music anywhere with this rugged, waterproof speaker.", gender: ["male", "female"], ageRange: "10+", inStock: true, currency: "USD" },
    { id: 7, name: "Yoga Mat & Accessories", price: 65.00, image: "https://placehold.co/600x600?text=Yoga+Set", category: "Fitness", rating: 4.7, reviews: 450, description: "Everything you need for your yoga practice in one kit.", gender: ["male", "female"], ageRange: "12+", inStock: true, currency: "USD" },
    { id: 8, name: "Gourmet Chocolate Box", price: 34.99, image: "https://placehold.co/600x600?text=Chocolates", category: "Food & Drink", rating: 4.8, reviews: 670, description: "Indulge in these handcrafted gourmet chocolates.", gender: ["male", "female"], ageRange: "All", inStock: true, currency: "USD" },
    { id: 101, name: 'Sony WH-1000XM5', price: 349.99, image: 'https://placehold.co/600x600?text=Headphones', currency: 'USD', category: "Electronics", rating: 4.8, reviews: 1500, description: "Top of the line Sony headphones.", gender: ["male", "female"], ageRange: "12+", inStock: true }, // Wishlist item mock
];

export default function GiftDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [gift, setGift] = useState<any>(null);
    const [relatedGifts, setRelatedGifts] = useState<any[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            const foundGift = MOCK_GIFTS.find(g => g.id === Number(params.id));
            if (foundGift) {
                setGift(foundGift);
                // Find related gifts
                const related = MOCK_GIFTS
                    .filter(g => g.category === foundGift.category && g.id !== foundGift.id)
                    .slice(0, 4);
                setRelatedGifts(related);
            } else {
                // Handle not found
                router.push('/marketplace');
            }
            setLoading(false);
        }, 500);
    }, [params.id, router]);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
    };

    const increaseQuantity = () => setQuantity(q => q + 1);
    const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    if (loading) {
        return <div className="p-xl text-center">Loading gift details...</div>;
    }

    if (!gift) return null;

    return (
        <div className="detail-container page-transition">
            {/* Breadcrumb */}
            <nav className="breadcrumb fade-in-up">
                <Link href="/" className="breadcrumb-item">Home</Link>
                <span className="breadcrumb-separator">{' › '}</span>
                <Link href="/marketplace" className="breadcrumb-item">Marketplace</Link>
                <span className="breadcrumb-separator">{' › '}</span>
                <span className="breadcrumb-item active">{gift.name}</span>
            </nav>

            {/* Gift Detail Grid */}
            <div className="gift-detail-grid">
                {/* Image Section */}
                <div className="gift-image-section fade-in-left">
                    <img src={gift.image} alt={gift.name} className="gift-main-image" />
                    <div className="gift-thumbnails">
                        {[1, 2, 3].map(i => (
                            <img
                                key={i}
                                src={gift.image}
                                alt="Thumbnail"
                                className="gift-thumbnail"
                            />
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="gift-info-section fade-in-right">
                    <span className="badge badge-red gift-category-badge">{gift.category}</span>

                    <h1 className="gift-title">{gift.name}</h1>

                    <div className="gift-rating">
                        <span className="stars">{'⭐'.repeat(Math.round(gift.rating))}</span>
                        <span className="rating-text">{gift.rating} ({gift.reviews} reviews)</span>
                    </div>

                    <div className="gift-price">{formatCurrency(gift.price, gift.currency)}</div>

                    <p className="gift-description">{gift.description}</p>

                    <div className="gift-specs">
                        <div className="spec-row">
                            <span className="spec-label">Category:</span>
                            <span className="spec-value">{gift.category}</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-label">Gender:</span>
                            <span className="spec-value">{gift.gender.join(', ')}</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-label">Age Range:</span>
                            <span className="spec-value">{gift.ageRange}</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-label">Availability:</span>
                            <span className="spec-value">{gift.inStock ? '✓ In Stock' : '✗ Out of Stock'}</span>
                        </div>
                    </div>

                    <div className="quantity-selector">
                        <span className="spec-label">Quantity:</span>
                        <button className="quantity-btn" onClick={decreaseQuantity}>−</button>
                        <span className="quantity-value">{quantity}</span>
                        <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                    </div>

                    <div className="gift-actions">
                        <Button variant="primary" size="lg" className="flex-2" onClick={() => router.push(`/send-gift?id=${gift.id}`)}>
                            🎁 Send This Gift
                        </Button>
                        <Button variant="secondary" size="lg" onClick={() => alert('Request feature coming soon!')}>
                            🙏 Request
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => alert('Added to wishlist!')}>
                            ⭐ Wishlist
                        </Button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section fade-in-up">
                <div className="reviews-header">
                    <h2>Customer Reviews</h2>
                    <span className="text-secondary">{gift.reviews} reviews</span>
                </div>

                <div id="reviewsList">
                    <div className="review-card">
                        <div className="review-header">
                            <span className="reviewer-name">Sarah Johnson</span>
                            <span className="review-date">2 days ago</span>
                        </div>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                        <p className="review-text">Absolutely love this gift! The quality exceeded my expectations and the recipient was thrilled!</p>
                    </div>
                    <div className="review-card">
                        <div className="review-header">
                            <span className="reviewer-name">Michael Chen</span>
                            <span className="review-date">1 week ago</span>
                        </div>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                        <p className="review-text">Great product, fast delivery. Highly recommend for anyone looking for the perfect gift.</p>
                    </div>
                </div>
            </div>

            {/* Related Gifts */}
            <div className="related-gifts fade-in-up">
                <div className="related-gifts-header">
                    <h2>You May Also Like</h2>
                    <p className="text-secondary">Similar gifts in this category</p>
                </div>

                <div className="related-gifts-grid">
                    {relatedGifts.map((relatedGift) => (
                        <div key={relatedGift.id} className="gift-card hover-lift">
                            <div className="gift-card-image">
                                <img src={relatedGift.image} alt={relatedGift.name} className="card-image w-full h-48 object-contain bg-[var(--cream)]" />
                                <span className="gift-card-badge badge-red absolute top-2 right-2">{relatedGift.category}</span>
                            </div>
                            <div className="card-body p-4">
                                <h3 className="card-title font-semibold mb-2">{relatedGift.name}</h3>
                                <div className="gift-card-meta flex justify-between mb-2">
                                    <span className="gift-card-price text-red font-bold">{formatCurrency(relatedGift.price, relatedGift.currency)}</span>
                                </div>
                                <Link href={`/gift/${relatedGift.id}`} className="btn btn-primary w-full btn-sm text-center block">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
