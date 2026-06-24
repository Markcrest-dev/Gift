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
                fixed top-0 left-0 w-[260px] h-screen bg-[#0A0806] border-r border-[#1A1510] flex flex-col z-50
                transition-transform duration-300
                max-lg:translate-x-[-100%] lg:translate-x-0
                ${isOpen ? 'max-lg:!translate-x-0' : ''}
            `}>
                <Link href="/" className="flex items-center gap-2 px-5 py-6 border-b border-[#1A1510] text-[#F5F0E8] font-body font-semibold text-[14px] mb-4">
                    <Gift className="w-4 h-4" />
                    <span>Global Gift Exchange</span>
                </Link>

                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-0.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`
                                            flex items-center px-5 py-[11px] text-[14px] transition-colors duration-150 border-l-[2px]
                                            ${active
                                                ? 'text-[#F5F0E8] bg-[#161210] border-[#B8922A]'
                                                : 'text-[#6B6055] hover:text-[#C4B99A] hover:bg-[#131010] border-transparent'
                                            }
                                        `}
                                        onClick={onClose}
                                    >
                                        <Icon className="w-4 h-4 mr-3" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto border-t border-[#1A1510] p-4">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <div className="w-[32px] h-[32px] rounded-full bg-[#1C1814] border border-[#2E2820] flex items-center justify-center text-[13px] text-[#F5F0E8]">
                            M
                        </div>
                        <span className="text-[#F5F0E8] text-[14px]">Mark</span>
                    </div>
                    <a
                        href="#"
                        className="flex items-center px-5 py-[11px] text-[14px] text-[#6B6055] hover:text-[#C4B99A] hover:bg-[#131010] transition-colors duration-150 border-l-[2px] border-transparent"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-[#0A0806]/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
        </>
    );
}
