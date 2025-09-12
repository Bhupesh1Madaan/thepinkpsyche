import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Contact() {
    return (
        <div className="font-sans">
            <Navbar />

            <section className="contact-section">
                <h1>Contact Us</h1>

                <form>
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <textarea name="message" placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>

            <Footer />
        </div>
    );
}
