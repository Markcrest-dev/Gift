'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/FormComponents';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function RequestGiftPage() {
    const [formData, setFormData] = useState({
        giftName: '',
        description: '',
        reason: '',
        targetAmount: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Gift request:', formData);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="container max-w-3xl">
                    <Card>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">Request a Gift</h1>
                        <p className="text-gray-600 mb-8">
                            Create a gift request and share it with friends and family. They can contribute to help you get what you want!
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Gift Name"
                                type="text"
                                placeholder="e.g., New Laptop for School"
                                value={formData.giftName}
                                onChange={(e) => setFormData({ ...formData, giftName: e.target.value })}
                                required
                            />

                            <Textarea
                                label="Description"
                                placeholder="Describe the gift you're requesting..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />

                            <Textarea
                                label="Why do you need this gift?"
                                placeholder="Share your story..."
                                rows={5}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                required
                            />

                            <Input
                                label="Target Amount"
                                type="number"
                                placeholder="500"
                                value={formData.targetAmount}
                                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                                required
                            />

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <i className="fas fa-info-circle mr-2"></i>
                                    Your gift request will be shared with your network. Multiple people can contribute towards your goal!
                                </p>
                            </div>

                            <Button type="submit" size="lg" fullWidth>
                                <i className="fas fa-paper-plane mr-2"></i> Create Request
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>

            <Footer />
        </>
    );
}
