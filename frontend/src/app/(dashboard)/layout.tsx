'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import { auth } from '@/lib/auth';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated()) {
            router.replace('/login');
        } else {
            setAuthChecked(true);
        }
    }, [router]);

    if (!authChecked) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-[var(--color-base)] font-body">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 lg:ml-[280px] h-screen overflow-y-auto p-4 sm:p-6 lg:p-10 pt-[calc(70px+1.5rem)] lg:pt-10 transition-all duration-300">
                <div className="max-w-[1200px] mx-auto pb-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
