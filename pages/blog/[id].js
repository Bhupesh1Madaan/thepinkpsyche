"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function BlogPage() {
    const router = useRouter();
    const { id } = router.query; // slug

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                const res = await axios.get("/api/blogs"); // fetch all blogs
                const b = res.data.find((item) => item.slug === id);
                setBlog(b || null);
            } catch (err) {
                console.error(err);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleShare = () => {
        if (!blog) return;
        const url = `${window.location.origin}/blog/${blog.slug}`;
        navigator.clipboard.writeText(url).then(() => alert("Blog link copied!"));
    };

    if (loading) return <div style={{ textAlign: "center", marginTop: "100px" }}>Loading...</div>;
    if (!blog) return <div style={{ textAlign: "center", marginTop: "100px" }}>Blog not found</div>;

    return (
        <>
            <Navbar animate={false} />
            <div style={{ maxWidth: "900px", margin: "90px auto", padding: "0 20px" }}>

                {/* Featured Image */}
                {blog.featuredImage && (
                    <div style={{ marginBottom: "40px", textAlign: "center" }}>
                        <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
                        />
                    </div>
                )}

                {/* Title & Category */}
                <h1 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "10px", textAlign: "center" }}>
                    {blog.title}
                </h1>
                <p style={{ textAlign: "center", fontStyle: "italic", marginBottom: "30px" }}>
                    Category: {blog.category}
                </p>

                {/* Content Blocks */}
                {blog.contentBlocks.map((block, idx) => {
                    const isRow = block.imagePosition === "left" || block.imagePosition === "right";
                    const flexDirection = block.imagePosition === "left" ? "row" :
                        block.imagePosition === "right" ? "row-reverse" :
                            "column";

                    return (
                        <div key={idx} style={{
                            display: "flex",
                            flexDirection,
                            alignItems: isRow ? "center" : "flex-start",
                            marginBottom: "30px",
                            gap: "15px",
                        }}>
                            {block.image && (
                                <img
                                    src={block.image}
                                    alt={`block-${idx}`}
                                    style={{
                                        width: block.imageWidth || (isRow ? "40%" : "100%"),
                                        height: block.imageHeight || "auto",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            )}
                            {block.type === "paragraph" && (
                                <p style={{ fontSize: "18px", lineHeight: "1.7" }}>
                                    {block.text}
                                </p>
                            )}
                        </div>
                    );
                })}

                {/* Share Button */}
                <div style={{ textAlign: "center", margin: "40px 0" }}>
                    <button
                        onClick={handleShare}
                        style={{
                            padding: "12px 25px",
                            backgroundColor: "#0f5101",
                            color: "#fff",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0c3d01")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#0f5101")}
                    >
                        Share This Blog
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}