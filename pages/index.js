import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="text-center">
        <section className="h-screen flex items-center justify-center bg-cover bg-center text-white"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64')" }}>
          <h1 className="text-5xl font-bold bg-black/50 p-6 rounded-xl">The Pink Psyche</h1>
        </section>

        <section className="p-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>Empowering women through calmness, reflection, and growth.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
