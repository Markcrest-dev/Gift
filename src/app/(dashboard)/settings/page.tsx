'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
    const [profile, setProfile] = useState({
        fullName: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '+1 (555) 123-4567'
    });

    const [preferences, setPreferences] = useState({
        emailNotif: true,
        giftAlerts: true,
        wishlistUpdates: true,
        marketing: false,
        publicProfile: true,
        showActivity: false
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.id]: e.target.value });
    };

    const handlePreferenceChange = (key: string) => {
        setPreferences({ ...preferences, [key]: !preferences[key as keyof typeof preferences] });
    };

    const saveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    const changePassword = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password changed successfully!');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header fade-in-up">
                <h1 className="page-title">Settings <i className="fas fa-cog"></i></h1>
                <p className="page-subtitle">Manage your account and preferences</p>
            </div>

            {/* Profile Settings */}
            <div className="settings-section fade-in-up">
                <h2 className="section-title">
                    <span><i className="fas fa-user"></i></span>
                    <span>Profile Information</span>
                </h2>
                <form onSubmit={saveProfile}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            className="form-input"
                            value={profile.fullName}
                            onChange={handleProfileChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={profile.email}
                            onChange={handleProfileChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            className="form-input"
                            value={profile.phone}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <Button type="submit" variant="primary">Save Changes</Button>
                </form>
            </div>

            {/* Password Settings */}
            <div className="settings-section fade-in-up stagger-1">
                <h2 className="section-title">
                    <span><i className="fas fa-lock"></i></span>
                    <span>Change Password</span>
                </h2>
                <form onSubmit={changePassword}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" className="form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" className="form-input" required minLength={8} />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                        <input type="password" id="confirmPassword" className="form-input" required minLength={8} />
                    </div>

                    <Button type="submit" variant="secondary">Update Password</Button>
                </form>
            </div>

            {/* Notification Preferences */}
            <div className="settings-section fade-in-up stagger-2">
                <h2 className="section-title">
                    <span><i className="fas fa-bell"></i></span>
                    <span>Notification Preferences</span>
                </h2>

                {Object.entries({
                    emailNotif: ['Email Notifications', 'Receive email updates about your gifts'],
                    giftAlerts: ['Gift Received Alerts', 'Get notified when someone sends you a gift'],
                    wishlistUpdates: ['Wishlist Updates', 'Notifications about your wishlist items'],
                    marketing: ['Marketing Emails', 'Special offers and promotions']
                }).map(([key, [title, desc]]) => (
                    <div className="toggle-switch" key={key}>
                        <div className="toggle-label">
                            <div className="toggle-title">{title}</div>
                            <div className="toggle-description">{desc}</div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={preferences[key as keyof typeof preferences]}
                                onChange={() => handlePreferenceChange(key)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>

            {/* Privacy Settings */}
            <div className="settings-section fade-in-up stagger-3">
                <h2 className="section-title">
                    <span><i className="fas fa-shield-alt"></i></span>
                    <span>Privacy</span>
                </h2>

                {Object.entries({
                    publicProfile: ['Public Profile', 'Allow others to see your profile'],
                    showActivity: ['Show Activity', 'Display your gift exchange activity']
                }).map(([key, [title, desc]]) => (
                    <div className="toggle-switch" key={key}>
                        <div className="toggle-label">
                            <div className="toggle-title">{title}</div>
                            <div className="toggle-description">{desc}</div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={preferences[key as keyof typeof preferences]}
                                onChange={() => handlePreferenceChange(key)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="settings-section danger-zone fade-in-up stagger-4">
                <h2 className="section-title" style={{ color: '#ff4444' }}>
                    <span><i className="fas fa-exclamation-triangle"></i></span>
                    <span>Danger Zone</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
                    These actions are permanent and cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                    <Button variant="outline" onClick={() => alert('Data cleared')}>Clear All Data</Button>
                    <button className="btn" style={{ background: '#ff4444', borderColor: '#ff4444', color: 'white' }} onClick={() => alert('Account deleted')}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}
