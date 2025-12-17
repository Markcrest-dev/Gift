'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: 'fa-chart-pie' },
        { name: 'Browse Gifts', path: '/marketplace', icon: 'fa-gift' },
        { name: 'Gifts Sent', path: '/gifts-sent', icon: 'fa-paper-plane' },
        { name: 'Gifts Received', path: '/gifts-received', icon: 'fa-inbox' },
        { name: 'Wishlist', path: '/wishlist', icon: 'fa-star' },
        { name: 'Settings', path: '/settings', icon: 'fa-cog' },
    ];

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
                <Link href="/" className="sidebar-logo">
                    <span><i className="fas fa-gift"></i></span>
                    <span>GiftExchange</span>
                </Link>

                <nav>
                    <ul className="sidebar-menu">
                        {menuItems.map((item) => (
                            <li key={item.path} className="sidebar-menu-item">
                                <Link
                                    href={item.path}
                                    className={`sidebar-menu-link ${isActive(item.path) ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    <span className="sidebar-menu-icon"><i className={`fas ${item.icon}`}></i></span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-menu-link" onClick={(e) => { e.preventDefault(); /* Logout logic */ console.log('Logout'); }}>
                                <span className="sidebar-menu-icon"><i className="fas fa-sign-out-alt"></i></span>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {isOpen && <div className="mobile-overlay active" id="mobileOverlay" onClick={onClose}></div>}
        </>
    );
}
