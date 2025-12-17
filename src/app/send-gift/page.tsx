'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormComponents';

export default function SendGiftPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        recipientCountry: '',
        message: '',
        deliveryDate: '',
        anonymous: false,
        paymentMethod: 'card'
    });

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Gift sent:', formData);
        // Handle form submission
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="container max-w-4xl">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="flex items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-[#C41E3A] text-white' : 'bg-gray-300 text-gray-600'
                                        }`}>
                                        {num}
                                    </div>
                                    {num < 4 && (
                                        <div className={`flex-1 h-1 mx-2 ${step > num ? 'bg-[#C41E3A]' : 'bg-gray-300'}`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Recipient</span>
                            <span>Personalize</span>
                            <span>Payment</span>
                            <span>Review</span>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Recipient Details */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Recipient Details</h2>

                                    <Input
                                        label="Recipient Name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.recipientName}
                                        onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                                        required
                                    />

                                    <Input
                                        label="Recipient Email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.recipientEmail}
                                        onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                                        required
                                    />

                                    <Select
                                        label="Country"
                                        value={formData.recipientCountry}
                                        onChange={(e) => setFormData({ ...formData, recipientCountry: e.target.value })}
                                        options={[
                                            { value: '', label: 'Select country' },
                                            { value: 'US', label: 'United States' },
                                            { value: 'UK', label: 'United Kingdom' },
                                            { value: 'CA', label: 'Canada' },
                                            { value: 'NG', label: 'Nigeria' },
                                            { value: 'IN', label: 'India' },
                                            { value: 'AU', label: 'Australia' }
                                        ]}
                                        required
                                    />

                                    <div className="flex justify-end gap-4 mt-8">
                                        <Button type="button" onClick={handleNext} size="lg">
                                            Next <i className="fas fa-arrow-right ml-2"></i>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Personalize */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Personalize Your Gift</h2>

                                    <Textarea
                                        label="Personal Message"
                                        placeholder="Write a heartfelt message..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />

                                    <Input
                                        label="Delivery Date (Optional)"
                                        type="date"
                                        value={formData.deliveryDate}
                                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                                    />

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="anonymous"
                                            checked={formData.anonymous}
                                            onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                                            className="mr-3 w-5 h-5"
                                        />
                                        <label htmlFor="anonymous" className="text-gray-700">
                                            Send anonymously
                                        </label>
                                    </div>

                                    <div className="flex justify-between gap-4 mt-8">
                                        <Button type="button" onClick={handleBack} variant="outline" size="lg">
                                            <i className="fas fa-arrow-left mr-2"></i> Back
                                        </Button>
                                        <Button type="button" onClick={handleNext} size="lg">
                                            Next <i className="fas fa-arrow-right ml-2"></i>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Payment */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Payment Method</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                            className={`p-6 border-2 rounded-lg text-center transition-all ${formData.paymentMethod === 'card'
                                                    ? 'border-[#C41E3A] bg-red-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <i className="fas fa-credit-card text-3xl mb-2 text-[#C41E3A]"></i>
                                            <div className="font-semibold">Credit Card</div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                                            className={`p-6 border-2 rounded-lg text-center transition-all ${formData.paymentMethod === 'paypal'
                                                    ? 'border-[#C41E3A] bg-red-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <i className="fab fa-paypal text-3xl mb-2 text-blue-600"></i>
                                            <div className="font-semibold">PayPal</div>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'crypto' })}
                                            className={`p-6 border-2 rounded-lg text-center transition-all ${formData.paymentMethod === 'crypto'
                                                    ? 'border-[#C41E3A] bg-red-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <i className="fab fa-bitcoin text-3xl mb-2 text-orange-500"></i>
                                            <div className="font-semibold">Crypto</div>
                                        </button>
                                    </div>

                                    {formData.paymentMethod === 'card' && (
                                        <div className="space-y-4 mt-6">
                                            <Input label="Card Number" type="text" placeholder="1234 5678 9012 3456" required />
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input label="Expiry Date" type="text" placeholder="MM/YY" required />
                                                <Input label="CVV" type="text" placeholder="123" required />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between gap-4 mt-8">
                                        <Button type="button" onClick={handleBack} variant="outline" size="lg">
                                            <i className="fas fa-arrow-left mr-2"></i> Back
                                        </Button>
                                        <Button type="button" onClick={handleNext} size="lg">
                                            Next <i className="fas fa-arrow-right ml-2"></i>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Review & Confirm */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Review & Confirm</h2>

                                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Recipient:</span>
                                            <span className="font-semibold">{formData.recipientName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-semibold">{formData.recipientEmail}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Country:</span>
                                            <span className="font-semibold">{formData.recipientCountry}</span>
                                        </div>
                                        <div className="border-t pt-4 mt-4">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Gift Amount:</span>
                                                <span className="font-semibold">$299.00</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span className="text-gray-600">Service Fee (5%):</span>
                                                <span className="font-semibold">$14.95</span>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xl font-bold">
                                                <span>Total:</span>
                                                <span className="text-[#C41E3A]">$313.95</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between gap-4 mt-8">
                                        <Button type="button" onClick={handleBack} variant="outline" size="lg">
                                            <i className="fas fa-arrow-left mr-2"></i> Back
                                        </Button>
                                        <Button type="submit" size="lg">
                                            <i className="fas fa-check mr-2"></i> Confirm & Send
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
