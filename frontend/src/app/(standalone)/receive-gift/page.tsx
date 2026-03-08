'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReceiveGiftPage() {
    const [step, setStep] = useState<'view' | 'options' | 'claim' | 'success'>('view');
    const [redemptionType, setRedemptionType] = useState<string | null>(null);

    const gift = {
        name: "Amazing Gift",
        value: 50.00,
        sender: "Anonymous",
        message: "Hope you enjoy this gift! Merry Christmas!",
        image: "https://placehold.co/300x300?text=Gift"
    };

    const handleClaim = () => {
        setStep('success');
    };

    if (step === 'success') {
        return (
            <div className="receive-container fade-in-up text-center pt-20">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-4 text-white">Gift Claimed Successfully!</h2>
                <p className="text-white opacity-90 mb-8">Your gift will be processed shortly.</p>
                <Link href="/" className="btn btn-primary btn-lg">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#c41e3a] via-[#8b0000] to-[#228b22]">
            <div className="receive-container max-w-2xl mx-auto p-8 relative z-10">

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-[#c41e3a] to-[#8b0000] text-white p-8 text-center">
                        <div className="text-6xl mb-4 animate-bounce">🎁</div>
                        <h1 className="text-3xl font-bold mb-2">You&apos;ve Received a Gift!</h1>
                        <p className="opacity-90">Someone special sent you something amazing</p>
                    </div>

                    <div className="p-8">
                        <div className="flex gap-6 mb-8 border-b-2 border-gray-100 pb-8">
                            <img src={gift.image} alt="Gift" className="w-32 h-32 object-contain bg-[var(--cream)] rounded-xl p-4" />
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2">{gift.name}</h2>
                                <div className="text-3xl font-bold text-[#c41e3a] mb-4">${gift.value.toFixed(2)}</div>
                                <div className="bg-[var(--cream)] p-4 rounded-lg">
                                    <strong>From:</strong> {gift.sender}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--cream)] p-6 rounded-xl mb-8">
                            <h3 className="font-semibold mb-2">💌 Personal Message:</h3>
                            <p className="italic text-gray-600">&quot;{gift.message}&quot;</p>
                        </div>

                        {step === 'view' && (
                            <button className="btn btn-primary btn-lg w-full" onClick={() => setStep('options')}>
                                View Redemption Options
                            </button>
                        )}

                        {step === 'options' && (
                            <div className="fade-in-up">
                                <h3 className="text-xl font-bold mb-4 text-center">Choose How to Receive Your Gift</h3>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {[
                                        { id: 'physical', icon: '📦', label: 'Ship to Me' },
                                        { id: 'cash', icon: '💵', label: 'Cash Value' },
                                        { id: 'crypto', icon: '₿', label: 'Crypto' },
                                        { id: 'donate', icon: '❤️', label: 'Donate' }
                                    ].map(opt => (
                                        <div
                                            key={opt.id}
                                            className="p-4 border-2 border-gray-200 rounded-xl text-center cursor-pointer hover:border-[#c41e3a] hover:bg-[var(--cream)] transition-all"
                                            onClick={() => { setRedemptionType(opt.id); setStep('claim'); }}
                                        >
                                            <div className="text-3xl mb-2">{opt.icon}</div>
                                            <div className="font-bold">{opt.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 'claim' && (
                            <div className="fade-in-up">
                                {redemptionType === 'physical' && (
                                    <div>
                                        <h3 className="font-semibold mb-4 text-center">Shipping Details</h3>
                                        <input type="text" className="form-input mb-4" placeholder="Full Name" />
                                        <textarea className="form-input mb-4" placeholder="Address"></textarea>
                                        <button className="btn btn-primary btn-lg w-full" onClick={handleClaim}>Claim Gift 🎁</button>
                                    </div>
                                )}
                                {/* Other forms omitted for brevity but logic stands */}
                                {redemptionType !== 'physical' && (
                                    <div>
                                        <p className="text-center mb-4">Redemption form for {redemptionType} would go here.</p>
                                        <button className="btn btn-primary btn-lg w-full" onClick={handleClaim}>Complete Claim</button>
                                    </div>
                                )}
                                <button className="btn btn-outline w-full mt-4" onClick={() => setStep('options')}>Back</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
