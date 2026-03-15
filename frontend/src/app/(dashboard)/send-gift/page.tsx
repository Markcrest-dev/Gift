'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Gift } from '@/lib/types';
import { giftFlow, giftsApi, calculateServiceFee, calculateTotal } from '@/lib/giftFlow';

export default function SendGiftPage() {
    return (
        <Suspense fallback={<div className="p-xl text-center">Loading...</div>}>
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
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        recipientCountry: '',
        message: '',
        deliveryDate: '',
        isAnonymous: false,
        paymentMethod: ''
    });

    useEffect(() => {
        if (giftId) {
            giftsApi.getById(giftId).then(setGift).catch(() => {});
        }
    }, [giftId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { id, value, type } = target;
        setFormData(prev => ({
            ...prev,
            [id === 'anonymousGift' ? 'isAnonymous' : id]: type === 'checkbox' ? target.checked : value
        }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const selectPaymentMethod = (method: string) => {
        setFormData(prev => ({ ...prev, paymentMethod: method }));
    };

    const handleConfirm = async () => {
        if (!gift) return;
        setSending(true);
        setError('');

        try {
            await giftFlow.sendGift({
                recipientEmail: formData.recipientEmail,
                recipientName: formData.recipientName,
                giftId: gift.id,
                message: formData.message,
                deliveryDate: formData.deliveryDate || undefined,
                anonymous: formData.isAnonymous,
                paymentMethod: formData.paymentMethod,
            });
            router.push('/gifts-sent');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send gift');
            setSending(false);
        }
    };

    return (
        <div className="send-gift-container page-transition">
            <h1 className="text-center mb-xl fade-in-up">Send a Gift</h1>

            <div className="progress-steps fade-in-up">
                <div className="progress-line" style={{ width: `${(currentStep - 1) * 33}%` }}></div>
                {[1, 2, 3, 4].map(step => (
                    <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
                        <div className="step-number">{step}</div>
                        <div className="step-label">
                            {step === 1 && 'Recipient'}
                            {step === 2 && 'Personalize'}
                            {step === 3 && 'Payment'}
                            {step === 4 && 'Confirm'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="form-card fade-in-up">
                {error && (
                    <div style={{ color: '#ff4444', background: '#fff0f0', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)' }}>
                        {error}
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="fade-in-up">
                        <h2 className="section-title">Recipient Details</h2>
                        <p className="section-subtitle">Who would you like to send this gift to?</p>

                        {gift && (
                            <div className="gift-summary">
                                <div style={{ fontSize: '3rem' }}>{gift.emoji || '🎁'}</div>
                                <div className="gift-summary-info">
                                    <div className="gift-summary-title">{gift.name}</div>
                                    <div className="gift-summary-price">${gift.price}</div>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Recipient Full Name *</label>
                            <input type="text" id="recipientName" className="form-input" value={formData.recipientName} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Recipient Email *</label>
                            <input type="email" id="recipientEmail" className="form-input" value={formData.recipientEmail} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Recipient Country *</label>
                            <select id="recipientCountry" className="form-select" value={formData.recipientCountry} onChange={handleInputChange}>
                                <option value="">Select country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                            </select>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="fade-in-up">
                        <h2 className="section-title">Personalize Your Gift</h2>
                        <p className="section-subtitle">Add a personal touch to make it special</p>

                        <div className="form-group">
                            <label className="form-label">Gift Message</label>
                            <textarea id="message" className="form-input" rows={5} placeholder="Write a heartfelt message..." value={formData.message} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Delivery Date</label>
                            <input type="date" id="deliveryDate" className="form-input" value={formData.deliveryDate} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" id="anonymousGift" checked={formData.isAnonymous} onChange={handleInputChange} />
                                <span>Send as anonymous gift</span>
                            </label>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="fade-in-up">
                        <h2 className="section-title">Payment Method</h2>
                        <div className="payment-methods">
                            {['card', 'paypal', 'crypto'].map(method => (
                                <div
                                    key={method}
                                    className={`payment-method ${formData.paymentMethod === method ? 'selected' : ''}`}
                                    onClick={() => selectPaymentMethod(method)}
                                >
                                    <div className="payment-icon">
                                        {method === 'card' && <i className="fas fa-credit-card"></i>}
                                        {method === 'paypal' && <i className="fab fa-paypal"></i>}
                                        {method === 'crypto' && <i className="fab fa-bitcoin"></i>}
                                    </div>
                                    <div className="font-semibold capitalize">{method}</div>
                                </div>
                            ))}
                        </div>
                        <div className="alert alert-info mt-lg">
                            <span>This is a demo. No actual payment will be processed.</span>
                        </div>
                    </div>
                )}

                {currentStep === 4 && gift && (
                    <div className="fade-in-up">
                        <h2 className="section-title">Review & Confirm</h2>
                        <div className="order-summary">
                            <h3 className="font-semibold mb-md">Order Summary</h3>
                            <div className="summary-row"><span>Gift Item:</span><span>{gift.name}</span></div>
                            <div className="summary-row"><span>Subtotal:</span><span>${gift.price.toFixed(2)}</span></div>
                            <div className="summary-row"><span>Service Fee (5%):</span><span>${calculateServiceFee(gift.price).toFixed(2)}</span></div>
                            <div className="summary-row total"><span>Total:</span><span>${calculateTotal(gift.price).toFixed(2)}</span></div>
                        </div>
                        <div className="alert alert-success mt-lg">
                            <h4 className="font-semibold text-sm">Recipient:</h4>
                            <p>{formData.recipientName} ({formData.recipientEmail})</p>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    {currentStep > 1 && (
                        <Button variant="outline" size="lg" onClick={prevStep}>Previous</Button>
                    )}
                    {currentStep < 4 ? (
                        <Button variant="primary" size="lg" className="flex-1" onClick={nextStep}>Next Step</Button>
                    ) : (
                        <Button variant="primary" size="lg" className="flex-1" onClick={handleConfirm} disabled={sending}>
                            {sending ? 'Sending...' : 'Confirm & Send Gift'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
