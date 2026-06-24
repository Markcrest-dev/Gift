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
        <>
            <div className="flex items-center justify-between border-b border-[#1E1A14] pb-6 mb-6">
                <div className="flex items-baseline">
                    <h1 className="text-[22px] font-semibold text-[#F5F0E8]">Browse Gifts</h1>
                    <span className="text-[#6B6055] text-[13px] ml-3">{loading ? '...' : `${products.length} items`}</span>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        className="bg-transparent text-[#C4B99A] text-[14px] focus:outline-none cursor-pointer"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest First</option>
                    </select>
                    <div className="flex gap-1">
                        <button
                            className={`p-1.5 rounded-[3px] transition-colors ${view === 'grid' ? 'text-[#F5F0E8] bg-[#1A1410]' : 'text-[#6B6055] hover:text-[#C4B99A]'}`}
                            onClick={() => setView('grid')}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                            className={`p-1.5 rounded-[3px] transition-colors ${view === 'list' ? 'text-[#F5F0E8] bg-[#1A1410]' : 'text-[#6B6055] hover:text-[#C4B99A]'}`}
                            onClick={() => setView('list')}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-2 pb-2 mb-8 hide-scrollbar">
                <button
                    className={`shrink-0 border px-[16px] py-[6px] rounded-[2px] text-[13px] transition-colors ${
                        activeCategory === '' ? 'border-[#B8922A] text-[#F5F0E8] bg-[#1A1410]' : 'border-[#2E2820] text-[#6B6055] bg-transparent hover:border-[#B8922A]'
                    }`}
                    onClick={() => setActiveCategory('')}
                >
                    All
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`shrink-0 border px-[16px] py-[6px] rounded-[2px] text-[13px] capitalize transition-colors ${
                            activeCategory === cat ? 'border-[#B8922A] text-[#F5F0E8] bg-[#1A1410]' : 'border-[#2E2820] text-[#6B6055] bg-transparent hover:border-[#B8922A]'
                        }`}
                        onClick={() => toggleCategory(cat)}
                    >
                        {cat.replace('-', ' ')}
                    </button>
                ))}
            </div>

            <div>
                {loading ? (
                    <div className={`grid gap-4 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={`bg-[#1C1814] border border-[#1E1A14] rounded-[3px] overflow-hidden animate-pulse ${i === 1 && view === 'grid' ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                <div className={`${i === 1 && view === 'grid' ? 'aspect-video' : 'aspect-[4/3]'} bg-paper/5`} />
                                <div className="p-4">
                                    <div className="h-4 bg-paper/10 rounded mb-2 w-3/4" />
                                    <div className="h-3 bg-paper/10 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-[#6B6055] text-[14px] mb-4">No gifts found matching your criteria</p>
                        <Button variant="ghost" size="sm" onClick={() => { setSearchTerm(''); setActiveCategory(''); }}>Clear Filters</Button>
                    </div>
                ) : (
                    <div className={`grid gap-4 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {products.map((product, index) => {
                            const isFeatured = index === 0 && view === 'grid';
                            return (
                                <Link 
                                    key={product.id} 
                                    href={`/gift/${product.id}`} 
                                    className={`group bg-[#1C1814] border border-[#1E1A14] rounded-[3px] overflow-hidden transition-all duration-200 hover:border-[#2E2820] hover:shadow-[inset_0_2px_0_0_#B8922A] ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}`}
                                >
                                    <div className={`bg-[#141210] flex items-center justify-center ${isFeatured ? 'aspect-video' : 'aspect-[4/3]'}`}>
                                        <GiftPlaceholder name={product.name} />
                                    </div>
                                    <div className="p-[16px] md:p-[20px] relative">
                                        {isFeatured && (
                                            <div className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em] mb-2">● Featured</div>
                                        )}
                                        <div className="text-[#B8922A] text-[11px] font-medium uppercase tracking-[0.12em] mb-1">{product.category || 'Gift'}</div>
                                        <h3 className="text-[#F5F0E8] text-[16px] font-medium mb-1">{product.name}</h3>
                                        <div className="text-[#6B6055] text-[12px] mb-3">★ {product.rating} · {product.reviews} reviews</div>
                                        <div className={`font-mono text-[#F5F0E8] ${isFeatured ? 'text-[24px]' : 'text-[18px]'}`}>
                                            {formatCurrency(product.price)}
                                        </div>
                                        
                                        <div className="absolute right-5 bottom-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[#B8922A] text-[13px] font-medium">Send as Gift →</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
