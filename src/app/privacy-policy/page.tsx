import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-[#C41E3A] to-[#8B0000] text-white py-16 md:py-20">
                    <div className="container text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">Privacy Policy</h1>
                        <p className="text-lg md:text-xl text-white/95">Last Updated: December 17, 2024</p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12 md:py-16">
                    <div className="container max-w-4xl">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We collect information that you provide directly to us when you create an account, send gifts,
                                or communicate with us. This includes your name, email address, payment information, and any
                                messages you include with your gifts.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">2. How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
                            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                                <li>Process and deliver your gift transactions</li>
                                <li>Send you transaction confirmations and updates</li>
                                <li>Improve our services and user experience</li>
                                <li>Detect and prevent fraud</li>
                                <li>Comply with legal obligations</li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">3. Information Sharing</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We do not sell your personal information. We may share your information with service providers
                                who help us operate our platform, payment processors, and as required by law.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">4. Data Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We implement industry-standard security measures to protect your personal information. This
                                includes encryption, secure servers, and regular security audits. However, no method of
                                transmission over the Internet is 100% secure.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">5. Your Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Export your data</li>
                            </ul>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">6. Cookies and Tracking</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We use cookies and similar tracking technologies to enhance your experience, analyze usage
                                patterns, and personalize content. You can control cookie preferences through your browser settings.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">7. International Transfers</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Your information may be transferred to and processed in countries other than your country of
                                residence. We ensure appropriate safeguards are in place for such transfers.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">8. Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Our service is not intended for children under 13. We do not knowingly collect information
                                from children under 13. If you are a parent or guardian and believe your child has provided
                                us with personal information, please contact us.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">9. Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                We may update this privacy policy from time to time. We will notify you of any changes by
                                posting the new policy on this page and updating the "Last Updated" date.
                            </p>

                            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 mt-8">10. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <p className="text-gray-700"><strong>Email:</strong> privacy@giftexchange.com</p>
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
