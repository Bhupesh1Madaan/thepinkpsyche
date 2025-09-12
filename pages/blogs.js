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

            <section className="blogs-section">
                <h1>Our Blogs</h1>

                {/* Categories */}
                <div className="blog-categories">
                    {categories.map((cat) => (
                        <span key={cat.id} className="blog-category">
                            {cat.name}
                        </span>
                    ))}
                </div>

                {/* Blog Cards */}
                <div className="blog-cards">
                    {blogs.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.id}`}>
                            <div className="blog-card">
                                <img src={blog.img} alt={blog.title} />
                                <div className="blog-card-content">
                                    <h2>{blog.title}</h2>
                                    <p>{blog.summary}</p>
                                    <span>{blog.category}</span>
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
