import { User } from './types';
import { storage, STORAGE_KEYS } from './storage';

// Demo account credentials
const DEMO_ACCOUNT = {
    email: 'demo@gift.com',
    password: 'Demo123!',
    user: {
        id: 'demo-user-1',
        email: 'demo@gift.com',
        firstName: 'Demo',
        lastName: 'User',
        createdAt: new Date()
    }
};

export const auth = {
    // Login function
    login: (email: string, password: string): { success: boolean; user?: User; error?: string } => {
        // Check for demo account
        if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
            const token = generateToken();
            storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
            storage.setItem(STORAGE_KEYS.USER, DEMO_ACCOUNT.user);

            return { success: true, user: DEMO_ACCOUNT.user };
        }

        // In a real app, this would make an API call
        // For now, just check if user exists in localStorage
        return { success: false, error: 'Invalid email or password' };
    },

    // Signup function
    signup: (email: string, password: string, firstName: string, lastName: string): { success: boolean; user?: User; error?: string } => {
        // Basic validation
        if (!email || !password || !firstName || !lastName) {
            return { success: false, error: 'All fields are required' };
        }

        if (password.length < 8) {
            return { success: false, error: 'Password must be at least 8 characters' };
        }

        // Create new user
        const newUser: User = {
            id: generateUserId(),
            email,
            firstName,
            lastName,
            createdAt: new Date()
        };

        const token = generateToken();
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        storage.setItem(STORAGE_KEYS.USER, newUser);

        return { success: true, user: newUser };
    },

    // Logout function
    logout: (): void => {
        storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        storage.removeItem(STORAGE_KEYS.USER);
    },

    // Get current user
    getCurrentUser: (): User | null => {
        return storage.getItem<User>(STORAGE_KEYS.USER);
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        const token = storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
        return token !== null;
    }
};

// Helper functions
function generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
