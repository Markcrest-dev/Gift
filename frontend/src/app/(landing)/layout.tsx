import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Snowfall from '@/components/effects/Snowfall';
import ScrollReveal from '@/components/effects/ScrollReveal';

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Snowfall />
            <ScrollReveal />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
