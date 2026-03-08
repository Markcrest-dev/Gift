import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background"></div>
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title fade-in-up">
                            Share Joy Globally<br />This Christmas <i className="fas fa-tree"></i>
                        </h1>
                        <p className="hero-subtitle fade-in-up stagger-1">
                            Send meaningful gifts to loved ones worldwide. Recipients can choose cash or cryptocurrency redemption with just a few clicks.
                        </p>
                        <div className="hero-actions fade-in-up stagger-2">
                            <Link href="/signup">
                                <Button size="lg" variant="primary">Start Giving</Button>
                            </Link>
                            <Link href="/marketplace">
                                <Button size="lg" variant="outline-white">Browse Gifts</Button>
                            </Link>
                        </div>
                        <div className="hero-stats fade-in-up stagger-3">
                            <div className="stat-item">
                                <div className="stat-number">50K+</div>
                                <div className="stat-label">Gifts Sent</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">120+</div>
                                <div className="stat-label">Countries</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">98%</div>
                                <div className="stat-label">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="reveal">How It Works</h2>
                        <p className="text-secondary reveal">Send gifts in three simple steps</p>
                    </div>

                    <div className="steps-grid">
                        <div className="step-card reveal stagger-1">
                            <div className="step-icon"><i className="fas fa-bullseye"></i></div>
                            <div className="step-number">01</div>
                            <h3 className="step-title">Choose a Gift</h3>
                            <p className="step-description">
                                Browse our curated catalog of premium gifts, from electronics to experiences. Filter by category, price, and gender preference.
                            </p>
                        </div>

                        <div className="step-card reveal stagger-2">
                            <div className="step-icon"><i className="fas fa-envelope-open-text"></i></div>
                            <div className="step-number">02</div>
                            <h3 className="step-title">Add Details</h3>
                            <p className="step-description">
                                Enter recipient information, add a personal message, and choose your preferred delivery method. We handle the rest.
                            </p>
                        </div>

                        <div className="step-card reveal stagger-3">
                            <div className="step-icon"><i className="fas fa-party-horn"></i></div>
                            <div className="step-number">03</div>
                            <h3 className="step-title">They Receive</h3>
                            <p className="step-description">
                                Recipients get notified and can choose to receive the gift directly or claim its value in cash or cryptocurrency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Highlight Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="reveal">Why Choose Us</h2>
                        <p className="text-secondary reveal">Premium gifting experience, globally accessible</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card reveal stagger-1">
                            <div className="feature-icon"><i className="fas fa-globe"></i></div>
                            <h3 className="feature-title">Global Reach</h3>
                            <p className="feature-description">
                                Send gifts to over 120 countries with support for multiple currencies and languages.
                            </p>
                        </div>

                        <div className="feature-card reveal stagger-2">
                            <div className="feature-icon"><i className="fas fa-coins"></i></div>
                            <h3 className="feature-title">Flexible Redemption</h3>
                            <p className="feature-description">
                                Recipients choose between cash, cryptocurrency, or physical delivery.
                            </p>
                        </div>

                        <div className="feature-card reveal stagger-3">
                            <div className="feature-icon"><i className="fas fa-lock"></i></div>
                            <h3 className="feature-title">Secure & Safe</h3>
                            <p className="feature-description">
                                Bank-level encryption and compliance with international regulations.
                            </p>
                        </div>

                        <div className="feature-card reveal stagger-4">
                            <div className="feature-icon"><i className="fas fa-bolt"></i></div>
                            <h3 className="feature-title">Instant Delivery</h3>
                            <p className="feature-description">
                                Digital notifications delivered instantly, anywhere in the world.
                            </p>
                        </div>

                        <div className="feature-card reveal stagger-5">
                            <div className="feature-icon"><i className="fas fa-bullseye"></i></div>
                            <h3 className="feature-title">Personalized</h3>
                            <p className="feature-description">
                                Filter by gender, age, and preferences to find the perfect gift.
                            </p>
                        </div>

                        <div className="feature-card reveal stagger-6">
                            <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
                            <h3 className="feature-title">Track Everything</h3>
                            <p className="feature-description">
                                Real-time tracking of sent and received gifts from your dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section bg-secondary">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="reveal">What Our Users Say</h2>
                        <p className="text-secondary reveal">Join thousands of satisfied gift givers</p>
                    </div>

                    <div className="testimonials-grid">
                        <div className="testimonial-card reveal stagger-1">
                            <div className="testimonial-rating">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            </div>
                            <p className="testimonial-text">
                                &quot;Sent my sister an iPhone from the US to Nigeria. She received the cash value instantly. Amazing service!&quot;
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar"><i className="fas fa-user-circle"></i></div>
                                <div>
                                    <div className="author-name">Sarah Johnson</div>
                                    <div className="author-location">New York, USA</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card reveal stagger-2">
                            <div className="testimonial-rating">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            </div>
                            <p className="testimonial-text">
                                &quot;The crypto redemption option is brilliant! Received a gift and converted it to Bitcoin seamlessly.&quot;
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar"><i className="fas fa-user-circle"></i></div>
                                <div>
                                    <div className="author-name">Michael Chen</div>
                                    <div className="author-location">Singapore</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card reveal stagger-3">
                            <div className="testimonial-rating">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            </div>
                            <p className="testimonial-text">
                                &quot;Perfect for international families! Sent Christmas gifts to 5 family members in different countries.&quot;
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar"><i className="fas fa-user-circle"></i></div>
                                <div>
                                    <div className="author-name">Emma Rodriguez</div>
                                    <div className="author-location">London, UK</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
