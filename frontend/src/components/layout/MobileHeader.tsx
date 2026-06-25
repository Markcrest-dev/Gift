'use client';

import Link from 'next/link';
import { Gift, Menu } from 'lucide-react';

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-surface border-b border-sage-deep z-40 px-6 flex items-center justify-between lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2.5 text-ink font-display text-xl tracking-tight">
                <div className="w-7 h-7 rounded-md bg-emerald flex items-center justify-center">
                    <Gift className="w-4 h-4 text-white" />
                </div>
                <span>Gift<span className="text-ink-muted">Exchange</span></span>
            </Link>
            <button
                className="text-ink-muted hover:text-ink p-2 -mr-2 transition-colors rounded-md hover:bg-base"
                aria-label="Toggle menu"
                onClick={onMenuClick}
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
}
