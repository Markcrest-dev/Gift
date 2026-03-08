
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AboutPage() {
    return (
        <div className="about-container">
            {/* Mission Section */}
            <div className="card fade-in-up mb-3xl">
                <div className="card-body" style={{ textAlign: 'center' }}>
                    <h2 className="section-title mb-lg">Our Mission</h2>
                    <p className="text-lg text-secondary leading-relaxed" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Global Gift Exchange is revolutionizing the way people send and receive gifts across borders.
                        We believe that distance should never be a barrier to spreading joy and showing appreciation.
                        Our platform makes it simple, secure, and delightful to send meaningful gifts to loved ones anywhere
                        in the world.
                    </p>
                </div>
            </div>

            {/* Stats Showcase */}
            <div className="stats-showcase fade-in-up">
                <div className="stat-showcase-card">
                    <div className="stat-showcase-number">10K+</div>
                    <div className="font-semibold">Happy Users</div>
                </div>

                <div className="stat-showcase-card">
                    <div className="stat-showcase-number">50K+</div>
                    <div className="font-semibold">Gifts Sent</div>
                </div>

                <div className="stat-showcase-card">
                    <div className="stat-showcase-number">120+</div>
                    <div className="font-semibold">Countries</div>
                </div>

                <div className="stat-showcase-card">
                    <div className="stat-showcase-number">98%</div>
                    <div className="font-semibold">Satisfaction</div>
                </div>
            </div>

            {/* Our Values */}
            <div className="text-center mb-2xl fade-in-up">
                <h2 className="section-title">Our Core Values</h2>
                <p className="text-secondary">The principles that guide everything we do</p>
            </div>

            <div className="values-grid fade-in-up">
                <div className="value-card">
                    <div className="value-icon"><i className="fas fa-globe"></i></div>
                    <h3 className="font-bold mb-md">Global Reach</h3>
                    <p className="text-secondary">
                        Connecting people across continents, cultures, and time zones with seamless gift delivery.
                    </p>
                </div>

                <div className="value-card">
                    <div className="value-icon"><i className="fas fa-lock"></i></div>
                    <h3 className="font-bold mb-md">Security First</h3>
                    <p className="text-secondary">
                        Your trust is our priority. We ensure every transaction is safe, secure, and protected.
                    </p>
                </div>

                <div className="value-card">
                    <div className="value-icon"><i className="fas fa-lightbulb"></i></div>
                    <h3 className="font-bold mb-md">Innovation</h3>
                    <p className="text-secondary">
                        Constantly improving our platform with cutting-edge features and user-friendly design.
                    </p>
                </div>

                <div className="value-card">
                    <div className="value-icon"><i className="fas fa-heart"></i></div>
                    <h3 className="font-bold mb-md">Generosity</h3>
                    <p className="text-secondary">
                        Promoting a culture of giving back, with options to donate gift value to charity.
                    </p>
                </div>

                <div className="value-card">
                    <div className="value-icon"><i className="fas fa-bolt"></i></div>
                    <h3 className="font-bold mb-md">Speed</h3>
                    <p className="text-secondary">
                        Fast processing and delivery times so your gifts arrive when they matter most.
                    </p>
                </div>

                <div className="value-card">
                    <div className="value-icon"><i className="fas fa-star"></i></div>
                    <h3 className="font-bold mb-md">Excellence</h3>
                    <p className="text-secondary">
                        Curated selection of premium gifts to ensure quality in every package sent.
                    </p>
                </div>
            </div>

            {/* How It Works */}
            <div className="card fade-in-up mt-3xl">
                <div className="card-body">
                    <h2 className="section-title text-center mb-2xl">How It Works</h2>

                    <div className="grid grid-cols-3 gap-xl">
                        <div className="text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}><i className="fas fa-search"></i>
                            </div>
                            <h3 className="font-bold mb-md">Browse & Select</h3>
                            <p className="text-secondary">Choose from our curated collection of premium gifts</p>
                        </div>

                        <div className="text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}><i className="fas fa-pencil-alt"></i>
                            </div>
                            <h3 className="font-bold mb-md">Personalize</h3>
                            <p className="text-secondary">Add a heartfelt message and schedule delivery</p>
                        </div>

                        <div className="text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}><i className="fas fa-paper-plane"></i>
                            </div>
                            <h3 className="font-bold mb-md">Send & Track</h3>
                            <p className="text-secondary">Recipient can claim as physical gift, cash, or crypto</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
