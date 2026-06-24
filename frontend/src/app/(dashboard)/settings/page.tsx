'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/auth';
import { storage } from '@/lib/storage';
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

    const inputClass = "w-full bg-[#111009] border border-[#2E2820] text-[#F5F0E8] font-sans text-[14px] placeholder-[#3A342E] focus:outline-none focus:border-[#B8922A] transition-colors";
    const inputStyle = { borderRadius: '3px', padding: '11px 14px' };
    const disabledInputClass = "w-full bg-[#111111] border border-[#2E2820] text-[#4A4038] font-sans text-[14px] cursor-not-allowed";

    const Toggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
        <button
            type="button"
            onClick={onChange}
            className="relative flex items-center transition-colors"
            style={{ 
                width: '36px', 
                height: '20px', 
                borderRadius: '10px',
                backgroundColor: checked ? '#C0292B' : '#1E1A14'
            }}
        >
            <span
                className="absolute bg-[#F5F0E8] transition-transform"
                style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    top: '2px',
                    left: '2px',
                    transform: checked ? 'translateX(16px)' : 'translateX(0)'
                }}
            />
        </button>
    );

    const handleProfileSubmit = (e: React.FormEvent) => { e.preventDefault(); };

    return (
        <div className="p-8 max-w-[640px]">
            {/* Header */}
            <div className="mb-12">
                <h1 className="font-sans text-[22px] font-semibold text-[#F5F0E8]">Settings</h1>
            </div>

            {/* Profile Section */}
            <section className="mb-12">
                <h3 className="font-sans text-[13px] uppercase text-[#6B6055] tracking-[0.08em] font-medium border-b border-[#1E1A14] pb-[12px] mb-[24px]">
                    Profile
                </h3>
                <form onSubmit={handleProfileSubmit} className="space-y-5">
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Display Name</label>
                        <input 
                            type="text" 
                            className={inputClass} 
                            style={inputStyle} 
                            value={profile.displayName}
                            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Email</label>
                        <input 
                            type="email" 
                            className={disabledInputClass} 
                            style={inputStyle} 
                            value={profile.email}
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Country</label>
                        <select 
                            className={inputClass} 
                            style={inputStyle}
                            value={profile.country}
                            onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                        >
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button 
                            type="submit"
                            className="bg-gold hover:bg-gold/90 text-[#0A0806] font-sans text-[14px] font-medium transition-colors"
                            style={{ padding: '10px 24px', borderRadius: '3px' }}
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </section>

            {/* Notifications Section */}
            <section className="mb-12">
                <h3 className="font-sans text-[13px] uppercase text-[#6B6055] tracking-[0.08em] font-medium border-b border-[#1E1A14] pb-[12px] mb-[24px]">
                    Notifications
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="font-sans text-[15px] text-[#C4B99A]">Gift received notifications</span>
                        <Toggle 
                            checked={notifications.giftReceived} 
                            onChange={() => setNotifications({ ...notifications, giftReceived: !notifications.giftReceived })} 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-sans text-[15px] text-[#C4B99A]">Redemption deadline reminders</span>
                        <Toggle 
                            checked={notifications.redemptionReminders} 
                            onChange={() => setNotifications({ ...notifications, redemptionReminders: !notifications.redemptionReminders })} 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-sans text-[15px] text-[#C4B99A]">Promotional emails</span>
                        <Toggle 
                            checked={notifications.promotionalEmails} 
                            onChange={() => setNotifications({ ...notifications, promotionalEmails: !notifications.promotionalEmails })} 
                        />
                    </div>
                </div>
            </section>

            {/* Payment & Payout Section */}
            <section className="mb-12">
                <h3 className="font-sans text-[13px] uppercase text-[#6B6055] tracking-[0.08em] font-medium border-b border-[#1E1A14] pb-[12px] mb-[24px]">
                    Payment & Payout
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-4">Preferred payout method</label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${payoutMethod === 'bank' ? 'border-gold' : 'border-[#4A4038] group-hover:border-[#6B6055]'}`}>
                                    {payoutMethod === 'bank' && <div className="w-2 h-2 rounded-full bg-gold" />}
                                </div>
                                <span className="font-sans text-[14px] text-[#F5F0E8]">Bank Transfer</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${payoutMethod === 'crypto' ? 'border-gold' : 'border-[#4A4038] group-hover:border-[#6B6055]'}`}>
                                    {payoutMethod === 'crypto' && <div className="w-2 h-2 rounded-full bg-gold" />}
                                </div>
                                <span className="font-sans text-[14px] text-[#F5F0E8]">Crypto Wallet</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">
                            {payoutMethod === 'bank' ? 'Bank Account Details' : 'Wallet Address'}
                        </label>
                        <input 
                            type="text" 
                            className={inputClass} 
                            style={inputStyle} 
                            value={payoutDetails}
                            onChange={(e) => setPayoutDetails(e.target.value)}
                            placeholder={payoutMethod === 'bank' ? 'Routing & Account Number' : '0x...'}
                        />
                    </div>
                    
                    <p className="font-sans text-[12px] text-[#4A4038]">
                        Supported currencies: USD, EUR, GBP, BTC, ETH, USDT
                    </p>
                </div>
            </section>

            {/* Security Section */}
            <section className="mb-12">
                <h3 className="font-sans text-[13px] uppercase text-[#6B6055] tracking-[0.08em] font-medium border-b border-[#1E1A14] pb-[12px] mb-[24px]">
                    Security
                </h3>
                <div className="space-y-5 mb-8">
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">New Password</label>
                        <input 
                            type="password" 
                            className={inputClass} 
                            style={inputStyle} 
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Confirm Password</label>
                        <input 
                            type="password" 
                            className={inputClass} 
                            style={inputStyle} 
                            value={passwords.confirmPassword}
                            onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-8 border-t border-[#1E1A14]">
                    <button 
                        className="font-sans text-[14px] text-[#C0292B] hover:text-[#A32325] transition-colors mb-2 block"
                    >
                        Delete Account
                    </button>
                    <p className="font-sans text-[12px] text-[#4A4038]">
                        This action is permanent and cannot be undone.
                    </p>
                </div>
            </section>
        </div>
    );
}
