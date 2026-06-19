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

    // Don't render dashboard content until auth is confirmed
    if (!authChecked) {
        return null;
    }

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
            <main className="main-content">
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
