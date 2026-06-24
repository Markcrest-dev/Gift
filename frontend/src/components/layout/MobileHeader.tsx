'use client';

import Link from 'next/link';
import { Gift, Menu } from 'lucide-react';

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-white border-b border-gray-200 z-40 px-4 flex items-center justify-between lg:hidden shadow-sm">
            <Link href="/dashboard" className="flex items-center gap-2 text-[#0A4535] font-display font-medium text-xl tracking-tight">
                <Gift className="w-6 h-6" />
                <span>Gift<span className="text-[#0A4535]/70">Exchange</span></span>
            </Link>
            <button
                className="text-gray-600 hover:text-[#0A4535] p-2 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Toggle menu"
                onClick={onMenuClick}
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
}
