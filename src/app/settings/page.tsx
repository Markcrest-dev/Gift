'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { Input } from '@/components/ui/FormComponents';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container max-w-5xl">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Settings</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card padding="sm">
                                <nav className="space-y-1">
                                    {[
                                        { id: 'profile', icon: 'fa-user', label: 'Profile' },
                                        { id: 'account', icon: 'fa-cog', label: 'Account' },
                                        { id: 'notifications', icon: 'fa-bell', label: 'Notifications' },
                                        { id: 'privacy', icon: 'fa-shield-alt', label: 'Privacy' },
                                        { id: 'payment', icon: 'fa-credit-card', label: 'Payment Methods' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                                                    ? 'bg-[#C41E3A] text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <i className={`fas ${tab.icon} mr-3`}></i>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </Card>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            <Card>
                                {activeTab === 'profile' && (
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold mb-6">Profile Settings</h2>
                                        <form className="space-y-6">
                                            <div className="flex items-center gap-6 mb-6">
                                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
                                                    <i className="fas fa-user-circle text-gray-400"></i>
                                                </div>
                                                <div>
                                                    <Button variant="outline" size="sm">Change Photo</Button>
                                                    <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Input label="First Name" defaultValue="Demo" />
                                                <Input label="Last Name" defaultValue="User" />
                                            </div>

                                            <Input label="Email Address" type="email" defaultValue="demo@gift.com" />
                                            <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />

                                            <div className="flex justify-end gap-4">
                                                <Button variant="outline">Cancel</Button>
                                                <Button>Save Changes</Button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {activeTab === 'account' && (
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold mb-6">Account Settings</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-semibold mb-4">Change Password</h3>
                                                <form className="space-y-4">
                                                    <Input label="Current Password" type="password" />
                                                    <Input label="New Password" type="password" />
                                                    <Input label="Confirm New Password" type="password" />
                                                    <Button>Update Password</Button>
                                                </form>
                                            </div>

                                            <div className="border-t pt-6 mt-6">
                                                <h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>
                                                <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                                                    Delete Account
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold mb-6">Notification Preferences</h2>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Email notifications for new gifts', checked: true },
                                                { label: 'Email notifications for gift claims', checked: true },
                                                { label: 'Marketing emails', checked: false },
                                                { label: 'Weekly summary emails', checked: true },
                                                { label: 'Push notifications', checked: false }
                                            ].map((item, index) => (
                                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200">
                                                    <span className="text-gray-700">{item.label}</span>
                                                    <label className="relative inline-block w-12 h-6">
                                                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C41E3A]"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'privacy' && (
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold mb-6">Privacy Settings</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-semibold mb-4">Profile Visibility</h3>
                                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                                                    <option>Public</option>
                                                    <option>Friends Only</option>
                                                    <option>Private</option>
                                                </select>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold mb-4">Data Sharing</h3>
                                                <div className="space-y-3">
                                                    <label className="flex items-center gap-3">
                                                        <input type="checkbox" className="w-5 h-5" />
                                                        <span>Allow analytics tracking</span>
                                                    </label>
                                                    <label className="flex items-center gap-3">
                                                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                                                        <span>Share wishlist with friends</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'payment' && (
                                    <div>
                                        <h2 className="text-2xl font-heading font-bold mb-6">Payment Methods</h2>
                                        <div className="space-y-4">
                                            <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <i className="fab fa-cc-visa text-4xl text-blue-600"></i>
                                                    <div>
                                                        <p className="font-semibold">Visa ending in 1234</p>
                                                        <p className="text-sm text-gray-500">Expires 12/2025</p>
                                                    </div>
                                                </div>
                                                <button className="text-red-500 hover:text-red-700">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>

                                            <Button variant="outline" fullWidth>
                                                <i className="fas fa-plus mr-2"></i>Add Payment Method
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
