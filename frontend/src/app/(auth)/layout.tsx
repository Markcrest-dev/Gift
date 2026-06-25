import Navbar from '@/components/layout/Navbar';
import ScrollReveal from '@/components/effects/ScrollReveal';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ScrollReveal />
            <Navbar />
            {children}
        </>
    );
}
