'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        // Handle form submission
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Navbar />

            <div className="bg-primary">
                {/* Hero Section */}
                <section className="hero-section" style={{ minHeight: '50vh' }}>
                    <div className="hero-background"></div>
                    <div className="container hero-content text-center">
                        <h1 className="hero-title">Get in Touch</h1>
                        <p className="hero-subtitle">
                            We're here to help with any questions or concerns
                        </p>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="section bg-primary">
                    <div className="container max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div className="card p-2xl">
                                <h2 className="mb-lg">Send us a Message</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject" className="form-label">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="form-textarea"
                                            placeholder="Tell us more about your inquiry..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full btn-lg">
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Contact Information</h2>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Have questions? We're here to help! Reach out to us through any of the methods below.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#C41E3A] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <i className="fas fa-envelope text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Email</h3>
                                            <p className="text-gray-600">support@giftexchange.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#C41E3A] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <i className="fas fa-phone text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#C41E3A] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <i className="fas fa-map-marker-alt text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Address</h3>
                                            <p className="text-gray-600">123 Gift Street, Suite 100<br />New York, NY 10001</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#C41E3A] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                                            <i className="fas fa-clock text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                                            <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST<br />Weekend: 10AM - 4PM EST</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="pt-8 border-t border-gray-200">
                                    <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#C41E3A] hover:text-white rounded-lg flex items-center justify-center transition-all">
                                            <i className="fab fa-facebook text-lg"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#C41E3A] hover:text-white rounded-lg flex items-center justify-center transition-all">
                                            <i className="fab fa-twitter text-lg"></i>
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-[#C41E3A] hover:text-white rounded-lg flex items-center justify-center transition-all">
                                            <i className="fab fa-instagram text-lg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
