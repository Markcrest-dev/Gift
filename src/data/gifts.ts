import { Gift } from '@/lib/types';

// Sample gift data
export const giftCatalog: Gift[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro',
        description: 'Latest flagship smartphone with advanced camera system',
        price: 999,
        currency: 'USD',
        category: 'electronics',
        gender: 'unisex',
        rating: 5,
        reviews: 234,
        emoji: '📱'
    },
    {
        id: '2',
        name: 'AirPods Pro',
        description: 'Premium wireless earbuds with active noise cancellation',
        price: 249,
        currency: 'USD',
        category: 'electronics',
        gender: 'unisex',
        rating: 5,
        reviews: 512,
        emoji: '🎧'
    },
    {
        id: '3',
        name: 'Designer Handbag',
        description: 'Luxury leather handbag for the fashion-forward',
        price: 599,
        currency: 'USD',
        category: 'fashion',
        gender: 'female',
        rating: 4,
        reviews: 89,
        emoji: '👜'
    },
    {
        id: '4',
        name: 'LEGO Boost Kit',
        description: 'Creative robotics building set for kids',
        price: 159,
        currency: 'USD',
        category: 'toys',
        gender: 'unisex',
        rating: 5,
        reviews: 156,
        emoji: '🧱'
    },
    {
        id: '5',
        name: 'Spa Day Package',
        description: 'Relaxing full-day spa experience',
        price: 299,
        currency: 'USD',
        category: 'experiences',
        gender: 'female',
        rating: 5,
        reviews: 203,
        emoji: '💆'
    },
    {
        id: '6',
        name: 'Amazon Gift Card',
        description: 'Digital gift card for endless shopping',
        price: 100,
        currency: 'USD',
        category: 'gift-cards',
        gender: 'unisex',
        rating: 5,
        reviews: 1024,
        emoji: '🎁'
    },
    {
        id: '7',
        name: 'Apple Watch',
        description: 'Smart watch with health and fitness tracking',
        price: 399,
        currency: 'USD',
        category: 'electronics',
        gender: 'unisex',
        rating: 5,
        reviews: 345,
        emoji: '⌚'
    },
    {
        id: '8',
        name: 'Perfume Set',
        description: 'Premium fragrance collection',
        price: 129,
        currency: 'USD',
        category: 'fashion',
        gender: 'female',
        rating: 4,
        reviews: 78,
        emoji: '🌸'
    },
    {
        id: '9',
        name: 'Gaming Headset',
        description: 'Professional gaming headset with RGB lighting',
        price: 159,
        currency: 'USD',
        category: 'electronics',
        gender: 'male',
        rating: 5,
        reviews: 456,
        emoji: '🎮'
    },
    {
        id: '10',
        name: 'Yoga Mat Set',
        description: 'Premium yoga mat with accessories',
        price: 89,
        currency: 'USD',
        category: 'home',
        gender: 'female',
        rating: 4,
        reviews: 234,
        emoji: '🧘'
    }
];

// Marketplace filtering function
export const filterGifts = (
    gifts: Gift[],
    filters: {
        search?: string;
        category?: string;
        gender?: string;
        minPrice?: number;
        maxPrice?: number;
        minRating?: number;
    }
): Gift[] => {
    return gifts.filter((gift) => {
        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch =
                gift.name.toLowerCase().includes(searchLower) ||
                gift.description.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category && filters.category !== 'all') {
            if (gift.category !== filters.category) return false;
        }

        // Gender filter
        if (filters.gender && filters.gender !== 'all') {
            if (gift.gender !== filters.gender && gift.gender !== 'unisex') return false;
        }

        // Price range filter
        if (filters.minPrice !== undefined && gift.price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && gift.price > filters.maxPrice) return false;

        // Rating filter
        if (filters.minRating !== undefined && gift.rating < filters.minRating) return false;

        return true;
    });
};

// Sort gifts
export const sortGifts = (
    gifts: Gift[],
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'featured'
): Gift[] => {
    const sorted = [...gifts];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted; // In real app, would sort by creation date
        case 'featured':
        default:
            return sorted; // In real app, would sort by featured flag
    }
};

// Get gift by ID
export const getGiftById = (id: string): Gift | undefined => {
    return giftCatalog.find((gift) => gift.id === id);
};
