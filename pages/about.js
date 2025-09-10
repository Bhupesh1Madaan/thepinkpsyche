import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About() {
    return (
        <>
            <Navbar />
            <main className="p-10 text-center">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p>
                    The Pink Psyche is built to inspire and empower women worldwide.
                    We believe in calmness (water), beauty (butterfly), and reflection (mirror).
                </p>
            </main>
            <Footer />
        </>
    );
}
