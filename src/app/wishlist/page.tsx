'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
    const wishlistItems = [
        {
            id: '1',
            name: 'MacBook Pro 16"',
            price: 2499,
            emoji: '💻',
            addedDate: '2024-12-10',
            priority: 'high'
        },
        {
            id: '2',
            name: 'Sony Camera',
            price: 1299,
            emoji: '📷',
            addedDate: '2024-12-12',
            priority: 'medium'
        },
        {
            id: '3',
            name: 'Vinyl Record Player',
            price: 399,
            emoji: '🎵',
            addedDate: '2024-12-14',
            priority: 'low'
        },
        {
            id: '4',
            name: 'Running Shoes',
            price: 159,
            emoji: '👟',
            addedDate: '2024-12-15',
            priority: 'medium'
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Wishlist</h1>
                            <p className="text-gray-600">Keep track of gifts you'd love to receive</p>
                        </div>

                        <Button>
                            <i className="fas fa-plus mr-2"></i>Add to Wishlist
                        </Button>
                    </div>

                    {/* Wishlist Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#C41E3A] mb-1">{wishlistItems.length}</div>
                                <div className="text-sm text-gray-600">Items in Wishlist</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#C41E3A] mb-1">
                                    ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600">Total Value</div>
                            </div>
                        </Card>
                        <Card padding="md">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-600 mb-1">
                                    {wishlistItems.filter(item => item.priority === 'high').length}
                                </div>
                                <div className="text-sm text-gray-600">High Priority</div>
                            </div>
                        </Card>
                    </div>

                    {/* Share Wishlist Banner */}
                    <Card className="mb-8 bg-gradient-to-r from-[#C41E3A] to-[#8B0000] text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-heading font-bold mb-2">Share Your Wishlist</h3>
                                <p className="text-white/90">Let friends and family know what you'd love to receive!</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white text-[#C41E3A] rounded-lg font-semibold hover:bg-gray-100 transition-all">
                                    <i className="fab fa-facebook mr-2"></i>Facebook
                                </button>
                                <button className="px-4 py-2 bg-white text-[#C41E3A] rounded-lg font-semibold hover:bg-gray-100 transition-all">
                                    <i className="fas fa-link mr-2"></i>Copy Link
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Wishlist Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                            <Card key={item.id} hover>
                                <div className="relative">
                                    <button className="absolute top-0 right-0 text-red-500 hover:text-red-700 transition-colors">
                                        <i className="fas fa-trash"></i>
                                    </button>

                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                        <div className="text-6xl">{item.emoji}</div>
                                    </div>

                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getPriorityColor(item.priority)}`}>
                                        {item.priority.toUpperCase()}
                                    </span>

                                    <h3 className="text-lg font-heading font-bold mb-2">{item.name}</h3>
                                    <p className="text-2xl font-bold text-[#C41E3A] mb-3">${item.price.toLocaleString()}</p>

                                    <p className="text-xs text-gray-500 mb-4">
                                        Added {new Date(item.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" fullWidth>
                                            <i className="fas fa-eye mr-2"></i>View
                                        </Button>
                                        <Button size="sm" fullWidth>
                                            <i className="fas fa-share mr-2"></i>Share
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
