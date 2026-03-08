import { Order, Redemption, WishlistItem } from './types';
import { storage, STORAGE_KEYS } from './storage';

// Gift Sending Functions
export const giftFlow = {
    // Send a gift
    sendGift: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
        const newOrder: Order = {
            ...orderData,
            id: generateOrderId(),
            status: 'pending',
            createdAt: new Date()
        };

        // Get existing sent gifts
        const sentGifts = storage.getItem<Order[]>(STORAGE_KEYS.SENT_GIFTS) || [];

        // Add new order
        sentGifts.push(newOrder);

        // Save to localStorage
        storage.setItem(STORAGE_KEYS.SENT_GIFTS, sentGifts);

        return newOrder;
    },

    // Get all sent gifts
    getSentGifts: (): Order[] => {
        return storage.getItem<Order[]>(STORAGE_KEYS.SENT_GIFTS) || [];
    },

    // Redeem a gift
    redeemGift: (orderId: string, redemptionData: Omit<Redemption, 'id'>): Redemption => {
        const newRedemption: Redemption = {
            ...redemptionData,
            id: generateRedemptionId()
        };

        // Get existing redemptions
        const redemptions = storage.getItem<Redemption[]>(STORAGE_KEYS.GIFT_CLAIMS) || [];

        // Add new redemption
        redemptions.push(newRedemption);

        // Save to localStorage
        storage.setItem(STORAGE_KEYS.GIFT_CLAIMS, redemptions);

        return newRedemption;
    },

    // Get all redemptions
    getRedemptions: (): Redemption[] => {
        return storage.getItem<Redemption[]>(STORAGE_KEYS.GIFT_CLAIMS) || [];
    }
};

// Wishlist Functions
export const wishlistFlow = {
    // Add to wishlist
    addToWishlist: (giftId: string, gift: any): WishlistItem => {
        const wishlistItem: WishlistItem = {
            id: generateWishlistItemId(),
            userId: 'current-user', // In real app, get from auth
            giftId,
            gift,
            addedAt: new Date()
        };

        const wishlist = storage.getItem<WishlistItem[]>(STORAGE_KEYS.WISHLIST) || [];
        wishlist.push(wishlistItem);
        storage.setItem(STORAGE_KEYS.WISHLIST, wishlist);

        return wishlistItem;
    },

    // Remove from wishlist
    removeFromWishlist: (wishlistItemId: string): void => {
        const wishlist = storage.getItem<WishlistItem[]>(STORAGE_KEYS.WISHLIST) || [];
        const updatedWishlist = wishlist.filter(item => item.id !== wishlistItemId);
        storage.setItem(STORAGE_KEYS.WISHLIST, updatedWishlist);
    },

    // Get wishlist
    getWishlist: (): WishlistItem[] => {
        return storage.getItem<WishlistItem[]>(STORAGE_KEYS.WISHLIST) || [];
    },

    // Check if gift is in wishlist
    isInWishlist: (giftId: string): boolean => {
        const wishlist = wishlistFlow.getWishlist();
        return wishlist.some(item => item.giftId === giftId);
    }
};

// Helper functions
function generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateRedemptionId(): string {
    return `redemption_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateWishlistItemId(): string {
    return `wishlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Calculate service fee (5%)
export const calculateServiceFee = (amount: number): number => {
    return Math.round(amount * 0.05 * 100) / 100;
};

// Calculate total with fee
export const calculateTotal = (amount: number): number => {
    return amount + calculateServiceFee(amount);
};
