'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function RequestGiftPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        occasion: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Request sent successfully!');
    };

    return (
        <div className="request-gift-container page-transition">
            <div className="page-header fade-in-up">
                <h1 className="page-title">🙏 Request This Gift</h1>
                <p className="page-subtitle">Ask someone special to send you this gift</p>
            </div>

            <div className="info-box fade-in-up">
                <div className="info-box-title">📧 How it works</div>
                <div className="info-box-text">
                    Your request will be sent to the person you specify. They&apos;ll receive an email with your message and a
                    link to send you this gift. It&apos;s a thoughtful way to let someone know what you&apos;d love to receive!
                </div>
            </div>

            <div className="form-card fade-in-up">
                <h2 className="form-section-title">Request Details</h2>
                <p className="form-section-subtitle">Tell us who you&apos;d like to request this gift from</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Recipient Name *</label>
                        <input type="text" className="form-input" required placeholder="Who would you like to request this from?" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Recipient Email *</label>
                        <input type="email" className="form-input" required placeholder="their@email.com" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Occasion (Optional)</label>
                        <select className="form-input">
                            <option value="">Select an occasion...</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Christmas">Christmas</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Personal Message *</label>
                        <textarea className="form-textarea" rows={5} required placeholder="Add a personal message..."></textarea>
                    </div>

                    <div className="form-actions">
                        <Button variant="outline" size="lg">Cancel</Button>
                        <Button type="submit" variant="primary" size="lg" className="flex-1">Send Request 🙏</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
