'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftsApi } from '@/lib/giftFlow';
import { Search, Grid3X3, List } from 'lucide-react';

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
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-paper mb-2">Marketplace</h1>
                <p className="text-paper/40 text-sm">Find the perfect gift for anyone, anywhere</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/25" />
                    <input
                        type="text"
                        className="w-full bg-surface border border-paper/10 rounded-[4px] pl-10 pr-4 py-2.5 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Search gifts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        className={`p-2.5 rounded-[4px] border transition-colors ${view === 'grid' ? 'border-gold/40 text-gold' : 'border-paper/10 text-paper/30 hover:text-paper/50'}`}
                        onClick={() => setView('grid')}
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                        className={`p-2.5 rounded-[4px] border transition-colors ${view === 'list' ? 'border-gold/40 text-gold' : 'border-paper/10 text-paper/30 hover:text-paper/50'}`}
                        onClick={() => setView('list')}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-[200px] shrink-0">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-paper/60 text-xs font-medium uppercase tracking-wider">Categories</h2>
                        {activeCategory && (
                            <button className="text-gold/60 text-xs hover:text-gold transition-colors" onClick={() => setActiveCategory('')}>Clear</button>
                        )}
                    </div>
                    <div className="flex flex-wrap lg:flex-col gap-1.5">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`text-left text-sm px-3 py-1.5 rounded-[4px] capitalize transition-colors ${
                                    activeCategory === cat ? 'bg-gold/10 text-gold' : 'text-paper/40 hover:text-paper/60 hover:bg-paper/3'
                                }`}
                                onClick={() => toggleCategory(cat)}
                            >
                                {cat.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-paper/30 text-sm">
                            {loading ? 'Loading...' : `${products.length} items`}
                        </span>
                        <select
                            className="bg-surface border border-paper/10 rounded-[4px] px-3 py-1.5 text-paper/60 text-sm focus:outline-none focus:border-gold transition-colors"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className={`grid ${view === 'list' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-3`}>
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-surface rounded-lg overflow-hidden animate-pulse">
                                    <div className="h-36 bg-paper/3" />
                                    <div className="p-4">
                                        <div className="h-4 bg-paper/5 rounded mb-2 w-3/4" />
                                        <div className="h-3 bg-paper/5 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-paper/30 text-sm mb-4">No gifts found matching your criteria</p>
                            <Button variant="ghost" size="sm" onClick={() => { setSearchTerm(''); setActiveCategory(''); }}>Clear Filters</Button>
                        </div>
                    ) : (
                        <div className={`grid ${view === 'list' ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-3`}>
                            {products.map(product => (
                                <Link key={product.id} href={`/gift/${product.id}`} className="bg-surface rounded-lg overflow-hidden group">
                                    <div className="h-36 flex items-center justify-center text-5xl bg-paper/3">
                                        {product.emoji || '🎁'}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-paper text-sm font-medium truncate mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-gold/60 text-xs">★ {product.rating}</span>
                                            <span className="text-paper/20 text-xs">({product.reviews})</span>
                                        </div>
                                        <div className="font-mono text-paper font-medium text-base">{formatCurrency(product.price)}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
