import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <div className="bg-primary">
                {/* Hero Section */}
                <section className="hero-section" style={{ minHeight: '50vh' }}>
                    <div className="hero-background"></div>
                    <div className="container hero-content text-center">
                        <h1 className="hero-title">About GiftExchange</h1>
                        <p className="hero-subtitle">
                            Connecting hearts across borders through meaningful gifts
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="section bg-primary">
                    <div className="container" style={{ maxWidth: '800px' }}>
                        <h2 className="text-center mb-xl">Our Mission</h2>
                        <p className="text-lg text-secondary mb-lg" style={{ lineHeight: '1.75' }}>
                            GiftExchange was founded with a simple yet powerful mission: to make global gift-giving accessible, secure, and joyful for everyone. We believe that distance should never be a barrier to showing love and appreciation to the people who matter most.
                        </p>
                        <p className="text-lg text-secondary mb-lg" style={{ lineHeight: '1.75' }}>
                            Our platform enables you to send carefully curated gifts to loved ones across 120+ countries, with the unique flexibility for recipients to choose how they want to receive their gift – whether as a physical item, cash value, cryptocurrency, or even as a charitable donation.
                        </p>
                        <p className="text-lg text-secondary" style={{ lineHeight: '1.75' }}>
                            With bank-level security, instant delivery notifications, and comprehensive tracking, we've reimagined the gifting experience for the modern, globally-connected world.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="section bg-secondary">
                    <div className="container">
                        <h2 className="text-center mb-xl">Our Values</h2>
                        <div className="features-grid">
                            <div className="feature-card text-center">
                                <div className="feature-icon">
                                    <i className="fas fa-heart"></i>
                                </div>
                                <h3 className="feature-title">Care</h3>
                                <p className="feature-description">
                                    Every gift tells a story. We care about making each experience meaningful and memorable.
                                </p>
                            </div>
                            <div className="feature-card text-center">
                                <div className="feature-icon">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <h3 className="feature-title">Trust</h3>
                                <p className="feature-description">
                                    Your security is our priority. We maintain the highest standards of data protection and compliance.
                                </p>
                            </div>
                            <div className="feature-card text-center">
                                <div className="feature-icon">
                                    <i className="fas fa-lightbulb"></i>
                                </div>
                                <h3 className="feature-title">Innovation</h3>
                                <p className="feature-description">
                                    We continuously evolve to offer cutting-edge features like crypto redemption and global reach.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
