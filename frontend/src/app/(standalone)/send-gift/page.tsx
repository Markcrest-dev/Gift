'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Gift } from '@/lib/types';
import { giftFlow, giftsApi, calculateTotal } from '@/lib/giftFlow';

export default function SendGiftPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-base flex items-center justify-center font-body">
                <div className="animate-pulse text-green-dark text-lg">Loading experience...</div>
            </div>
        }>
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

    const steps = [
        { id: 1, title: 'Select' },
        { id: 2, title: 'Recipient' },
        { id: 3, title: 'Message' },
        { id: 4, title: 'Payment' }
    ];

    const inputClass = "w-full bg-transparent border-b border-gray-300 py-3 text-lg font-body focus:outline-none focus:border-green-dark transition-colors placeholder-gray-400 rounded-none";

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-base font-body">
            {/* Left Pane - Visual & Context */}
            <div className="relative w-full lg:w-[45%] bg-green-dark overflow-hidden flex flex-col p-8 lg:p-16 text-base shrink-0 lg:sticky lg:top-0 lg:h-screen">
                {/* Ambient glow effects */}
                <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-green-muted blur-[120px] opacity-60 mix-blend-screen pointer-events-none"></div>
                <div className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-[#157a5e] blur-[120px] opacity-30 mix-blend-screen pointer-events-none"></div>

                <div className="relative z-10 flex justify-between items-center mb-12 lg:mb-0">
                    <button onClick={() => router.push('/marketplace')} className="text-base/80 hover:text-base font-medium flex items-center gap-2 transition-colors">
                        <span>&larr;</span> Back to Marketplace
                    </button>
                    <div className="text-sm tracking-widest uppercase font-bold text-green-light opacity-50">Global Gift Exchange</div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center mt-8 lg:mt-0">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-150 fill-mode-both">
                        <h1 className="text-4xl lg:text-6xl font-display leading-tight mb-6 text-white">
                            The perfect <br />
                            <span className="italic text-green-light">gesture.</span>
                        </h1>
                        
                        {gift ? (
                            <div className="mt-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                                <div className="uppercase tracking-widest text-xs font-bold text-green-light mb-4">Selected Gift</div>
                                <h2 className="text-3xl font-display text-white mb-2">{gift.name}</h2>
                                <p className="text-base/80 mb-8 max-w-sm">
                                    {gift.description || "A beautifully curated experience ready to be sent across borders."}
                                </p>
                                <div className="flex items-end justify-between border-t border-white/20 pt-6">
                                    <div className="text-sm font-medium text-base/70">Value</div>
                                    <div className="font-mono text-3xl font-bold text-white">${gift.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-12 p-8 border border-dashed border-white/30 rounded-3xl text-center backdrop-blur-sm bg-white/5">
                                <p className="text-base/70 mb-4">No gift selected yet.</p>
                                <button onClick={() => router.push('/marketplace')} className="bg-white text-green-dark px-6 py-3 rounded-full font-bold hover:bg-green-light transition-colors active:scale-95">
                                    Browse Marketplace
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Step Indicator (Desktop) */}
                <div className="hidden lg:flex relative z-10 gap-2 mt-auto pt-12">
                    {steps.map((s) => (
                        <div key={s.id} className="flex-1 flex flex-col gap-3">
                            <div className={`h-1 rounded-full transition-all duration-500 ${
                                s.id === currentStep ? 'bg-green-light' : 
                                s.id < currentStep ? 'bg-white/50' : 'bg-white/10'
                            }`}></div>
                            <span className={`text-xs font-bold uppercase tracking-widest ${
                                s.id === currentStep ? 'text-green-light' : 'text-white/40'
                            }`}>{s.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Pane - Form Flow */}
            <div className="flex-1 bg-surface p-8 lg:p-24 flex flex-col justify-center min-h-screen">
                <div className="w-full max-w-lg mx-auto relative">
                    
                    {error && (
                        <div className="animate-in fade-in slide-in-from-top-4 mb-8 bg-red-50 border border-red-100 text-red-dark px-6 py-4 rounded-2xl text-sm font-medium shadow-sm">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Select */}
                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-3xl font-display text-green-dark mb-2">Select a Gift</h2>
                            <p className="text-gray-500 mb-10">Choose something special from our curated collection.</p>
                            
                            {!gift ? (
                                <div className="text-center py-16 bg-base rounded-3xl border border-gray-100">
                                    <p className="text-gray-500 mb-6">You haven't selected a gift.</p>
                                    <button onClick={() => router.push('/marketplace')} className="bg-green-dark text-white px-8 py-3.5 rounded-full font-bold hover:bg-green-muted transition-all active:scale-95 shadow-lg shadow-green-dark/20">
                                        Explore Marketplace
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-end mt-12">
                                    <button onClick={nextStep} className="bg-green-dark text-white px-8 py-4 rounded-full font-bold hover:bg-green-muted transition-all active:scale-95 shadow-lg shadow-green-dark/20 flex items-center gap-2">
                                        Continue <span className="text-xl leading-none">&rarr;</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Recipient */}
                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-3xl font-display text-green-dark mb-2">Recipient Details</h2>
                            <p className="text-gray-500 mb-10">Who is the lucky person receiving this?</p>
                            
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                                    <input type="text" id="recipientName" className={inputClass} placeholder="Jane Doe" value={formData.recipientName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                                    <input type="email" id="recipientEmail" className={inputClass} placeholder="jane@example.com" value={formData.recipientEmail} onChange={handleInputChange} required />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Country</label>
                                        <select id="recipientCountry" className={`${inputClass} appearance-none bg-transparent cursor-pointer`} value={formData.recipientCountry} onChange={handleInputChange}>
                                            <option value="" disabled>Select...</option>
                                            <option value="US">United States</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                            <option value="JP">Japan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery Date (Opt)</label>
                                        <input type="date" id="deliveryDate" className={inputClass} value={formData.deliveryDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                                <button onClick={prevStep} className="text-gray-400 hover:text-green-dark font-bold transition-colors">
                                    &larr; Back
                                </button>
                                <button onClick={nextStep} disabled={!formData.recipientName || !formData.recipientEmail || !formData.recipientCountry} className="bg-green-dark text-white px-8 py-4 rounded-full font-bold hover:bg-green-muted transition-all active:scale-95 shadow-lg shadow-green-dark/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Message */}
                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-3xl font-display text-green-dark mb-2">Personal Touch</h2>
                            <p className="text-gray-500 mb-10">Add a meaningful note to accompany your gift.</p>
                            
                            <div>
                                <textarea 
                                    id="message" 
                                    className={`${inputClass} text-2xl !py-6 min-h-[200px] resize-none leading-relaxed bg-base/50 rounded-3xl px-8 border-none focus:ring-1 focus:ring-green-dark`}
                                    placeholder="Dear Jane,&#10;&#10;Wishing you the happiest of birthdays!&#10;&#10;Warmly,&#10;John" 
                                    value={formData.message} 
                                    onChange={handleInputChange} 
                                    maxLength={500}
                                />
                                <div className="text-right mt-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    {formData.message.length} / 500
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                                <button onClick={prevStep} className="text-gray-400 hover:text-green-dark font-bold transition-colors">
                                    &larr; Back
                                </button>
                                <button onClick={nextStep} className="bg-green-dark text-white px-8 py-4 rounded-full font-bold hover:bg-green-muted transition-all active:scale-95 shadow-lg shadow-green-dark/20">
                                    Review & Pay
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {currentStep === 4 && gift && (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-3xl font-display text-green-dark mb-2">Review & Complete</h2>
                            <p className="text-gray-500 mb-10">Finalize your transaction securely.</p>
                            
                            <div className="space-y-8 mb-10">
                                <div className="bg-base p-6 rounded-3xl">
                                    <div className="flex justify-between items-end mb-4 border-b border-gray-200 pb-4">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Amount</span>
                                        <span className="font-mono text-4xl text-green-dark">${calculateTotal(Number(gift.price)).toFixed(2)}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Recipient</span>
                                            <span className="text-sm font-medium text-green-dark">{formData.recipientName}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery</span>
                                            <span className="text-sm font-medium text-green-dark">{formData.deliveryDate || 'Immediate'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['card', 'crypto'].map(method => (
                                            <button
                                                key={method}
                                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method }))}
                                                className={`relative overflow-hidden p-6 text-left rounded-3xl transition-all duration-300 border-2 ${
                                                    formData.paymentMethod === method 
                                                        ? 'border-green-dark bg-green-dark/5 scale-[0.98]' 
                                                        : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className={`text-lg font-bold mb-1 ${formData.paymentMethod === method ? 'text-green-dark' : 'text-gray-600'}`}>
                                                    {method === 'card' ? 'Credit Card' : 'Crypto'}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {method === 'card' ? 'Instant processing' : 'Web3 Wallet'}
                                                </div>
                                                {formData.paymentMethod === method && (
                                                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-dark flex items-center justify-center text-white text-xs shadow-md">✓</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-gray-100">
                                <button 
                                    onClick={handleConfirm}
                                    disabled={sending || !formData.paymentMethod}
                                    className="w-full bg-green-dark text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-green-muted transition-all active:scale-95 shadow-xl shadow-green-dark/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                                >
                                    {sending ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        <>Send Gift Securely <span className="text-green-light">&rarr;</span></>
                                    )}
                                </button>
                                <button 
                                    onClick={prevStep}
                                    disabled={sending}
                                    className="text-gray-400 hover:text-green-dark font-bold transition-colors py-2"
                                >
                                    Back to Message
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
