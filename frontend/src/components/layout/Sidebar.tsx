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
                fixed top-0 left-0 w-[280px] h-screen bg-surface border-r border-sage-deep flex flex-col z-50
                transition-transform duration-300
                max-lg:translate-x-[-100%] lg:translate-x-0
                ${isOpen ? 'max-lg:!translate-x-0' : ''}
            `}>
                <Link href="/dashboard" className="flex items-center gap-3 px-8 py-8 text-ink font-display text-2xl tracking-tight">
                    <div className="w-7 h-7 rounded-md bg-emerald flex items-center justify-center">
                        <Gift className="w-4 h-4 text-white" />
                    </div>
                    <span>Gift<span className="text-ink-muted">Exchange</span></span>
                </Link>

                <nav className="flex-1 overflow-y-auto px-4 mt-4">
                    <div className="text-[0.6875rem] font-bold text-ink-faint uppercase tracking-widest mb-4 px-4">Menu</div>
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`
                                            flex items-center px-4 py-3 text-[0.9375rem] font-medium transition-all duration-200 rounded-md border-l-2
                                            ${active
                                                ? 'text-emerald bg-sage border-emerald'
                                                : 'text-ink-muted border-transparent hover:text-ink hover:bg-base'
                                            }
                                        `}
                                        onClick={onClose}
                                    >
                                        <Icon className={`w-5 h-5 mr-3 ${active ? 'text-emerald' : 'text-ink-faint group-hover:text-ink-muted'}`} />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-sage-deep p-4 mx-4 mb-4">
                    <div className="flex items-center gap-3 mb-4 px-2 py-2">
                        <div className="w-9 h-9 rounded-md bg-emerald flex items-center justify-center text-[0.875rem] font-bold text-white">
                            M
                        </div>
                        <div>
                            <div className="text-ink font-medium text-[0.9375rem] leading-tight">Mark</div>
                            <div className="text-ink-muted text-[0.8125rem]">mark@example.com</div>
                        </div>
                    </div>
                    <button
                        className="w-full flex items-center px-4 py-2.5 text-[0.9375rem] font-medium text-red-dark hover:bg-red-light/50 transition-colors duration-200 rounded-md border-l-2 border-transparent"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={onClose} />}
        </>
    );
}
