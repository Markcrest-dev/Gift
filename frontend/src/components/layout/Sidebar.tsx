'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { LayoutDashboard, Gift, Send, Inbox, Star, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        auth.logout();
        router.push('/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Browse Gifts', path: '/marketplace', icon: Gift },
        { name: 'Gifts Sent', path: '/gifts-sent', icon: Send },
        { name: 'Gifts Received', path: '/gifts-received', icon: Inbox },
        { name: 'Wishlist', path: '/wishlist', icon: Star },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <>
            <aside className={`
                fixed top-0 left-0 w-[260px] h-screen bg-surface border-r border-paper/5 py-8 overflow-y-auto z-50
                transition-transform duration-300
                max-lg:translate-x-[-100%] lg:translate-x-0
                ${isOpen ? 'max-lg:!translate-x-0' : ''}
            `}>
                <Link href="/" className="flex items-center gap-2 px-6 mb-10 text-gold font-body font-medium text-base">
                    <Gift className="w-4 h-4" />
                    <span>Global Gift Exchange</span>
                </Link>

                <nav>
                    <ul className="space-y-0.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`
                                            flex items-center gap-3 px-6 py-2.5 text-sm transition-colors duration-150
                                            ${active
                                                ? 'text-paper bg-paper/5 border-l-2 border-gold'
                                                : 'text-paper/40 hover:text-paper/70 hover:bg-paper/3 border-l-2 border-transparent'
                                            }
                                        `}
                                        onClick={onClose}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <li>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-2.5 text-sm text-paper/30 hover:text-red/80 transition-colors duration-150 border-l-2 border-transparent"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-base/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
        </>
    );
}
