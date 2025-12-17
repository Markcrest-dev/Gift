// Local Storage Utility Functions with Type Safety

export const storage = {
    // Get item from localStorage with type safety
    getItem: <T>(key: string): T | null => {
        if (typeof window === 'undefined') return null;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting item ${key} from localStorage:`, error);
            return null;
        }
    },

    // Set item in localStorage
    setItem: <T>(key: string, value: T): void => {
        if (typeof window === 'undefined') return;

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting item ${key} to localStorage:`, error);
        }
    },

    // Remove item from localStorage
    removeItem: (key: string): void => {
        if (typeof window === 'undefined') return;

        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item ${key} from localStorage:`, error);
        }
    },

    // Clear all localStorage
    clear: (): void => {
        if (typeof window === 'undefined') return;

        try {
            window.localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};

// Specific storage keys
export const STORAGE_KEYS = {
    USER: 'user',
    AUTH_TOKEN: 'authToken',
    SENT_GIFTS: 'sentGifts',
    WISHLIST: 'wishlist',
    NOTIFICATIONS: 'notifications',
    GIFT_CLAIMS: 'giftClaims',
    COOKIE_CONSENT: 'cookieConsent'
} as const;
