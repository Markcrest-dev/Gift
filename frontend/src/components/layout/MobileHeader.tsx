'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-surface border-b border-sage-deep z-40 px-6 flex items-center justify-between lg:hidden">
            <Link href="/dashboard" className="flex items-center gap-2.5 text-ink font-display text-xl tracking-tight">
                <Image 
                    src="/festow-logo.png" 
                    alt="Festow" 
                    width={28} 
                    height={28} 
                    className="h-7 w-auto object-contain rounded-md" 
                />
                <span>Festow</span>
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
