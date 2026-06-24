'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftFlow, giftsApi, calculateServiceFee, calculateTotal } from '@/lib/giftFlow';
import { CreditCard } from 'lucide-react';

export default function SendGiftPage() {
    return (
        <Suspense fallback={<div className="text-paper/30 text-sm py-16 text-center">Loading...</div>}>
            <SendGiftContent />
        </Suspense>
    );
}

function SendGiftContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const giftId = searchParams.get('id');
    const [currentStep, setCurrentStep] = useState(1);
    const [gift, setGift] = useState<Gift | null>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ recipientName: '', recipientEmail: '', recipientCountry: '', message: '', deliveryDate: '', isAnonymous: false, paymentMethod: '' });

    useEffect(() => { if (giftId) giftsApi.getById(giftId).then(setGift).catch(() => {}); }, [giftId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { id, value, type } = target;
        setFormData(prev => ({ ...prev, [id === 'anonymousGift' ? 'isAnonymous' : id]: type === 'checkbox' ? target.checked : value }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleConfirm = async () => {
        if (!gift) return;
        setSending(true); setError('');
        try {
            await giftFlow.sendGift({ recipientEmail: formData.recipientEmail, recipientName: formData.recipientName, giftId: gift.id, message: formData.message, deliveryDate: formData.deliveryDate || undefined, anonymous: formData.isAnonymous, paymentMethod: formData.paymentMethod });
            router.push('/gifts-sent');
        } catch (err) { setError(err instanceof Error ? err.message : 'Failed to send gift'); setSending(false); }
    };

    const inputClass = "w-full bg-base border border-paper/10 rounded-[4px] px-4 py-3 text-paper text-sm placeholder:text-paper/20 focus:outline-none focus:border-gold transition-colors";
    const steps = ['Recipient', 'Personalize', 'Payment', 'Confirm'];

    return (
        <div className="max-w-[640px] mx-auto">
            <h1 className="font-display text-3xl font-bold text-paper text-center mb-10">Send a Gift</h1>

            <div className="flex items-center justify-between mb-10 px-4 relative">
                <div className="absolute top-4 left-8 right-8 h-[2px] bg-paper/5" />
                <div className="absolute top-4 left-8 h-[2px] bg-red transition-all" style={{ width: `${(currentStep - 1) * 33.3}%` }} />
                {steps.map((label, i) => (
                    <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${currentStep >= i + 1 ? 'bg-red text-paper' : 'bg-surface border border-paper/10 text-paper/30'}`}>{i + 1}</div>
                        <span className={`text-xs ${currentStep >= i + 1 ? 'text-paper/60' : 'text-paper/20'}`}>{label}</span>
                    </div>
                ))}
            </div>

            <div className="bg-surface rounded-lg p-6 md:p-8 mb-6">
                {error && <div className="bg-red/10 border border-red/20 rounded-[4px] px-4 py-3 mb-6 text-red text-sm">{error}</div>}

                {currentStep === 1 && (
                    <div>
                        <h2 className="text-paper font-semibold text-lg mb-1">Recipient Details</h2>
                        <p className="text-paper/35 text-sm mb-6">Who are you sending this gift to?</p>
                        {gift && (
                            <div className="flex items-center gap-4 bg-base rounded-lg p-4 mb-6">
                                <span className="text-3xl">{gift.emoji || '🎁'}</span>
                                <div><div className="text-paper text-sm font-medium">{gift.name}</div><div className="font-mono text-gold text-sm">${gift.price}</div></div>
                            </div>
                        )}
                        <div className="mb-5"><label className="block text-paper/60 text-sm font-medium mb-2">Full Name *</label><input type="text" id="recipientName" className={inputClass} value={formData.recipientName} onChange={handleInputChange} required /></div>
                        <div className="mb-5"><label className="block text-paper/60 text-sm font-medium mb-2">Email *</label><input type="email" id="recipientEmail" className={inputClass} value={formData.recipientEmail} onChange={handleInputChange} required /></div>
                        <div className="mb-5"><label className="block text-paper/60 text-sm font-medium mb-2">Country *</label><select id="recipientCountry" className={inputClass} value={formData.recipientCountry} onChange={handleInputChange}><option value="">Select country</option><option value="US">United States</option><option value="UK">United Kingdom</option><option value="CA">Canada</option></select></div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h2 className="text-paper font-semibold text-lg mb-1">Personalize</h2>
                        <p className="text-paper/35 text-sm mb-6">Add a personal touch</p>
                        <div className="mb-5"><label className="block text-paper/60 text-sm font-medium mb-2">Message</label><textarea id="message" className={`${inputClass} min-h-[120px] resize-y`} placeholder="Write a heartfelt message..." value={formData.message} onChange={handleInputChange} /></div>
                        <div className="mb-5"><label className="block text-paper/60 text-sm font-medium mb-2">Delivery Date</label><input type="date" id="deliveryDate" className={inputClass} value={formData.deliveryDate} onChange={handleInputChange} /></div>
                        <label className="flex items-center gap-2.5 cursor-pointer"><input type="checkbox" id="anonymousGift" className="w-3.5 h-3.5 accent-gold" checked={formData.isAnonymous} onChange={handleInputChange} /><span className="text-paper/50 text-sm">Send anonymously</span></label>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h2 className="text-paper font-semibold text-lg mb-1">Payment</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {['card', 'paypal', 'crypto'].map(method => (
                                <button key={method} className={`p-4 rounded-lg border text-center transition-all ${formData.paymentMethod === method ? 'border-gold/40 bg-gold/5' : 'border-paper/10 hover:border-paper/20'}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}>
                                    <CreditCard className="w-5 h-5 mx-auto mb-2 text-paper/40" />
                                    <span className="text-paper/70 text-sm font-medium capitalize">{method}</span>
                                </button>
                            ))}
                        </div>
                        <p className="text-paper/20 text-xs mt-4 text-center">Demo mode — no payment processed</p>
                    </div>
                )}

                {currentStep === 4 && gift && (
                    <div>
                        <h2 className="text-paper font-semibold text-lg mb-6">Review & Confirm</h2>
                        <div className="bg-base rounded-lg p-5">
                            <div className="flex justify-between text-sm mb-2"><span className="text-paper/40">Item</span><span className="text-paper">{gift.name}</span></div>
                            <div className="flex justify-between text-sm mb-2"><span className="text-paper/40">Subtotal</span><span className="font-mono text-paper">${Number(gift.price).toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm mb-2"><span className="text-paper/40">Service Fee (5%)</span><span className="font-mono text-paper">${calculateServiceFee(Number(gift.price)).toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm pt-3 mt-3 border-t border-paper/10 font-semibold"><span className="text-paper">Total</span><span className="font-mono text-gold">${calculateTotal(Number(gift.price)).toFixed(2)}</span></div>
                        </div>
                        <div className="bg-green/10 rounded-lg p-4 mt-4"><p className="text-sm text-paper/60"><span className="font-medium text-paper">Recipient:</span> {formData.recipientName} ({formData.recipientEmail})</p></div>
                    </div>
                )}

                <div className="flex gap-3 mt-8 pt-6 border-t border-paper/5">
                    {currentStep > 1 && <Button variant="ghost" size="lg" onClick={prevStep}>Previous</Button>}
                    {currentStep < 4 ? (
                        <Button variant="primary" size="lg" className="flex-1" onClick={nextStep}>Next</Button>
                    ) : (
                        <Button variant="primary" size="lg" className="flex-1" onClick={handleConfirm} disabled={sending}>{sending ? 'Sending...' : 'Confirm & Send'}</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
