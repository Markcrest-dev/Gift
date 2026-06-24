'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(r => setTimeout(r, 1500)); setLoading(false); alert('Message sent!'); setFormData({ name: '', email: '', subject: '', message: '' }); };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const inputClass = "w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors";

    return (
        <section className="py-32 px-4">
            <div className="max-w-[900px] mx-auto">
                <div className="mb-16 max-w-[500px]">
                    <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-paper mb-4">Get in touch</h1>
                    <p className="text-paper/40 text-base">Questions, feedback, or partnership inquiries — we&apos;d love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12">
                    <div className="bg-surface rounded-lg p-6 md:p-8">
                        <form onSubmit={handleSubmit} id="contactForm" className="space-y-5">
                            <div><label htmlFor="name" className="block text-paper/60 text-sm font-medium mb-2">Name *</label><input type="text" id="name" className={inputClass} required value={formData.name} onChange={handleChange} /></div>
                            <div><label htmlFor="email" className="block text-paper/60 text-sm font-medium mb-2">Email *</label><input type="email" id="email" className={inputClass} required value={formData.email} onChange={handleChange} /></div>
                            <div><label htmlFor="subject" className="block text-paper/60 text-sm font-medium mb-2">Subject *</label><input type="text" id="subject" className={inputClass} required value={formData.subject} onChange={handleChange} /></div>
                            <div><label htmlFor="message" className="block text-paper/60 text-sm font-medium mb-2">Message *</label><textarea id="message" className={`${inputClass} min-h-[140px] resize-y`} required value={formData.message} onChange={handleChange} /></div>
                            <Button type="submit" fullWidth size="lg" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div><p className="text-paper/30 text-xs uppercase tracking-wider mb-1">Email</p><p className="text-paper/60 text-sm">support@giftexchange.com</p></div>
                        <div><p className="text-paper/30 text-xs uppercase tracking-wider mb-1">Phone</p><p className="text-paper/60 text-sm">+1 (555) 123-4567</p></div>
                        <div><p className="text-paper/30 text-xs uppercase tracking-wider mb-1">Hours</p><p className="text-paper/60 text-sm">Mon–Fri: 9am–6pm EST</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
