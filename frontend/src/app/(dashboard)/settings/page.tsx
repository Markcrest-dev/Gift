'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    
    // Profile
    const [profile, setProfile] = useState({ displayName: '', email: '', country: 'US' });
    
    // Notifications
    const [notifications, setNotifications] = useState({
        giftReceived: true,
        redemptionReminders: true,
        promotionalEmails: false
    });

    // Payment & Payout
    const [payoutMethod, setPayoutMethod] = useState<'bank' | 'crypto'>('bank');
    const [payoutDetails, setPayoutDetails] = useState('');

    // Security
    const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });

    useEffect(() => {
        const user = auth.getCurrentUser();
        if (user) {
            setProfile({ 
                displayName: `${user.firstName} ${user.lastName}`, 
                email: user.email, 
                country: 'US' 
            });
        }
    }, []);

    const inputClass = "w-full bg-gray-50 border border-gray-200 text-gray-900 font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all placeholder-gray-400";
    const disabledInputClass = "w-full bg-gray-100 border border-gray-200 text-gray-500 font-body text-sm rounded-xl px-4 py-3 cursor-not-allowed";

    const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
        <button
            type="button"
            onClick={onChange}
            className="relative flex items-center transition-colors shadow-inner"
            style={{ 
                width: '44px', 
                height: '24px', 
                borderRadius: '12px',
                backgroundColor: checked ? '#0A4535' : '#E5E7EB'
            }}
        >
            <span
                className="absolute bg-white shadow-sm transition-transform"
                style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    top: '2px',
                    left: '2px',
                    transform: checked ? 'translateX(20px)' : 'translateX(0)'
                }}
            />
        </button>
    );

    const handleProfileSubmit = (e: React.FormEvent) => { e.preventDefault(); };

    return (
        <div className="font-body pb-12 max-w-2xl">
            {/* Header */}
            <div className="mb-10 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-display text-[#0A4535]">Settings</h1>
            </div>

            {/* Profile Section */}
            <section className="mb-12">
                <h3 className="text-sm uppercase text-[#0A4535] tracking-widest font-bold mb-6">
                    Profile
                </h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <form onSubmit={handleProfileSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
                            <input 
                                type="text" 
                                className={inputClass} 
                                value={profile.displayName}
                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                className={disabledInputClass} 
                                value={profile.email}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                            <select 
                                className={`${inputClass} appearance-none`}
                                value={profile.country}
                                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                            >
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                            </select>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button 
                                type="submit"
                                className="bg-[#0A4535] hover:bg-[#073528] text-white font-medium transition-colors px-6 py-2.5 rounded-full shadow-md"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="mb-12">
                <h3 className="text-sm uppercase text-[#0A4535] tracking-widest font-bold mb-6">
                    Notifications
                </h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-800">Gift received notifications</span>
                        <Toggle 
                            checked={notifications.giftReceived} 
                            onChange={() => setNotifications({ ...notifications, giftReceived: !notifications.giftReceived })} 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-800">Redemption deadline reminders</span>
                        <Toggle 
                            checked={notifications.redemptionReminders} 
                            onChange={() => setNotifications({ ...notifications, redemptionReminders: !notifications.redemptionReminders })} 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-800">Promotional emails</span>
                        <Toggle 
                            checked={notifications.promotionalEmails} 
                            onChange={() => setNotifications({ ...notifications, promotionalEmails: !notifications.promotionalEmails })} 
                        />
                    </div>
                </div>
            </section>

            {/* Payment & Payout Section */}
            <section className="mb-12">
                <h3 className="text-sm uppercase text-[#0A4535] tracking-widest font-bold mb-6">
                    Payment & Payout
                </h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">Preferred payout method</label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <label className="flex items-center gap-3 cursor-pointer group p-4 border border-gray-200 rounded-xl hover:border-[#0A4535] transition-colors bg-gray-50 flex-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payoutMethod === 'bank' ? 'border-[#0A4535]' : 'border-gray-300'}`}>
                                    {payoutMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A4535]" />}
                                </div>
                                <span className="text-sm font-bold text-gray-800">Bank Transfer</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group p-4 border border-gray-200 rounded-xl hover:border-[#0A4535] transition-colors bg-gray-50 flex-1">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payoutMethod === 'crypto' ? 'border-[#0A4535]' : 'border-gray-300'}`}>
                                    {payoutMethod === 'crypto' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A4535]" />}
                                </div>
                                <span className="text-sm font-bold text-gray-800">Crypto Wallet</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {payoutMethod === 'bank' ? 'Bank Account Details' : 'Wallet Address'}
                        </label>
                        <input 
                            type="text" 
                            className={inputClass} 
                            value={payoutDetails}
                            onChange={(e) => setPayoutDetails(e.target.value)}
                            placeholder={payoutMethod === 'bank' ? 'Routing & Account Number' : '0x...'}
                        />
                    </div>
                    
                    <p className="text-xs font-medium text-gray-400">
                        Supported currencies: USD, EUR, GBP, BTC, ETH, USDT
                    </p>
                </div>
            </section>

            {/* Security Section */}
            <section className="mb-12">
                <h3 className="text-sm uppercase text-[#0A4535] tracking-widest font-bold mb-6">
                    Security
                </h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="space-y-5 mb-8">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                            <input 
                                type="password" 
                                className={inputClass} 
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <input 
                                type="password" 
                                className={inputClass} 
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <button 
                            className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors mb-2 block bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full"
                        >
                            Delete Account
                        </button>
                        <p className="text-xs font-medium text-gray-400 mt-3 px-2">
                            This action is permanent and cannot be undone.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
