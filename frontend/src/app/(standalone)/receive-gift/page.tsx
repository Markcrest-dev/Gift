'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Gift, Package, DollarSign, Bitcoin, Heart } from 'lucide-react';

export default function ReceiveGiftPage() {
    const [step, setStep] = useState<'view' | 'options' | 'claim' | 'success'>('view');
    const [redemptionType, setRedemptionType] = useState<string | null>(null);

    const gift = {
        name: "Sony WH-1000XM5",
        value: 349.00,
        sender: "Michael Chen",
        message: "Hope you enjoy this gift! Merry Christmas!",
        emoji: "🎧"
    };

    const handleClaim = () => setStep('success');

    const inputClass = "w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors";

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-base flex items-center justify-center p-4">
                <div className="bg-surface rounded-lg max-w-[480px] w-full p-8 md:p-12 text-center">
                    <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Gift className="w-8 h-8 text-green" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-paper mb-3">Gift Claimed</h2>
                    <p className="text-paper/40 text-base leading-relaxed mb-8">Your request has been processed. You will receive an email confirmation shortly.</p>
                    <Link href="/"><Button variant="primary" size="lg" fullWidth>Return to Home</Button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base flex items-center justify-center p-4 py-12">
            <div className="bg-surface rounded-lg max-w-[560px] w-full p-6 md:p-10">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Gift className="w-8 h-8 text-gold" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-paper mb-2">You received a gift</h1>
                    <p className="text-paper/40 text-sm">from {gift.sender}</p>
                </div>

                {/* Gift Details */}
                <div className="flex gap-6 items-center bg-base rounded-lg p-5 mb-6">
                    <div className="w-20 h-20 bg-paper/5 rounded flex items-center justify-center text-4xl shrink-0">
                        {gift.emoji}
                    </div>
                    <div>
                        <h2 className="text-paper text-lg font-medium mb-1">{gift.name}</h2>
                        <div className="font-mono text-gold text-base">${gift.value.toFixed(2)}</div>
                    </div>
                </div>

                <div className="bg-base rounded-lg p-5 mb-8 border-l-2 border-gold/40">
                    <p className="text-paper/30 text-xs uppercase tracking-wider font-medium mb-2">Message</p>
                    <p className="text-paper/70 italic text-sm leading-relaxed">&ldquo;{gift.message}&rdquo;</p>
                </div>

                {/* Steps */}
                {step === 'view' && (
                    <Button variant="primary" size="lg" fullWidth onClick={() => setStep('options')}>
                        Choose How to Receive
                    </Button>
                )}

                {step === 'options' && (
                    <div>
                        <h3 className="text-paper/60 text-sm font-medium mb-4">Select an option</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {[
                                { id: 'physical', icon: Package, label: 'Accept Item', desc: 'Ship to your address' },
                                { id: 'cash', icon: DollarSign, label: 'Take Cash', desc: 'Transfer to bank' },
                                { id: 'crypto', icon: Bitcoin, label: 'Convert to Crypto', desc: 'Send to wallet' },
                                { id: 'donate', icon: Heart, label: 'Donate Value', desc: 'Give to charity' }
                            ].map(opt => {
                                const Icon = opt.icon;
                                return (
                                    <button
                                        key={opt.id}
                                        className={`p-4 rounded-lg border text-left transition-all flex flex-col ${redemptionType === opt.id ? 'border-gold/40 bg-gold/5' : 'border-paper/10 hover:border-paper/20 hover:bg-paper/3'}`}
                                        onClick={() => { setRedemptionType(opt.id); setStep('claim'); }}
                                    >
                                        <Icon className={`w-5 h-5 mb-3 ${redemptionType === opt.id ? 'text-gold' : 'text-paper/40'}`} />
                                        <div className="text-paper text-sm font-medium mb-1">{opt.label}</div>
                                        <div className="text-paper/30 text-xs">{opt.desc}</div>
                                    </button>
                                );
                            })}
                        </div>
                        <Button variant="ghost" size="md" fullWidth onClick={() => setStep('view')}>Back</Button>
                    </div>
                )}

                {step === 'claim' && (
                    <div>
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-paper/5">
                            <Button variant="ghost" size="sm" onClick={() => setStep('options')}>Back</Button>
                            <h3 className="text-paper text-base font-medium flex-1 text-center pr-12">
                                {redemptionType === 'physical' && 'Shipping Details'}
                                {redemptionType === 'cash' && 'Bank Details'}
                                {redemptionType === 'crypto' && 'Wallet Address'}
                                {redemptionType === 'donate' && 'Select Charity'}
                            </h3>
                        </div>

                        {redemptionType === 'physical' && (
                            <div className="space-y-4 mb-6">
                                <div><label className="block text-paper/60 text-sm mb-2">Full Name</label><input type="text" className={inputClass} placeholder="John Doe" /></div>
                                <div><label className="block text-paper/60 text-sm mb-2">Address</label><textarea className={`${inputClass} min-h-[80px]`} placeholder="Street address, city, country..." /></div>
                            </div>
                        )}
                        {redemptionType !== 'physical' && (
                            <div className="space-y-4 mb-6">
                                <div><label className="block text-paper/60 text-sm mb-2">Destination Details</label><input type="text" className={inputClass} placeholder="Enter your details..." /></div>
                            </div>
                        )}

                        <Button variant="primary" size="lg" fullWidth onClick={handleClaim}>Confirm & Claim</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
