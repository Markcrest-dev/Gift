import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsOfServicePage() {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-[#C41E3A] to-[#8B0000] text-white py-16 md:py-20">
                    <div className="container text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Terms of Service</h1>
                        <p className="text-lg md:text-xl text-white/95">Last Updated: December 17, 2024</p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 md:py-16">
                    <div className="container max-w-4xl">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                By accessing and using Global Gift Exchange ("the Service"), you accept and agree to be bound
                                by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">2. Service Description</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Global Gift Exchange is a platform that enables users to send and receive gifts globally.
                                Recipients can choose to receive gifts as physical items, cash value, cryptocurrency, or
                                donate the value to charity. We act as an intermediary to facilitate these transactions.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">3. User Accounts</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">To use the Service, you must:</p>
                            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                                <li>Be at least 18 years old</li>
                                <li>Provide accurate and complete registration information</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized use</li>
                                <li>Be responsible for all activities under your account</li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">4. Gift Transactions</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                When you send a gift through our platform, you authorize us to charge your payment method
                                for the gift amount plus applicable service fees. All sales are final. Recipients have the
                                right to choose their preferred redemption method within 90 days of receiving the gift notification.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">5. Fees and Payments</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">Our fee structure includes:</p>
                            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                                <li>5% service fee on all gift transactions</li>
                                <li>Payment processing fees (varies by payment method)</li>
                                <li>Currency conversion fees (if applicable)</li>
                                <li>Cryptocurrency transaction fees (if applicable)</li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">6. Prohibited Activities</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">You may not:</p>
                            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                                <li>Use the Service for any illegal purpose</li>
                                <li>Send gifts to yourself or engage in fraudulent activities</li>
                                <li>Attempt to bypass our security measures</li>
                                <li>Harass, abuse, or harm other users</li>
                                <li>Resell or redistribute our services without permission</li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">7. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                All content, features, and functionality of the Service are owned by Global Gift Exchange
                                and are protected by copyright, trademark, and other intellectual property laws.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">8. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We are not liable for any indirect, incidental, special, consequential, or punitive damages
                                arising from your use of the Service. Our total liability shall not exceed the amount you
                                paid in fees during the 12 months prior to the event giving rise to liability.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">9. Dispute Resolution</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Any disputes arising from these terms shall be resolved through binding arbitration in
                                accordance with the rules of the American Arbitration Association. You agree to waive
                                your right to a jury trial or to participate in a class action lawsuit.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">10. Termination</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We reserve the right to suspend or terminate your account at any time for violation of
                                these terms, fraudulent activity, or for any other reason at our sole discretion.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">11. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We may modify these terms at any time. Continued use of the Service after changes constitutes
                                acceptance of the new terms. We will notify you of material changes via email or through the Service.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">12. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For questions about these Terms of Service, contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700"><strong>Email:</strong> legal@giftexchange.com</p>
                                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
                                <p className="text-gray-700"><strong>Address:</strong> 123 Gift Street, Suite 100, New York, NY 10001</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
