import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";

export default function Blogs() {
    const categories = [
        { id: 1, name: "Love" },
        { id: 2, name: "Relationships" },
        { id: 3, name: "Circumstances" },
    ];

    const blogs = [
        { id: 1, title: "Self Love Tips", category: "Love", img: "https://via.placeholder.com/400x250?text=Self+Love", summary: "Learn how to love yourself first." },
        { id: 2, title: "Healthy Relationship", category: "Relationships", img: "https://via.placeholder.com/400x250?text=Relationships", summary: "Tips for a balanced relationship." },
        { id: 3, title: "Overcoming Challenges", category: "Circumstances", img: "https://via.placeholder.com/400x250?text=Circumstances", summary: "How to overcome tough situations." },
        { id: 4, title: "Mindful Living", category: "Love", img: "https://via.placeholder.com/400x250?text=Mindfulness", summary: "Practice mindfulness daily." },
        { id: 5, title: "Communication Skills", category: "Relationships", img: "https://via.placeholder.com/400x250?text=Communication", summary: "Enhance your communication." },
    ];

    return (
        <div className="font-sans">
            <Navbar />

            <section className="pt-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Our Blogs</h1>

                {/* Categories */}
                <div className="flex justify-center gap-4 mb-8">
                    {categories.map((cat) => (
                        <span key={cat.id} className="px-4 py-2 rounded-full bg-pink-500 text-white font-medium cursor-pointer hover:bg-pink-600">
                            {cat.name}
                        </span>
                    ))}
                </div>

                {/* Blog Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.id}`}>
                            <div className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer">
                                <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
                                <div className="p-4 bg-white">
                                    <h2 className="text-lg font-bold text-green-700">{blog.title}</h2>
                                    <p className="text-gray-700 mt-2">{blog.summary}</p>
                                    <span className="text-sm text-pink-500 mt-1 inline-block">{blog.category}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
