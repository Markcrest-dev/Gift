'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Mock Data
const MOCK_GIFTS = [
    { id: 1, name: "Wireless Noise Cancelling Headphones", price: 299.99, image: "https://placehold.co/400x400?text=Headphones", category: "Electronics", rating: 4.8, reviews: 1250 },
    { id: 2, name: "Premium Coffee Maker", price: 149.50, image: "https://placehold.co/400x400?text=Coffee+Maker", category: "Home & Kitchen", rating: 4.6, reviews: 850 },
    { id: 3, name: "Luxury Skincare Set", price: 89.00, image: "https://placehold.co/400x400?text=Skincare", category: "Beauty", rating: 4.9, reviews: 520 },
    { id: 4, name: "Smart Watch Series 7", price: 399.00, image: "https://placehold.co/400x400?text=Smart+Watch", category: "Electronics", rating: 4.7, reviews: 2100 },
    { id: 5, name: "Organic Tea Collection", price: 45.00, image: "https://placehold.co/400x400?text=Tea+Set", category: "Food & Drink", rating: 4.5, reviews: 320 },
    { id: 6, name: "Portable Bluetooth Speaker", price: 79.99, image: "https://placehold.co/400x400?text=Speaker", category: "Electronics", rating: 4.4, reviews: 890 },
    { id: 7, name: "Yoga Mat & Accessories", price: 65.00, image: "https://placehold.co/400x400?text=Yoga+Set", category: "Fitness", rating: 4.7, reviews: 450 },
    { id: 8, name: "Gourmet Chocolate Box", price: 34.99, image: "https://placehold.co/400x400?text=Chocolates", category: "Food & Drink", rating: 4.8, reviews: 670 }
];

export default function MarketplacePage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setProducts(MOCK_GIFTS);
            setLoading(false);
        }, 1000);
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const toggleFilter = (filter: string) => {
        if (activeFilters.includes(filter)) {
            setActiveFilters(activeFilters.filter(f => f !== filter));
        } else {
            setActiveFilters([...activeFilters, filter]);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(product.category);
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <div className="marketplace-container page-transition">
                {/* Header */}
                <div className="marketplace-header text-center fade-in-up">
                    <h1 className="marketplace-title">Gift Marketplace <i className="fas fa-gift"></i></h1>
                    <p className="marketplace-subtitle">Discover the perfect gift for your loved ones</p>
                </div>

                {/* Search & View Controls */}
                <div className="marketplace-controls fade-in-up">
                    <div className="search-bar">
                        <span className="search-icon"><i className="fas fa-search"></i></span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for gifts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="view-toggle">
                        <button
                            className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                            onClick={() => setView('grid')}
                            title="Grid View"
                        >
                            <i className="fas fa-th"></i>
                        </button>
                        <button
                            className={`view-btn ${view === 'list' ? 'active' : ''}`}
                            onClick={() => setView('list')}
                            title="List View"
                        >
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="marketplace-content">
                    {/* Filters Sidebar */}
                    <aside className="filters-sidebar hidden lg:block">
                        <div className="filters-header">
                            <h2 className="filters-title">Filters</h2>
                            <span className="filters-clear" onClick={() => setActiveFilters([])}>Clear All</span>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-group-title">Category</h3>
                            {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Food & Drink', 'Fitness'].map(cat => (
                                <label key={cat} className="filter-option">
                                    <input
                                        type="checkbox"
                                        className="filter-checkbox"
                                        checked={activeFilters.includes(cat)}
                                        onChange={() => toggleFilter(cat)}
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-group-title">Price Range</h3>
                            <div className="price-range">
                                <input type="number" className="price-input w-20" placeholder="Min" />
                                <span>-</span>
                                <input type="number" className="price-input w-20" placeholder="Max" />
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-group-title">Rating</h3>
                            <label className="filter-option">
                                <input type="checkbox" className="filter-checkbox" />
                                <span>⭐ 4.5 & above</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" className="filter-checkbox" />
                                <span>⭐ 4.0 & above</span>
                            </label>
                        </div>
                    </aside>

                    {/* Products Main Area */}
                    <div className="products-main">
                        <div className="products-header">
                            <span className="products-count">
                                {loading ? 'Loading products...' : `${filteredProducts.length} items found`}
                            </span>
                            <select className="sort-select">
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="card">
                                        <div className="skeleton h-48 w-full bg-gray-200"></div>
                                        <div className="card-body">
                                            <div className="skeleton h-6 w-3/4 bg-gray-200 mb-2"></div>
                                            <div className="skeleton h-4 w-1/2 bg-gray-200"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="no-results">
                                <div className="no-results-icon"><i className="fas fa-frown"></i></div>
                                <h3>No gifts found</h3>
                                <p>Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <div className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="card hover-lift flex flex-col h-full">
                                        <Link href={`/gift/${product.id}`} className={view === 'list' ? 'flex' : ''}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className={`w-full object-contain bg-[var(--cream)] p-4 ${view === 'list' ? 'w-48 h-48' : 'h-48 rounded-t-xl'}`}
                                            />
                                            <div className="card-body flex-1 flex flex-col">
                                                {view === 'list' && <div className="text-secondary text-sm mb-1">{product.category}</div>}
                                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                                <div className="flex items-center gap-1 mb-2 text-yellow-500 text-sm">
                                                    <i className="fas fa-star"></i> <span>{product.rating}</span> <span className="text-gray-400">({product.reviews})</span>
                                                </div>
                                                <div className="text-red font-bold text-xl mt-auto mb-4">{formatCurrency(product.price)}</div>
                                                <Button variant="primary" fullWidth>View Details</Button>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
