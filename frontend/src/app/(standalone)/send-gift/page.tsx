'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Gift } from '@/lib/types';
import { giftFlow, giftsApi, calculateServiceFee, calculateTotal } from '@/lib/giftFlow';

export default function SendGiftPage() {
    return (
        <Suspense fallback={<div className="text-[#6B6055] text-[14px] py-16 text-center font-sans">Loading...</div>}>
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

    const inputClass = "w-full bg-[#111009] border border-[#2E2820] text-[#F5F0E8] font-sans text-[14px] placeholder-[#3A342E] focus:outline-none focus:border-[#B8922A] transition-colors";
    const inputStyle = { borderRadius: '3px', padding: '11px 14px' };

    const steps = ['Select Gift', 'Recipient Details', 'Personal Message', 'Review & Pay'];

    return (
        <div className="max-w-[780px] mx-auto w-full px-4" style={{ padding: '60px 0' }}>
            {/* Nav area mock to give context if needed, but per prompt "below the nav" means we just render the content assuming nav is handled elsewhere or is minimal */}

            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-16 relative">
                {/* Background line connecting steps */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#1E1A14] -z-10 translate-y-[-50%]"></div>
                
                {steps.map((label, i) => {
                    const stepNum = i + 1;
                    const isCurrent = currentStep === stepNum;
                    const isCompleted = currentStep > stepNum;
                    
                    let className = "font-sans text-[13px] bg-base px-2 transition-colors";
                    let style: React.CSSProperties = { paddingBottom: '4px' };
                    let prefix = "";

                    if (isCurrent) {
                        className += " text-[#F5F0E8]";
                        style.borderBottom = "1px solid #B8922A";
                    } else if (isCompleted) {
                        className += " text-[#6B6055]";
                        prefix = "✓ ";
                    } else {
                        className += " text-[#4A4038]";
                    }

                    return (
                        <div key={label} className="bg-[#0A0806] px-3">
                            <span className={className} style={style}>
                                {isCompleted && <span className="text-gold mr-1">{prefix}</span>}
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {error && <div className="border border-[#C0292B] bg-[#C0292B]/10 text-[#C0292B] px-4 py-3 mb-8 font-sans text-[14px]" style={{ borderRadius: '3px' }}>{error}</div>}

            {/* Step 1: Select Gift */}
            {currentStep === 1 && (
                <div>
                    {gift ? (
                        <div className="bg-[#1C1814] border border-[#1E1A14] flex items-center gap-4 mb-4" style={{ borderRadius: '3px', padding: '20px 24px' }}>
                            <div className="w-[64px] h-[64px] bg-[#161210] border border-[#2E2820] flex items-center justify-center font-mono text-[10px] text-[#F5F0E8] tracking-widest">
                                {gift.category?.substring(0,3).toUpperCase() || 'GFT'}
                            </div>
                            <div className="flex-1">
                                <div className="font-sans text-[15px] font-medium text-[#F5F0E8] mb-1">{gift.name}</div>
                                <div className="font-mono text-[14px] text-[#B8922A]">${gift.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-[#1E1A14] bg-[#161210]" style={{ borderRadius: '3px' }}>
                            <p className="font-sans text-[14px] text-[#6B6055] mb-4">No gift selected.</p>
                            <button onClick={() => router.push('/marketplace')} className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                                Go to Marketplace &rarr;
                            </button>
                        </div>
                    )}
                    {gift && (
                        <button onClick={() => router.push('/marketplace')} className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors">
                            Change gift
                        </button>
                    )}
                </div>
            )}

            {/* Step 2: Recipient Details */}
            {currentStep === 2 && (
                <div className="space-y-5">
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Recipient Name</label>
                        <input type="text" id="recipientName" className={inputClass} style={inputStyle} value={formData.recipientName} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Recipient Email</label>
                        <input type="email" id="recipientEmail" className={inputClass} style={inputStyle} value={formData.recipientEmail} onChange={handleInputChange} required />
                    </div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Country</label>
                        <select id="recipientCountry" className={inputClass} style={inputStyle} value={formData.recipientCountry} onChange={handleInputChange}>
                            <option value="">Select country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Scheduled Delivery Date</label>
                        <input type="date" id="deliveryDate" className={inputClass} style={inputStyle} value={formData.deliveryDate} onChange={handleInputChange} />
                    </div>
                </div>
            )}

            {/* Step 3: Personal Message */}
            {currentStep === 3 && (
                <div>
                    <div>
                        <label className="block font-sans text-[13px] text-[#9A8E7A] mb-2">Message</label>
                        <textarea 
                            id="message" 
                            className={inputClass} 
                            style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }} 
                            placeholder="Write something meaningful..." 
                            value={formData.message} 
                            onChange={handleInputChange} 
                            maxLength={500}
                        />
                        <div className="text-right mt-2">
                            <span className="font-sans text-[12px] text-[#4A4038]">{formData.message.length} / 500</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: Review & Pay */}
            {currentStep === 4 && gift && (
                <div>
                    <div className="bg-[#1C1814] border border-[#1E1A14]" style={{ padding: '28px 32px' }}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-sans text-[14px] text-[#6B6055]">Gift</span>
                            <span className="font-sans text-[14px] text-[#F5F0E8]">{gift.name} — <span className="font-mono text-[#B8922A]">${gift.price.toFixed(2)}</span></span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-sans text-[14px] text-[#6B6055]">Recipient</span>
                            <span className="font-sans text-[14px] text-[#F5F0E8]">{formData.recipientName} · {formData.recipientCountry || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-sans text-[14px] text-[#6B6055]">Message</span>
                            <span className="font-sans text-[14px] text-[#F5F0E8] text-right max-w-[60%] italic truncate">
                                {formData.message ? `"${formData.message}"` : "None"}
                            </span>
                        </div>
                        
                        <div className="h-[1px] bg-[#2E2820] w-full my-6"></div>
                        
                        <div className="flex justify-between items-end">
                            <span className="font-sans text-[13px] uppercase text-[#6B6055] tracking-[0.08em] font-medium">TOTAL</span>
                            <span className="font-mono text-[22px] text-[#F5F0E8]">${calculateTotal(Number(gift.price)).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-[10px]">
                        {['card', 'crypto'].map(method => (
                            <button
                                key={method}
                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                                className={`w-full flex items-center justify-between text-left transition-colors border ${
                                    formData.paymentMethod === method 
                                        ? 'bg-[#1A1610] border-[#B8922A]' 
                                        : 'bg-[#161210] border-[#2E2820] hover:border-[#3A3020]'
                                }`}
                                style={{ padding: '18px 20px', borderRadius: '3px' }}
                            >
                                <span className="font-sans text-[14px] text-[#F5F0E8] font-medium capitalize">{method === 'card' ? 'Credit Card' : 'Crypto Wallet'}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-10">
                        <button 
                            className="w-full bg-[#C0292B] hover:bg-[#A32325] text-white font-sans text-[15px] font-medium transition-colors mb-3 disabled:opacity-50"
                            style={{ padding: '14px', borderRadius: '3px' }}
                            onClick={handleConfirm}
                            disabled={sending || !formData.paymentMethod}
                        >
                            {sending ? 'Processing...' : 'Send the Gift →'}
                        </button>
                        <p className="text-center font-sans text-[12px] text-[#4A4038]">
                            Secured. Delivered digitally. No customs.
                        </p>
                    </div>
                </div>
            )}

            {/* Navigation Between Steps */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#1E1A14]">
                <div className="flex-1">
                    {currentStep > 1 && currentStep <= 4 && (
                        <button 
                            onClick={prevStep}
                            className="font-sans text-[14px] text-gold hover:text-gold/80 transition-colors"
                        >
                            &larr; Back
                        </button>
                    )}
                </div>
                <div className="flex-1 flex justify-end">
                    {currentStep < 4 && gift && (
                        <button 
                            onClick={nextStep}
                            className="bg-gold hover:bg-gold/90 text-[#0A0806] font-sans text-[14px] font-medium transition-colors"
                            style={{ padding: '10px 24px', borderRadius: '3px' }}
                        >
                            Continue &rarr;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
