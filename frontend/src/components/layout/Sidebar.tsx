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
                fixed top-0 left-0 w-[280px] h-screen bg-white border-r border-gray-200 flex flex-col z-50
                transition-transform duration-300 shadow-xl lg:shadow-none
                max-lg:translate-x-[-100%] lg:translate-x-0
                ${isOpen ? 'max-lg:!translate-x-0' : ''}
            `}>
                <Link href="/dashboard" className="flex items-center gap-3 px-6 py-8 text-[#0A4535] font-display font-medium text-2xl tracking-tight">
                    <Gift className="w-7 h-7" />
                    <span>Gift<span className="text-[#0A4535]/70">Exchange</span></span>
                </Link>

                <nav className="flex-1 overflow-y-auto px-4 mt-2">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Menu</div>
                    <ul className="space-y-1.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`
                                            flex items-center px-4 py-3 text-[15px] font-medium transition-all duration-200 rounded-xl
                                            ${active
                                                ? 'text-[#0A4535] bg-[#D1FAE5] shadow-sm'
                                                : 'text-gray-500 hover:text-[#0A4535] hover:bg-gray-50'
                                            }
                                        `}
                                        onClick={onClose}
                                    >
                                        <Icon className={`w-5 h-5 mr-3 ${active ? 'text-[#0A4535]' : 'text-gray-400 group-hover:text-[#0A4535]'}`} />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-gray-100 p-4 mx-2 mb-2">
                    <div className="flex items-center gap-3 mb-4 px-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-[#0d5c46] flex items-center justify-center text-sm font-bold text-white shadow-md">
                            M
                        </div>
                        <div>
                            <div className="text-[#0A4535] font-semibold text-sm">Mark</div>
                            <div className="text-gray-400 text-xs">mark@example.com</div>
                        </div>
                    </div>
                    <button
                        className="w-full flex items-center px-4 py-3 text-[15px] font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-xl"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={onClose} />}
        </>
    );
}
