import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>

        <div className="container hero-content">
          <h1 className="hero-title fade-in-up">
            Share Joy Globally<br />This Christmas <i className="fas fa-tree"></i>
          </h1>
          <p className="hero-subtitle fade-in-up stagger-1">
            Send meaningful gifts to loved ones worldwide. Recipients can choose cash or cryptocurrency redemption with just a few clicks.
          </p>

          <div className="hero-actions fade-in-up stagger-2">
            <Link href="/signup" className="btn btn-outline-white btn-lg">
              Start Giving
            </Link>
            <Link href="/marketplace" className="btn btn-gold btn-lg">
              Browse Gifts
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
      </section>

      {/* How It Works Section */}
      <section className="section bg-primary">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="reveal">How It Works</h2>
            <p className="text-secondary reveal">Send gifts in three simple steps</p>
          </div>

          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card fade-in-up stagger-1">
              <div className="step-icon">🎯</div>
              <div className="step-number">01</div>
              <h3 className="step-title">Choose a Gift</h3>
              <p className="step-description">
                Browse our curated catalog of premium gifts, from electronics to experiences. Filter by category, price, and gender preference.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card fade-in-up stagger-2">
              <div className="step-icon">✉️</div>
              <div className="step-number">02</div>
              <h3 className="step-title">Add Details</h3>
              <p className="step-description">
                Enter recipient information, add a personal message, and choose your preferred delivery method. We handle the rest.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card fade-in-up stagger-3">
              <div className="step-icon">🎉</div>
              <div className="step-number">03</div>
              <h3 className="step-title">They Receive</h3>
              <p className="step-description">
                Recipients get notified and can choose to receive the gift directly or claim its value in cash or cryptocurrency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="reveal">Why Choose Us</h2>
            <p className="text-secondary reveal">Premium gifting experience, globally accessible</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card fade-in-up stagger-${index + 1}`}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-primary">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="reveal">What Our Users Say</h2>
            <p className="text-secondary reveal">Join thousands of satisfied gift givers</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`testimonial-card fade-in-up stagger-${index + 1}`}>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star" style={{ color: 'var(--gold)' }}></i>
                  ))}
                </div>
                <p className="testimonial-text">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-location">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

const features = [
  {
    icon: "fas fa-globe",
    title: "Global Reach",
    description: "Send gifts to over 120 countries with support for multiple currencies and languages."
  },
  {
    icon: "fas fa-coins",
    title: "Flexible Redemption",
    description: "Recipients choose between cash, cryptocurrency, or physical delivery."
  },
  {
    icon: "fas fa-lock",
    title: "Secure & Safe",
    description: "Bank-level encryption and compliance with international regulations."
  },
  {
    icon: "fas fa-bolt",
    title: "Instant Delivery",
    description: "Digital notifications delivered instantly, anywhere in the world."
  },
  {
    icon: "fas fa-bullseye",
    title: "Personalized",
    description: "Filter by gender, age, and preferences to find the perfect gift."
  },
  {
    icon: "fas fa-chart-line",
    title: "Track Everything",
    description: "Real-time tracking of sent and received gifts from your dashboard."
  }
];

const testimonials = [
  {
    text: "Sent my sister an iPhone from the US to Nigeria. She received the cash value instantly. Amazing service!",
    name: "Sarah Johnson",
    location: "New York, USA"
  },
  {
    text: "The crypto redemption option is brilliant! Received a gift and converted it to Bitcoin seamlessly.",
    name: "Michael Chen",
    location: "Singapore"
  },
  {
    text: "Perfect for international families! Sent Christmas gifts to 5 family members in different countries.",
    name: "Emma Rodriguez",
    location: "London, UK"
  }
];
