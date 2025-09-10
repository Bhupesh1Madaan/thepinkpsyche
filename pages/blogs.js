import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";

export default function Blogs() {
    const blogList = [
        { id: 1, title: "Love & Reflection", excerpt: "Exploring self-love.." },
        { id: 2, title: "Overcoming Circumstances", excerpt: "Rising above.." },
    ];

    return (
        <>
            <Navbar />
            <main className="p-10 text-center">
                <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
                <div className="grid gap-6 max-w-xl mx-auto">
                    {blogList.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.id}`}>
                            <div className="p-6 border rounded-lg shadow hover:shadow-lg cursor-pointer">
                                <h2 className="text-xl font-semibold">{blog.title}</h2>
                                <p>{blog.excerpt}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
