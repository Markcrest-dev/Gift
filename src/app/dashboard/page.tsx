'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DashboardPage() {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div className="container py-8 md:py-12">
                    {/* Welcome Header */}
                    <div className="bg-gradient-to-br from-[#C41E3A] to-[#8B0000] text-white rounded-2xl p-6 md:p-10 mb-8">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Welcome back, Demo User!</h1>
                        <p className="text-lg text-white/90">Here's what's happening with your gifts</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-3xl text-[#C41E3A]">
                                    <i className="fas fa-gift"></i>
                                </div>
                                <span className="text-3xl font-bold font-heading text-gray-900">24</span>
                            </div>
                            <h3 className="text-gray-600 font-medium">Gifts Sent</h3>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-3xl text-[#0F5132]">
                                    <i className="fas fa-box-open"></i>
                                </div>
                                <span className="text-3xl font-bold font-heading text-gray-900">12</span>
                            </div>
                            <h3 className="text-gray-600 font-medium">Gifts Received</h3>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-3xl text-[#FFD700]">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <span className="text-3xl font-bold font-heading text-gray-900">3</span>
                            </div>
                            <h3 className="text-gray-600 font-medium">Pending</h3>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-3xl text-[#C41E3A]">
                                    <i className="fas fa-heart"></i>
                                </div>
                                <span className="text-3xl font-bold font-heading text-gray-900">8</span>
                            </div>
                            <h3 className="text-gray-600 font-medium">Wishlist Items</h3>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-heading font-bold mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                                            <i className={`fas ${activity.icon} text-white`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{activity.title}</p>
                                            <p className="text-sm text-gray-500">{activity.description}</p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-heading font-bold mb-6">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full bg-[#C41E3A] text-white py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-plus"></i>
                                    Send a Gift
                                </button>
                                <button className="w-full border-2 border-[#C41E3A] text-[#C41E3A] py-3 rounded-lg font-semibold hover:bg-[#C41E3A] hover:text-white transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-store"></i>
                                    Browse Marketplace
                                </button>
                                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-heart"></i>
                                    View Wishlist
                                </button>
                                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                    <i className="fas fa-cog"></i>
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

const recentActivity = [
    {
        icon: "fa-gift",
        color: "bg-[#C41E3A]",
        title: "Gift Sent Successfully",
        description: "You sent an iPhone 15 Pro to Sarah Johnson",
        time: "2 hours ago"
    },
    {
        icon: "fa-box-open",
        color: "bg-[#0F5132]",
        title: "Gift Received",
        description: "Michael Chen sent you AirPods Pro",
        time: "5 hours ago"
    },
    {
        icon: "fa-money-bill",
        color: "bg-[#FFD700]",
        title: "Redemption Complete",
        description: "Cash redemption of $299 processed",
        time: "1 day ago"
    },
    {
        icon: "fa-heart",
        color: "bg-pink-500",
        title: "Wishlist Updated",
        description: "Added Apple Watch to your wishlist",
        time: "2 days ago"
    },
    {
        icon: "fa-envelope",
        color: "bg-blue-500",
        title: "Gift Notification",
        description: "Emma Rodriguez wants to send you a gift",
        time: "3 days ago"
    }
];
