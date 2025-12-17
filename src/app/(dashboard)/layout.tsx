'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
            <main className="main-content">
                <div className="container mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
