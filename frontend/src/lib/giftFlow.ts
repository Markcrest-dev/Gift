import { Gift, Order, Redemption, WishlistItem } from './types';
import { api } from './api';

export const giftFlow = {
    sendGift: async (orderData: {
        recipientEmail: string;
        recipientName: string;
        giftId: string;
        message: string;
        deliveryDate?: string;
        anonymous?: boolean;
        paymentMethod: string;
    }): Promise<Order> => {
        return api.post<Order>('/orders', orderData, true);
    },

    getSentGifts: async (): Promise<Order[]> => {
        return api.get<Order[]>('/orders/sent', true);
    },

    getReceivedGifts: async (): Promise<Order[]> => {
        return api.get<Order[]>('/orders/received', true);
    },

    redeemGift: async (
        orderId: string,
        method: string,
        details: Record<string, string>,
    ): Promise<Redemption> => {
        return api.post<Redemption>(`/orders/${orderId}/redeem`, { method, details }, true);
    },
};

export const giftsApi = {
    getAll: async (filters?: Record<string, string>): Promise<Gift[]> => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.set(key, value);
            });
        }
        const query = params.toString();
        return api.get<Gift[]>(`/gifts${query ? `?${query}` : ''}`);
    },

    getById: async (id: string): Promise<Gift> => {
        return api.get<Gift>(`/gifts/${id}`);
    },
};

export const wishlistFlow = {
    getWishlist: async (): Promise<WishlistItem[]> => {
        return api.get<WishlistItem[]>('/wishlist', true);
    },

    addToWishlist: async (giftId: string): Promise<WishlistItem> => {
        return api.post<WishlistItem>(`/wishlist/${giftId}`, {}, true);
    },

    removeFromWishlist: async (itemId: string): Promise<void> => {
        return api.delete<void>(`/wishlist/${itemId}`, true);
    },

    isInWishlist: async (giftId: string): Promise<boolean> => {
        const result = await api.get<{ inWishlist: boolean }>(`/wishlist/check/${giftId}`, true);
        return result.inWishlist;
    },
};

export const notificationsApi = {
    getAll: async () => {
        return api.get<Notification[]>('/notifications', true);
    },

    markAsRead: async (id: string) => {
        return api.patch('/notifications/' + id + '/read', {}, true);
    },
};

export const calculateServiceFee = (amount: number): number => {
    return Math.round(amount * 0.05 * 100) / 100;
};

export const calculateTotal = (amount: number): number => {
    return amount + calculateServiceFee(amount);
};
