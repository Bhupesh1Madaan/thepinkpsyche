import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>We're dedicated to helping you overcome self-sabotage and create lasting positive change in your life.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <p><Link href="/">Home</Link></p>
                    <p><Link href="/about">About</Link></p>
                    <p><Link href="/blog">Blog</Link></p>
                    <p><Link href="/contactus">Contact</Link></p>
                </div>
                <div className="footer-section">
                    <h3>Connect</h3>
                    <p><a href="#">Facebook</a></p>
                    <p><a href="#">Twitter</a></p>
                    <p><a href="#">Instagram</a></p>
                    <p><a href="#">LinkedIn</a></p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 The Pink Psyche. All rights reserved.</p>
            </div>
        </footer>
    );
}
