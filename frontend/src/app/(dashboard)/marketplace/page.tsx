'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftsApi } from '@/lib/giftFlow';
import { Search, Grid3X3, List } from 'lucide-react';
import GiftPlaceholder from '@/components/ui/GiftPlaceholder';

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
        <div className="font-body pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
                <div className="flex items-baseline">
                    <h1 className="text-3xl font-display text-[#0A4535]">Browse Gifts</h1>
                    <span className="text-gray-500 text-sm ml-4 font-medium bg-white px-3 py-1 rounded-full shadow-sm">{loading ? '...' : `${products.length} items`}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <select
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-full px-4 py-2 focus:outline-none focus:border-[#0A4535] shadow-sm cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest First</option>
                    </select>
                    <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
                        <button
                            className={`p-2 rounded-full transition-colors ${view === 'grid' ? 'text-[#0A4535] bg-[#D1FAE5]' : 'text-gray-400 hover:text-[#0A4535]'}`}
                            onClick={() => setView('grid')}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                            className={`p-2 rounded-full transition-colors ${view === 'list' ? 'text-[#0A4535] bg-[#D1FAE5]' : 'text-gray-400 hover:text-[#0A4535]'}`}
                            onClick={() => setView('list')}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-2 pb-4 mb-6 hide-scrollbar">
                <button
                    className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                        activeCategory === '' ? 'text-white bg-[#0A4535]' : 'text-gray-600 bg-white border border-gray-200 hover:border-[#0A4535] hover:text-[#0A4535]'
                    }`}
                    onClick={() => setActiveCategory('')}
                >
                    All
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all shadow-sm ${
                            activeCategory === cat ? 'text-white bg-[#0A4535]' : 'text-gray-600 bg-white border border-gray-200 hover:border-[#0A4535] hover:text-[#0A4535]'
                        }`}
                        onClick={() => toggleCategory(cat)}
                    >
                        {cat.replace('-', ' ')}
                    </button>
                ))}
            </div>

            <div>
                {loading ? (
                    <div className={`grid gap-6 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={`bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-pulse ${i === 1 && view === 'grid' ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                <div className={`${i === 1 && view === 'grid' ? 'aspect-video' : 'aspect-[4/3]'} bg-gray-100`} />
                                <div className="p-6">
                                    <div className="h-5 bg-gray-200 rounded-full mb-3 w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-gray-500 text-base mb-6">No gifts found matching your criteria</p>
                        <Button variant="primary" size="md" onClick={() => { setSearchTerm(''); setActiveCategory(''); }}>Clear Filters</Button>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {products.map((product, index) => {
                            const isFeatured = index === 0 && view === 'grid';
                            return (
                                <Link 
                                    key={product.id} 
                                    href={`/gift/${product.id}`} 
                                    className={`group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
                                >
                                    <div className={`bg-gray-50 flex items-center justify-center border-b border-gray-100 ${isFeatured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                                        <GiftPlaceholder name={product.name} />
                                    </div>
                                    <div className="p-6 md:p-8">
                                        {isFeatured && (
                                            <div className="inline-block bg-[#0A4535] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Featured</div>
                                        )}
                                        <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{product.category || 'Gift'}</div>
                                        <h3 className="text-[#0A4535] text-xl font-display mb-2 group-hover:text-[#0A4535]/70 transition-colors">{product.name}</h3>
                                        <div className="text-amber-500 text-sm mb-4 font-semibold">★ {product.rating} <span className="text-gray-400 font-medium">· {product.reviews} reviews</span></div>
                                        <div className={`font-mono text-gray-900 font-bold ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
                                            {formatCurrency(product.price)}
                                        </div>
                                        
                                        <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                            <span className="bg-[#D1FAE5] text-[#0A4535] px-4 py-2 rounded-full text-sm font-bold shadow-sm">Send Gift &rarr;</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
