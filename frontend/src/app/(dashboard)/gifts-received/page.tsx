'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock Data
const MOCK_RECEIVED_GIFTS = [
    {
        id: 1,
        giftData: { name: "Birthday Surprise Box", price: 50.00, currency: "USD", image: "https://placehold.co/300x200?text=Surprise" },
        claimedAt: "2023-11-15",
        redemptionType: "giftCard",
        redemptionDetails: { brand: "Amazon" }
    },
    {
        id: 2,
        giftData: { name: "Christmas Bonus", price: 100.00, currency: "USD", image: "https://placehold.co/300x200?text=Money" },
        claimedAt: "2023-12-25",
        redemptionType: "crypto",
        redemptionDetails: { address: "0x123...abc" }
    }
];

export default function GiftsReceivedPage() {
    const [gifts, setGifts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setGifts(MOCK_RECEIVED_GIFTS);
            setLoading(false);
        }, 800);
    }, []);

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
    };

    const getRedemptionLabel = (type: string) => {
        switch (type) {
            case 'email': return '📧 Email';
            case 'whatsapp': return '💬 WhatsApp';
            case 'crypto': return '₿ Crypto';
            case 'giftCard': return '🎟️ Gift Card';
            default: return '📦 Physical';
        }
    };

    if (loading) {
        return <div className="p-xl text-center">Loading your received gifts...</div>;
    }

    return (
        <>
            <div className="page-header fade-in-up">
                <h1 className="page-title">Gifts Received 📥</h1>
                <p className="page-subtitle">All the wonderful gifts you&apos;ve claimed</p>
            </div>

            <div id="giftsContainer">
                {gifts.length === 0 ? (
                    <div className="empty-state fade-in-up">
                        <div className="empty-icon">🎁</div>
                        <h3 className="empty-title">No gifts received yet</h3>
                        <p className="empty-text">
                            When someone sends you a gift, it will appear here.<br />
                            Share your wishlist or gift code with friends and family!
                        </p>
                        <Link href="/marketplace" className="btn btn-primary">Claim a Gift</Link>
                    </div>
                ) : (
                    <div className="gifts-grid">
                        {gifts.map((item, index) => (
                            <div key={item.id} className={`gift-card fade-in-up stagger-${(index % 4) + 1}`}>
                                <img
                                    src={item.giftData.image}
                                    alt={item.giftData.name}
                                    className="gift-card-image"
                                />
                                <div className="gift-card-content">
                                    <h3 className="gift-card-title">{item.giftData.name}</h3>
                                    <div className="gift-card-meta">
                                        <div className="meta-row">
                                            <span>📅</span>
                                            <span>{item.claimedAt}</span>
                                        </div>
                                        <div className="meta-row">
                                            <span>💰</span>
                                            <span>{formatCurrency(item.giftData.price, item.giftData.currency)}</span>
                                        </div>
                                    </div>

                                    <div className="redemption-info">
                                        <div className="redemption-type">{getRedemptionLabel(item.redemptionType)}</div>
                                        {item.redemptionDetails && (
                                            <div className="redemption-details">
                                                {item.redemptionType === 'crypto' && `Wallet: ${item.redemptionDetails.address}`}
                                                {item.redemptionType === 'giftCard' && `Brand: ${item.redemptionDetails.brand}`}
                                            </div>
                                        )}
                                    </div>

                                    <Link href={`/gift/${item.id}`} className="btn btn-outline w-full text-center block mt-md">View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
