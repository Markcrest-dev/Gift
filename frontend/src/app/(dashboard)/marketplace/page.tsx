'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftsApi } from '@/lib/giftFlow';

const CATEGORIES = ['electronics', 'fashion', 'toys', 'experiences', 'gift-cards', 'home', 'books'];

export default function MarketplacePage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [products, setProducts] = useState<Gift[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const loadGifts = async () => {
            setLoading(true);
            try {
                const filters: Record<string, string> = {};
                if (searchTerm) filters.search = searchTerm;
                if (activeCategory) filters.category = activeCategory;
                if (sortBy !== 'featured') filters.sort = sortBy;

                const gifts = await giftsApi.getAll(filters);
                setProducts(gifts);
            } catch (error) {
                console.error('Failed to load gifts:', error);
            }
            setLoading(false);
        };

        const debounce = setTimeout(loadGifts, 300);
        return () => clearTimeout(debounce);
    }, [searchTerm, activeCategory, sortBy]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const toggleCategory = (cat: string) => {
        setActiveCategory(activeCategory === cat ? '' : cat);
    };

    return (
        <>
            <div className="marketplace-container page-transition">
                <div className="marketplace-header text-center fade-in-up">
                    <h1 className="marketplace-title">Gift Marketplace <i className="fas fa-gift"></i></h1>
                    <p className="marketplace-subtitle">Discover the perfect gift for your loved ones</p>
                </div>

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
                        <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} title="Grid View">
                            <i className="fas fa-th"></i>
                        </button>
                        <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} title="List View">
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                </div>

                <div className="marketplace-content">
                    <aside className="filters-sidebar">
                        <div className="filters-header">
                            <h2 className="filters-title">Filters</h2>
                            <span className="filters-clear" onClick={() => setActiveCategory('')}>Clear All</span>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-group-title">Category</h3>
                            {CATEGORIES.map(cat => (
                                <label key={cat} className="filter-option">
                                    <input
                                        type="checkbox"
                                        className="filter-checkbox"
                                        checked={activeCategory === cat}
                                        onChange={() => toggleCategory(cat)}
                                    />
                                    <span className="capitalize">{cat.replace('-', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </aside>

                    <div className="products-main">
                        <div className="products-header">
                            <span className="products-count">
                                {loading ? 'Loading products...' : `${products.length} items found`}
                            </span>
                            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="card">
                                        <div className="skeleton" style={{ height: '12rem', width: '100%', background: '#e5e7eb' }}></div>
                                        <div className="card-body">
                                            <div className="skeleton" style={{ height: '1.5rem', width: '75%', background: '#e5e7eb', marginBottom: 'var(--space-sm)' }}></div>
                                            <div className="skeleton" style={{ height: '1rem', width: '50%', background: '#e5e7eb' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="no-results">
                                <div className="no-results-icon"><i className="fas fa-frown"></i></div>
                                <h3>No gifts found</h3>
                                <p>Try adjusting your filters or search terms</p>
                            </div>
                        ) : (
                            <div className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
                                {products.map(product => (
                                    <div key={product.id} className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <Link href={`/gift/${product.id}`} style={view === 'list' ? { display: 'flex' } : {}}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)', padding: 'var(--space-lg)', fontSize: '4rem', ...(view === 'list' ? { width: '12rem', height: '12rem' } : { height: '12rem', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', width: '100%' }) }}>
                                                {product.emoji || '🎁'}
                                            </div>
                                            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                {view === 'list' && <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-xs)', textTransform: 'capitalize' }}>{product.category}</div>}
                                                <h3 style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)' }}>{product.name}</h3>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: 'var(--space-sm)', color: '#eab308', fontSize: 'var(--text-sm)' }}>
                                                    <i className="fas fa-star"></i> <span>{product.rating}</span> <span style={{ color: '#9ca3af' }}>({product.reviews})</span>
                                                </div>
                                                <div style={{ color: 'var(--ruby-red)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-xl)', marginTop: 'auto', marginBottom: 'var(--space-lg)' }}>{formatCurrency(product.price)}</div>
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
