import { User } from './types';
import { storage, STORAGE_KEYS } from './storage';
import { api } from './api';

interface AuthResponse {
    access_token: string;
    user: User;
}

export const auth = {
    login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
        try {
            const data = await api.post<AuthResponse>('/auth/login', { email, password });
            storage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
            storage.setItem(STORAGE_KEYS.USER, data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
        }
    },

    signup: async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
    ): Promise<{ success: boolean; user?: User; error?: string }> => {
        try {
            const data = await api.post<AuthResponse>('/auth/signup', {
                email,
                password,
                firstName,
                lastName,
            });
            storage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
            storage.setItem(STORAGE_KEYS.USER, data.user);
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Signup failed' };
        }
    },

    logout: (): void => {
        storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        storage.removeItem(STORAGE_KEYS.USER);
    },

    getCurrentUser: (): User | null => {
        return storage.getItem<User>(STORAGE_KEYS.USER);
    },

    getProfile: async (): Promise<User | null> => {
        try {
            return await api.get<User>('/auth/profile', true);
        } catch {
            return null;
        }
    },

    isAuthenticated: (): boolean => {
        const token = storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
        return token !== null;
    },
};
