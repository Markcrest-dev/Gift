'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { User, Bell, CreditCard, Shield, Camera, Trash2, Check, Banknote, Bitcoin } from 'lucide-react';

export default function SettingsPage() {
    const router = useRouter();
    
    // Active Tab State
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'payment' | 'security'>('profile');

    // Profile
    const [profile, setProfile] = useState({ displayName: '', email: '', country: 'US' });
    const [avatarHover, setAvatarHover] = useState(false);
    
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

    const inputClass = "w-full bg-white border border-gray-200 text-gray-900 font-body text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A4535] focus:ring-2 focus:ring-[#0A4535]/20 transition-all placeholder-gray-400";
    const disabledInputClass = "w-full bg-gray-50 border border-gray-200 text-gray-500 font-body text-sm rounded-xl px-4 py-3 cursor-not-allowed";

    const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
        <button
            type="button"
            onClick={onChange}
            className="relative flex items-center transition-colors focus:outline-none"
            style={{ 
                width: '48px', 
                height: '26px', 
                borderRadius: '13px',
                backgroundColor: checked ? '#0A4535' : '#E8F0EC'
            }}
        >
            <span
                className={`absolute bg-white shadow-sm transition-transform duration-300 ease-in-out ${checked ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}
                style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                }}
            />
        </button>
    );

    const handleProfileSubmit = (e: React.FormEvent) => { e.preventDefault(); };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'payment', label: 'Payment & Payout', icon: CreditCard },
        { id: 'security', label: 'Security', icon: Shield },
    ] as const;

    return (
        <div className="font-body pb-12 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-display text-[#0A4535]">Settings</h1>
                <p className="text-gray-500 mt-2 text-sm">Manage your account preferences and personal information.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0">
                    <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                        isActive 
                                            ? 'bg-[#0A4535] text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-[#E8F0EC] hover:text-[#0A4535]'
                                    }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 max-w-3xl">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-scale-in">
                        
                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="p-8">
                                <h2 className="text-xl font-display text-[#0A4535] mb-6">Profile Details</h2>
                                
                                <form onSubmit={handleProfileSubmit} className="space-y-8">
                                    {/* Avatar Upload */}
                                    <div className="flex items-center gap-6">
                                        <div 
                                            className="relative w-24 h-24 rounded-full bg-[#E8F0EC] border-2 border-white shadow-md flex items-center justify-center overflow-hidden group cursor-pointer"
                                            onMouseEnter={() => setAvatarHover(true)}
                                            onMouseLeave={() => setAvatarHover(false)}
                                        >
                                            {profile.displayName ? (
                                                <span className="text-3xl font-display text-[#0A4535]">
                                                    {profile.displayName.charAt(0)}
                                                </span>
                                            ) : (
                                                <User className="w-10 h-10 text-[#0A4535]/50" />
                                            )}
                                            
                                            {/* Hover Overlay */}
                                            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${avatarHover ? 'opacity-100' : 'opacity-0'}`}>
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex gap-3 mb-2">
                                                <button type="button" className="text-sm font-medium bg-[#0A4535] text-white px-4 py-2 rounded-full hover:bg-[#073528] transition-colors shadow-sm">
                                                    Upload new
                                                </button>
                                                <button type="button" className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-400">At least 800x800 px recommended. JPG or PNG.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Display Name</label>
                                            <input 
                                                type="text" 
                                                className={inputClass} 
                                                value={profile.displayName}
                                                onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                                            <input 
                                                type="email" 
                                                className={disabledInputClass} 
                                                value={profile.email}
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Country</label>
                                            <div className="relative">
                                                <select 
                                                    className={`${inputClass} appearance-none cursor-pointer`}
                                                    value={profile.country}
                                                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                                >
                                                    <option value="US">United States</option>
                                                    <option value="UK">United Kingdom</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="AU">Australia</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6 border-t border-gray-100">
                                        <button 
                                            type="submit"
                                            className="bg-[#0A4535] hover:bg-[#073528] text-white font-medium transition-colors px-6 py-3 rounded-full shadow-md flex items-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeTab === 'notifications' && (
                            <div className="p-8">
                                <h2 className="text-xl font-display text-[#0A4535] mb-2">Notification Preferences</h2>
                                <p className="text-sm text-gray-500 mb-8">Choose what updates you want to receive and how we contact you.</p>

                                <div className="space-y-6">
                                    <div className="flex items-start justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 mb-1">Gift Received</h4>
                                            <p className="text-xs text-gray-500">Get notified immediately when someone sends you a gift.</p>
                                        </div>
                                        <Toggle 
                                            checked={notifications.giftReceived} 
                                            onChange={() => setNotifications({ ...notifications, giftReceived: !notifications.giftReceived })} 
                                        />
                                    </div>
                                    
                                    <div className="flex items-start justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 mb-1">Redemption Reminders</h4>
                                            <p className="text-xs text-gray-500">We'll let you know before a gift expires so you don't miss out.</p>
                                        </div>
                                        <Toggle 
                                            checked={notifications.redemptionReminders} 
                                            onChange={() => setNotifications({ ...notifications, redemptionReminders: !notifications.redemptionReminders })} 
                                        />
                                    </div>

                                    <div className="flex items-start justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800 mb-1">Promotional Updates</h4>
                                            <p className="text-xs text-gray-500">Receive news about special offers, new features, and platform updates.</p>
                                        </div>
                                        <Toggle 
                                            checked={notifications.promotionalEmails} 
                                            onChange={() => setNotifications({ ...notifications, promotionalEmails: !notifications.promotionalEmails })} 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment & Payout Section */}
                        {activeTab === 'payment' && (
                            <div className="p-8">
                                <h2 className="text-xl font-display text-[#0A4535] mb-2">Payment & Payout</h2>
                                <p className="text-sm text-gray-500 mb-8">Manage how you receive funds when you redeem gifts.</p>

                                <div className="space-y-8">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-4">Preferred Payout Method</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Bank Transfer Card */}
                                            <button 
                                                onClick={() => setPayoutMethod('bank')}
                                                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                                                    payoutMethod === 'bank' 
                                                        ? 'border-[#0A4535] bg-[#E8F0EC]/30 shadow-sm' 
                                                        : 'border-gray-100 bg-white hover:border-[#C8DDD2]'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className={`p-2 rounded-lg ${payoutMethod === 'bank' ? 'bg-[#0A4535] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                        <Banknote className="w-5 h-5" />
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payoutMethod === 'bank' ? 'border-[#0A4535]' : 'border-gray-300'}`}>
                                                        {payoutMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A4535]" />}
                                                    </div>
                                                </div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Bank Transfer</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed">Direct deposit to your local bank account. Takes 1-3 business days.</p>
                                            </button>

                                            {/* Crypto Card */}
                                            <button 
                                                onClick={() => setPayoutMethod('crypto')}
                                                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                                                    payoutMethod === 'crypto' 
                                                        ? 'border-[#0A4535] bg-[#E8F0EC]/30 shadow-sm' 
                                                        : 'border-gray-100 bg-white hover:border-[#C8DDD2]'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className={`p-2 rounded-lg ${payoutMethod === 'crypto' ? 'bg-[#0A4535] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                        <Bitcoin className="w-5 h-5" />
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payoutMethod === 'crypto' ? 'border-[#0A4535]' : 'border-gray-300'}`}>
                                                        {payoutMethod === 'crypto' && <div className="w-2.5 h-2.5 rounded-full bg-[#0A4535]" />}
                                                    </div>
                                                </div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Crypto Wallet</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed">Receive funds instantly to your connected Web3 wallet via stablecoin.</p>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                                            {payoutMethod === 'bank' ? 'Bank Routing & Account Number' : 'Wallet Address (USDC/USDT)'}
                                        </label>
                                        <input 
                                            type="text" 
                                            className={inputClass} 
                                            value={payoutDetails}
                                            onChange={(e) => setPayoutDetails(e.target.value)}
                                            placeholder={payoutMethod === 'bank' ? 'e.g., 021000021 123456789' : '0x...'}
                                        />
                                        <p className="text-xs font-medium text-gray-400 mt-2">
                                            {payoutMethod === 'bank' ? 'Supported currencies: USD, EUR, GBP' : 'Supported networks: Ethereum, Polygon, Solana'}
                                        </p>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button className="bg-[#0A4535] hover:bg-[#073528] text-white font-medium transition-colors px-6 py-3 rounded-full shadow-md text-sm">
                                            Update Payout Method
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <div className="p-8">
                                <h2 className="text-xl font-display text-[#0A4535] mb-2">Security Settings</h2>
                                <p className="text-sm text-gray-500 mb-8">Manage your password and secure your account.</p>

                                <div className="space-y-6 mb-10">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 mb-2">Current Password</label>
                                        <input 
                                            type="password" 
                                            className={inputClass} 
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">New Password</label>
                                            <input 
                                                type="password" 
                                                className={inputClass} 
                                                value={passwords.newPassword}
                                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm New Password</label>
                                            <input 
                                                type="password" 
                                                className={inputClass} 
                                                value={passwords.confirmPassword}
                                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-start pt-2">
                                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors px-6 py-2.5 rounded-full text-sm">
                                            Update Password
                                        </button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="border border-red-100 bg-red-50/50 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-red-100 rounded-full shrink-0">
                                            <Trash2 className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-red-700 mb-1">Delete Account</h4>
                                            <p className="text-sm text-red-600/80 mb-4 leading-relaxed">
                                                Once you delete your account, there is no going back. Please be certain. All your data, gift history, and pending balances will be permanently removed.
                                            </p>
                                            <button 
                                                className="text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-colors px-5 py-2.5 rounded-full shadow-sm"
                                            >
                                                Delete my account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
