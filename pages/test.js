"use client";

import React, { useState, useEffect } from "react";

const API_BLOGS = "/api/blogs";

export default function TestPage() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const res = await fetch(API_BLOGS);
        const data = await res.json();
        setBlogs(data);
    };

    const saveBlog = async () => {
        if (!title || !category) return alert("Title & category required");

        const slug = title.trim().toLowerCase().replace(/\s+/g, "-");

        const blogData = { title, category, slug, content, published: false };

        try {
            const res = await fetch(API_BLOGS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData),
            });
            if (!res.ok) throw new Error("Error saving blog");
            setTitle("");
            setCategory("");
            setContent("");
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteBlog = async (id) => {
        await fetch(`${API_BLOGS}/${id}`, { method: "DELETE" });
        fetchBlogs();
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Test Blogs Page</h1>

            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <button onClick={saveBlog}>Save Blog</button>

            <h2>Blogs List</h2>
            {blogs.map((b) => (
                <div key={b._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
                    <h3>{b.title}</h3>
                    <p><b>Category:</b> {b.category}</p>
                    <p>{b.content}</p>
                    <button onClick={() => deleteBlog(b._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
