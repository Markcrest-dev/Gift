import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-section-title">About GiftExchange</h3>
                        <p className="text-light">Making global gift giving easy, secure, and joyful. Send love across borders
                            this holiday season.</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="fab fa-facebook"></i> Facebook</a>
                            <a href="#" className="social-link"><i className="fab fa-twitter"></i> Twitter</a>
                            <a href="#" className="social-link"><i className="fab fa-instagram"></i> Instagram</a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-section-title">Quick Links</h3>
                        <div className="footer-links">
                            <Link href="/marketplace" className="footer-link">Browse Gifts</Link>
                            <Link href="/about" className="footer-link">About Us</Link>
                            <Link href="/contact" className="footer-link">Contact</Link>
                            <Link href="/dashboard" className="footer-link">Dashboard</Link>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-section-title">Support</h3>
                        <div className="footer-links">
                            <Link href="/contact" className="footer-link">Help Center</Link>
                            <a href="#" className="footer-link">FAQ</a>
                            <a href="#" className="footer-link">Shipping Info</a>
                            <a href="#" className="footer-link">Returns</a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-section-title">Legal</h3>
                        <div className="footer-links">
                            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="footer-link">Terms of Service</Link>
                            <a href="#" className="footer-link">Cookie Policy</a>
                            <a href="#" className="footer-link">Compliance</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 Global Gift Exchange. All rights reserved. Made with <i className="fas fa-heart"></i> for
                        spreading joy worldwide.</p>
                </div>
            </div>
        </footer>
    );
}
