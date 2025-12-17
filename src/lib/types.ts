// User Types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
}

// Gift Types
export interface Gift {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: 'electronics' | 'fashion' | 'toys' | 'experiences' | 'gift-cards' | 'home' | 'books';
    gender: 'male' | 'female' | 'unisex';
    rating: number;
    reviews: number;
    imageUrl?: string;
    emoji?: string;
}

// Order Types
export interface Order {
    id: string;
    senderId: string;
    recipientEmail: string;
    recipientName: string;
    giftId: string;
    gift: Gift;
    message: string;
    deliveryDate?: Date;
    anonymous: boolean;
    status: 'pending' | 'sent' | 'received' | 'redeemed';
    paymentMethod: 'card' | 'paypal' | 'crypto';
    totalAmount: number;
    serviceFee: number;
    createdAt: Date;
}

// Redemption Types
export type RedemptionMethod = 'physical' | 'cash' | 'crypto' | 'charity';

export interface Redemption {
    id: string;
    orderId: string;
    method: RedemptionMethod;
    status: 'pending' | 'processing' | 'completed';
    details: PhysicalRedemption | CashRedemption | CryptoRedemption | CharityRedemption;
    completedAt?: Date;
}

export interface PhysicalRedemption {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface CashRedemption {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
}

export interface CryptoRedemption {
    cryptocurrency: 'BTC' | 'ETH' | 'USDT' | 'BNB';
    walletAddress: string;
}

export interface CharityRedemption {
    charityName: string;
    charityId: string;
}

// Wishlist Types
export interface WishlistItem {
    id: string;
    userId: string;
    giftId: string;
    gift: Gift;
    addedAt: Date;
}

// Notification Types
export interface Notification {
    id: string;
    userId: string;
    type: 'gift_sent' | 'gift_received' | 'redemption_complete' | 'wishlist_update';
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
}
