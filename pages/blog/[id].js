import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BlogDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [copied, setCopied] = useState(false);

    const blogData = {
        1: {
            title: "Self Love Tips",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac justo eget libero facilisis tempor. Curabitur eget justo eget arcu tempus.",
            img: "https://via.placeholder.com/800x400?text=Self+Love",
        },
        2: {
            title: "Healthy Relationship",
            content: "Tips and guidance to maintain a healthy relationship. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img: "https://via.placeholder.com/800x400?text=Relationships",
        },
        3: {
            title: "Overcoming Challenges",
            content: "How to overcome difficult situations in life. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img: "https://via.placeholder.com/800x400?text=Circumstances",
        },
        4: {
            title: "Mindful Living",
            content: "Learn how to live mindfully and stay present. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img: "https://via.placeholder.com/800x400?text=Mindfulness",
        },
        5: {
            title: "Communication Skills",
            content: "Enhance your communication skills in daily life. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            img: "https://via.placeholder.com/800x400?text=Communication",
        },
    };

    const blog = blogData[id];

    if (!blog) return <p>Loading...</p>;

    // Copy current page URL
    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="font-sans">
            <Navbar />

            <section className="blog-detail-section">
                <h1>{blog.title}</h1>
                <img src={blog.img} alt={blog.title} className="blog-detail-img" />
                <p>{blog.content}</p>

                <button className="share-btn" onClick={handleShare}>
                    {copied ? "Copied!" : "Share this post"}
                </button>
            </section>

            <Footer />
        </div>
    );
}
