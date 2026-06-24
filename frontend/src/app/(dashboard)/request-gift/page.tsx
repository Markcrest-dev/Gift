'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function RequestGiftPage() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await new Promise(r => setTimeout(r, 1000)); setLoading(false); alert('Request sent!'); };
    const inputClass = "w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors";

    return (
        <div className="max-w-[640px] mx-auto">
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-paper mb-2">Request a Gift</h1>
                <p className="text-paper/40 text-sm">Ask someone to send you this gift</p>
            </div>
            <div className="bg-surface rounded-lg p-5 mb-6">
                <p className="text-paper/50 text-sm leading-relaxed">Your request will be emailed to the person you specify with a link to send you the gift.</p>
            </div>
            <div className="bg-surface rounded-lg p-6 md:p-8">
                <h2 className="text-paper font-semibold text-base mb-6">Request Details</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div><label className="block text-paper/60 text-sm font-medium mb-2">Their Name *</label><input type="text" className={inputClass} required placeholder="Who to request from?" /></div>
                    <div><label className="block text-paper/60 text-sm font-medium mb-2">Their Email *</label><input type="email" className={inputClass} required placeholder="their@email.com" /></div>
                    <div><label className="block text-paper/60 text-sm font-medium mb-2">Occasion</label><select className={inputClass}><option value="">Select...</option><option value="Birthday">Birthday</option><option value="Christmas">Christmas</option></select></div>
                    <div><label className="block text-paper/60 text-sm font-medium mb-2">Message *</label><textarea className={`${inputClass} min-h-[120px] resize-y`} required placeholder="Add a personal message..." /></div>
                    <div className="flex gap-3 pt-4 border-t border-paper/5">
                        <Button variant="ghost" size="lg">Cancel</Button>
                        <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={loading}>{loading ? 'Sending...' : 'Send Request'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
