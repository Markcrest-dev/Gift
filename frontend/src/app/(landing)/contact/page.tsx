'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <>
            {/* Hero */}
            <div className="contact-hero fade-in-up">
                <h1 className="hero-title">Get in Touch</h1>
                <p className="hero-subtitle">We&apos;re here to help with any questions or concerns</p>
            </div>

            {/* Contact Container */}
            <div className="contact-container">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="card fade-in-left">
                        <div className="card-body">
                            <h2 className="card-title mb-lg">Send Us a Message</h2>

                            <form onSubmit={handleSubmit} id="contactForm">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-input"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-input"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">Subject *</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="form-input"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message *</label>
                                    <textarea
                                        id="message"
                                        className="form-input"
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    fullWidth
                                    size="lg"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="fade-in-right">
                        <div className="contact-info-card mb-lg">
                            <h2 className="card-title mb-lg">Contact Information</h2>

                            <div className="contact-method">
                                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                                <div>
                                    <div className="font-semibold">Email</div>
                                    <div className="text-secondary">support@giftexchange.com</div>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                                <div>
                                    <div className="font-semibold">Phone</div>
                                    <div className="text-secondary">+1 (555) 123-4567</div>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-icon"><i className="fas fa-comments"></i></div>
                                <div>
                                    <div className="font-semibold">Live Chat</div>
                                    <div className="text-secondary">Available 24/7</div>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-icon"><i className="fab fa-twitter"></i></div>
                                <div>
                                    <div className="font-semibold">Twitter</div>
                                    <div className="text-secondary">@GiftExchange</div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <h3 className="font-semibold mb-md">Business Hours</h3>
                            <p className="text-secondary mb-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                            <p className="text-secondary mb-sm">Saturday: 10:00 AM - 4:00 PM EST</p>
                            <p className="text-secondary">Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
