import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ContactUs() {
    return (
        <>
            <Navbar />
            <main className="p-10 text-center">
                <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                <p>Email: support@thepinkpsyche.com</p>
                <p>Follow us on Instagram, Twitter, and Facebook</p>
            </main>
            <Footer />
        </>
    );
}
