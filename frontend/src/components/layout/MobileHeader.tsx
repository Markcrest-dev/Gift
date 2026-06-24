'use client';

import Link from 'next/link';
import { Gift, Menu } from 'lucide-react';

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-[60px] bg-base border-b border-paper/5 z-40 px-4 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-gold font-body font-medium text-sm">
                <Gift className="w-4 h-4" />
                <span>Global Gift Exchange</span>
            </Link>
            <button
                className="text-paper/50 hover:text-paper p-2 transition-colors"
                aria-label="Toggle menu"
                onClick={onMenuClick}
            >
                <Menu className="w-5 h-5" />
            </button>
        </div>
    );
}
