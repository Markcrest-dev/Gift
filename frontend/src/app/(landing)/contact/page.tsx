'use client';

import { useState } from 'react';
import { Mail, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        alert('Message sent!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.id]: e.target.value });

    const inputClass =
        'w-full bg-base border border-gray-200 text-ink text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-all placeholder:text-ink-faint';

    return (
        <main className="pt-[72px]">
            <section className="section-padding bg-base">
                <div className="container-narrow max-w-[900px]">
                    <div className="mb-14 max-w-md">
                        <h1 className="reveal font-display text-ink mb-4">Get in touch</h1>
                        <p className="reveal reveal-delay-1 text-ink-muted">
                            Questions, feedback, or partnership inquiries — we&apos;d love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10 lg:gap-14">
                        {/* Form */}
                        <div className="reveal bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
                            <form onSubmit={handleSubmit} id="contactForm" className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-ink text-sm font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={inputClass}
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-ink text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={inputClass}
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-ink text-sm font-medium mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className={inputClass}
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-ink text-sm font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        className={`${inputClass} min-h-[140px] resize-y`}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-emerald hover:bg-emerald-hover text-white font-semibold text-[0.9375rem] py-3.5 rounded-full transition-colors disabled:opacity-50 shadow-sm mt-2"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Sidebar info */}
                        <div className="reveal reveal-delay-1 space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-sage flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-emerald" />
                                </div>
                                <div>
                                    <p className="text-ink-faint text-xs uppercase tracking-[0.1em] font-medium mb-1">Email</p>
                                    <p className="text-ink-muted text-sm">support@festow.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-sage flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4 text-emerald" />
                                </div>
                                <div>
                                    <p className="text-ink-faint text-xs uppercase tracking-[0.1em] font-medium mb-1">Phone</p>
                                    <p className="text-ink-muted text-sm">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-sage flex items-center justify-center shrink-0">
                                    <Clock className="w-4 h-4 text-emerald" />
                                </div>
                                <div>
                                    <p className="text-ink-faint text-xs uppercase tracking-[0.1em] font-medium mb-1">Hours</p>
                                    <p className="text-ink-muted text-sm">Mon–Fri: 9am–6pm EST</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
