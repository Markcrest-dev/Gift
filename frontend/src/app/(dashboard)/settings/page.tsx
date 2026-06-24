'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { auth } from '@/lib/auth';
import { storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [profile, setProfile] = useState({ fullName: '', email: '', phone: '' });
    const [preferences, setPreferences] = useState({ emailNotif: true, giftAlerts: true, wishlistUpdates: true, marketing: false, publicProfile: true, showActivity: false });

    useEffect(() => {
        const user = auth.getCurrentUser();
        if (user) setProfile({ fullName: `${user.firstName} ${user.lastName}`, email: user.email, phone: '' });
    }, []);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => setProfile({ ...profile, [e.target.id]: e.target.value });
    const handlePreferenceChange = (key: string) => setPreferences({ ...preferences, [key]: !preferences[key as keyof typeof preferences] });
    const saveProfile = (e: React.FormEvent) => { e.preventDefault(); alert('Profile updated successfully!'); };
    const changePassword = (e: React.FormEvent) => { e.preventDefault(); alert('Password changed successfully!'); };
    const handleLogout = () => { auth.logout(); router.push('/login'); };
    const handleClearData = () => { if (confirm('Clear all local data?')) { storage.clear(); router.push('/login'); } };

    const inputClass = "w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors";

    const toggleItems: Record<string, [string, string][]> = {
        Notifications: [['emailNotif', 'Email Notifications'], ['giftAlerts', 'Gift Received Alerts'], ['wishlistUpdates', 'Wishlist Updates'], ['marketing', 'Marketing Emails']],
        Privacy: [['publicProfile', 'Public Profile'], ['showActivity', 'Show Activity']],
    };

    return (
        <div className="max-w-[640px] mx-auto">
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-paper mb-2">Settings</h1>
                <p className="text-paper/40 text-sm">Manage your account</p>
            </div>

            <div className="bg-surface rounded-lg p-6 mb-4">
                <h2 className="text-paper font-semibold text-base mb-5">Profile</h2>
                <form onSubmit={saveProfile} className="space-y-4">
                    <div><label htmlFor="fullName" className="block text-paper/60 text-sm font-medium mb-2">Full Name</label><input type="text" id="fullName" className={inputClass} value={profile.fullName} onChange={handleProfileChange} required /></div>
                    <div><label htmlFor="email" className="block text-paper/60 text-sm font-medium mb-2">Email</label><input type="email" id="email" className={inputClass} value={profile.email} onChange={handleProfileChange} required /></div>
                    <div><label htmlFor="phone" className="block text-paper/60 text-sm font-medium mb-2">Phone (Optional)</label><input type="tel" id="phone" className={inputClass} value={profile.phone} onChange={handleProfileChange} /></div>
                    <Button type="submit" variant="primary" size="md">Save Changes</Button>
                </form>
            </div>

            <div className="bg-surface rounded-lg p-6 mb-4">
                <h2 className="text-paper font-semibold text-base mb-5">Change Password</h2>
                <form onSubmit={changePassword} className="space-y-4">
                    <div><label htmlFor="currentPassword" className="block text-paper/60 text-sm font-medium mb-2">Current Password</label><input type="password" id="currentPassword" className={inputClass} required /></div>
                    <div><label htmlFor="newPassword" className="block text-paper/60 text-sm font-medium mb-2">New Password</label><input type="password" id="newPassword" className={inputClass} required minLength={8} /></div>
                    <div><label htmlFor="confirmNewPassword" className="block text-paper/60 text-sm font-medium mb-2">Confirm New Password</label><input type="password" id="confirmNewPassword" className={inputClass} required minLength={8} /></div>
                    <Button type="submit" variant="ghost" size="md">Update Password</Button>
                </form>
            </div>

            {Object.entries(toggleItems).map(([section, items]) => (
                <div key={section} className="bg-surface rounded-lg p-6 mb-4">
                    <h2 className="text-paper font-semibold text-base mb-5">{section}</h2>
                    <div className="space-y-4">
                        {items.map(([key, title]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-paper/60 text-sm">{title}</span>
                                <label className="switch">
                                    <input type="checkbox" checked={preferences[key as keyof typeof preferences]} onChange={() => handlePreferenceChange(key)} />
                                    <span className="slider" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="bg-surface rounded-lg p-6 border border-red/10">
                <h2 className="text-red/70 font-semibold text-base mb-4">Danger Zone</h2>
                <p className="text-paper/30 text-sm mb-4">Permanent actions</p>
                <div className="flex gap-3">
                    <Button variant="ghost" size="sm" onClick={handleClearData}>Clear Data</Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </div>
    );
}
