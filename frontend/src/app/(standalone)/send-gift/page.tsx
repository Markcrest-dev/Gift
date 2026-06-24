'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Gift } from '@/lib/types';
import { giftFlow, giftsApi, calculateTotal } from '@/lib/giftFlow';

export default function SendGiftPage() {
    return (
        <Suspense fallback={<div className="text-gray-500 text-sm py-16 text-center font-body">Loading...</div>}>
            <SendGiftContent />
        </Suspense>
    );
}

function SendGiftContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const giftId = searchParams.get('id');
    const [currentStep, setCurrentStep] = useState(giftId ? 2 : 1);
    const [gift, setGift] = useState<Gift | null>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ 
        recipientName: '', 
        recipientEmail: '', 
        recipientCountry: '', 
        message: '', 
        deliveryDate: '', 
        paymentMethod: '' 
    });

    useEffect(() => { 
        if (giftId) {
            giftsApi.getById(giftId).then(setGift).catch(() => {}); 
        }
    }, [giftId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleConfirm = async () => {
        if (!gift) return;
        setSending(true); setError('');
        try {
            await giftFlow.sendGift({ 
                recipientEmail: formData.recipientEmail, 
                recipientName: formData.recipientName, 
                giftId: gift.id, 
                message: formData.message, 
                deliveryDate: formData.deliveryDate || undefined, 
                anonymous: false, 
                paymentMethod: formData.paymentMethod as 'card'|'crypto'|'paypal' 
            });
            router.push('/gifts-sent');
        } catch (err) { 
            setError(err instanceof Error ? err.message : 'Failed to send gift'); 
            setSending(false); 
        }
    };

    const inputClass = "w-full bg-gray-50 border border-gray-200 text-gray-900 font-body text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0A4535] focus:ring-1 focus:ring-[#0A4535] transition-all placeholder-gray-400";
    const steps = ['Select Gift', 'Recipient Details', 'Personal Message', 'Review & Pay'];

    return (
        <div className="min-h-screen bg-[#F4F0EB] font-body py-12 px-4 flex justify-center items-start">
            <div className="w-full max-w-[640px] bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden mt-8">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A4535]"></div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10 -translate-y-1/2"></div>
                    
                    {steps.map((label, i) => {
                        const stepNum = i + 1;
                        const isCurrent = currentStep === stepNum;
                        const isCompleted = currentStep > stepNum;
                        
                        return (
                            <div key={label} className="bg-white px-2 md:px-4 flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${
                                    isCurrent ? 'bg-[#0A4535] text-white' :
                                    isCompleted ? 'bg-[#D1FAE5] text-[#0A4535]' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {isCompleted ? '✓' : stepNum}
                                </div>
                                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest hidden md:block ${
                                    isCurrent ? 'text-[#0A4535]' :
                                    isCompleted ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {error && <div className="border border-red-200 bg-red-50 text-red-600 px-4 py-3 mb-8 text-sm rounded-xl font-medium">{error}</div>}

                {/* Step 1: Select Gift */}
                {currentStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-display text-[#0A4535] mb-6">Select a Gift</h2>
                        {gift ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 bg-white border border-gray-100 rounded-xl flex items-center justify-center font-bold text-xs text-[#0A4535] shadow-sm">
                                    {gift.category?.substring(0,3).toUpperCase() || 'GFT'}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 mb-1">{gift.name}</div>
                                    <div className="font-mono font-bold text-[#0A4535]">${gift.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-2xl mb-6">
                                <p className="text-gray-500 text-sm mb-4 font-medium">No gift selected.</p>
                                <button onClick={() => router.push('/marketplace')} className="text-[#0A4535] font-bold text-sm hover:underline">
                                    Go to Marketplace &rarr;
                                </button>
                            </div>
                        )}
                        {gift && (
                            <div className="text-right">
                                <button onClick={() => router.push('/marketplace')} className="text-[#0A4535] font-bold text-sm hover:underline">
                                    Change gift
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 2: Recipient Details */}
                {currentStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-display text-[#0A4535] mb-6">Recipient Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Name</label>
                                <input type="text" id="recipientName" className={inputClass} value={formData.recipientName} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Email</label>
                                <input type="email" id="recipientEmail" className={inputClass} value={formData.recipientEmail} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                                <select id="recipientCountry" className={`${inputClass} appearance-none`} value={formData.recipientCountry} onChange={handleInputChange}>
                                    <option value="">Select country</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="CA">Canada</option>
                                    <option value="AU">Australia</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Scheduled Delivery Date</label>
                                <input type="date" id="deliveryDate" className={inputClass} value={formData.deliveryDate} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Personal Message */}
                {currentStep === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-display text-[#0A4535] mb-6">Personal Message</h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                            <textarea 
                                id="message" 
                                className={inputClass} 
                                style={{ minHeight: '160px', resize: 'vertical' }} 
                                placeholder="Write something meaningful..." 
                                value={formData.message} 
                                onChange={handleInputChange} 
                                maxLength={500}
                            />
                            <div className="text-right mt-2">
                                <span className="text-xs font-bold text-gray-400">{formData.message.length} / 500</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Review & Pay */}
                {currentStep === 4 && gift && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-display text-[#0A4535] mb-6">Review & Pay</h2>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-semibold text-gray-600">Gift</span>
                                <span className="text-sm font-bold text-gray-900">{gift.name} — <span className="font-mono text-[#0A4535]">${gift.price.toFixed(2)}</span></span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-semibold text-gray-600">Recipient</span>
                                <span className="text-sm font-bold text-gray-900">{formData.recipientName} · {formData.recipientCountry || 'Unknown'}</span>
                            </div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-sm font-semibold text-gray-600">Message</span>
                                <span className="text-sm font-medium text-gray-600 text-right max-w-[60%] italic truncate">
                                    {formData.message ? `"${formData.message}"` : "None"}
                                </span>
                            </div>
                            
                            <div className="h-px bg-gray-200 w-full my-6"></div>
                            
                            <div className="flex justify-between items-end">
                                <span className="text-sm uppercase text-gray-500 tracking-widest font-bold">TOTAL</span>
                                <span className="font-mono text-3xl font-bold text-[#0A4535]">${calculateTotal(Number(gift.price)).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">Select Payment Method</h3>
                            <div className="flex flex-col gap-3">
                                {['card', 'crypto'].map(method => (
                                    <button
                                        key={method}
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                                        className={`w-full flex items-center justify-between text-left transition-all border p-5 rounded-2xl ${
                                            formData.paymentMethod === method 
                                                ? 'bg-[#F4F0EB] border-[#0A4535] shadow-sm' 
                                                : 'bg-white border-gray-200 hover:border-[#0A4535]'
                                        }`}
                                    >
                                        <span className="text-sm text-gray-900 font-bold capitalize">{method === 'card' ? 'Credit Card' : 'Crypto Wallet'}</span>
                                        {formData.paymentMethod === method && (
                                            <div className="w-5 h-5 rounded-full bg-[#0A4535] flex items-center justify-center text-white text-xs">✓</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button 
                                className="w-full bg-[#0A4535] hover:bg-[#073528] text-white font-medium text-base transition-colors mb-4 py-4 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleConfirm}
                                disabled={sending || !formData.paymentMethod}
                            >
                                {sending ? 'Processing...' : 'Complete Payment & Send Gift'}
                            </button>
                            <p className="text-center text-xs font-medium text-gray-400">
                                Secured. Delivered digitally. No customs.
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation Between Steps */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                    <div className="flex-1">
                        {currentStep > 1 && currentStep <= 4 && (
                            <button 
                                onClick={prevStep}
                                className="text-sm font-bold text-gray-500 hover:text-[#0A4535] transition-colors"
                            >
                                &larr; Back
                            </button>
                        )}
                    </div>
                    <div className="flex-1 flex justify-end">
                        {currentStep < 4 && gift && (
                            <button 
                                onClick={nextStep}
                                className="bg-gray-900 hover:bg-black text-white font-medium transition-colors px-6 py-2.5 rounded-full shadow-sm"
                            >
                                Continue &rarr;
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
