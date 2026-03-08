'use client';

import Link from 'next/link';

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
    return (
        <div className="mobile-header">
            <Link href="/" className="mobile-header-logo">
                <i className="fas fa-gift"></i>
                <span>GiftExchange</span>
            </Link>
            <button
                className="mobile-menu-btn"
                id="mobileSidebarBtn"
                aria-label="Toggle menu"
                onClick={onMenuClick}
            >
                <i className="fas fa-bars"></i>
            </button>
        </div>
    );
}
