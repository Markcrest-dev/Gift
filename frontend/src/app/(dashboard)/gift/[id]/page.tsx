'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftsApi, wishlistFlow } from '@/lib/giftFlow';
import { auth } from '@/lib/auth';

export default function GiftDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [gift, setGift] = useState<Gift | null>(null);
    const [relatedGifts, setRelatedGifts] = useState<Gift[]>([]);
    const [loading, setLoading] = useState(true);
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        const loadGift = async () => {
            try {
                const id = params.id as string;
                const foundGift = await giftsApi.getById(id);
                setGift(foundGift);

                const related = await giftsApi.getAll({ category: foundGift.category });
                setRelatedGifts(related.filter(g => g.id !== foundGift.id).slice(0, 4));

                if (auth.isAuthenticated()) {
                    const isWished = await wishlistFlow.isInWishlist(id);
                    setInWishlist(isWished);
                }
            } catch {
                router.push('/marketplace');
            }
            setLoading(false);
        };

        loadGift();
    }, [params.id, router]);

    const handleWishlist = async () => {
        if (!auth.isAuthenticated()) {
            router.push('/login');
            return;
        }
        if (!gift) return;

        try {
            if (inWishlist) {
                const wishlist = await wishlistFlow.getWishlist();
                const item = wishlist.find(w => w.giftId === gift.id);
                if (item) {
                    await wishlistFlow.removeFromWishlist(item.id);
                    setInWishlist(false);
                }
            } else {
                await wishlistFlow.addToWishlist(gift.id);
                setInWishlist(true);
            }
        } catch (error) {
            console.error('Wishlist error:', error);
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    };

    if (loading) {
        return <div className="p-xl text-center">Loading gift details...</div>;
    }

    if (!gift) return null;

    return (
        <div className="detail-container page-transition">
            <nav className="breadcrumb fade-in-up">
                <Link href="/" className="breadcrumb-item">Home</Link>
                <span className="breadcrumb-separator">{' > '}</span>
                <Link href="/marketplace" className="breadcrumb-item">Marketplace</Link>
                <span className="breadcrumb-separator">{' > '}</span>
                <span className="breadcrumb-item active">{gift.name}</span>
            </nav>

            <div className="gift-detail-grid">
                <div className="gift-image-section fade-in-left">
                    <div className="gift-main-image">
                        {gift.emoji || '🎁'}
                    </div>
                </div>

                <div className="gift-info-section fade-in-right">
                    <span className="badge badge-red gift-category-badge capitalize">{gift.category}</span>
                    <h1 className="gift-title">{gift.name}</h1>

                    <div className="gift-rating">
                        <span className="stars">{'*'.repeat(Math.round(gift.rating))}</span>
                        <span className="rating-text">{gift.rating} ({gift.reviews} reviews)</span>
                    </div>

                    <div className="gift-price">{formatCurrency(gift.price, gift.currency)}</div>
                    <p className="gift-description">{gift.description}</p>

                    <div className="gift-specs">
                        <div className="spec-row">
                            <span className="spec-label">Category:</span>
                            <span className="spec-value capitalize">{gift.category}</span>
                        </div>
                        <div className="spec-row">
                            <span className="spec-label">Gender:</span>
                            <span className="spec-value capitalize">{gift.gender}</span>
                        </div>
                    </div>

                    <div className="gift-actions">
                        <Button variant="primary" size="lg" className="w-full" onClick={() => router.push(`/send-gift?id=${gift.id}`)}>
                            Send This Gift
                        </Button>
                        <Button variant={inWishlist ? 'secondary' : 'outline'} size="lg" className="w-full" onClick={handleWishlist}>
                            {inWishlist ? 'In Wishlist' : 'Wishlist'}
                        </Button>
                    </div>
                </div>
            </div>

            {relatedGifts.length > 0 && (
                <div className="related-gifts fade-in-up">
                    <div className="related-gifts-header">
                        <h2>You May Also Like</h2>
                        <p className="text-secondary">Similar gifts in this category</p>
                    </div>
                    <div className="related-gifts-grid">
                        {relatedGifts.map((relatedGift) => (
                            <Link key={relatedGift.id} href={`/gift/${relatedGift.id}`} className="product-card-link">
                                <div className="card">
                                    <div className="product-card-emoji">
                                        {relatedGift.emoji || '🎁'}
                                    </div>
                                    <div className="card-body product-card-body">
                                        <h3 className="product-card-name">{relatedGift.name}</h3>
                                        <div className="product-card-price">{formatCurrency(relatedGift.price, relatedGift.currency)}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
