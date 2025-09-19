"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";

const API_CATEGORIES = "/api/categories";
const API_BLOGS = "/api/blogs";

export default function BlogsTab() {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newBlog, setNewBlog] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [contentBlocks, setContentBlocks] = useState([
        { type: "paragraph", text: "", image: null, imagePosition: "top", imageWidth: 300, imageHeight: 200 },
    ]);

    // Fetch categories
    useEffect(() => {
        fetch(API_CATEGORIES)
            .then(res => res.json())
            .then(data => {
                const catNames = data.map(c => c.name || c);
                setCategories(catNames);
                if (catNames.length > 0) setCategory(catNames[0]);
            });
    }, []);

    // Fetch blogs
    useEffect(() => {
        fetch(API_BLOGS)
            .then(res => res.json())
            .then(data => {
                const fixed = data
                    .map(b => ({
                        ...b,
                        contentBlocks: Array.isArray(b.contentBlocks) ? b.contentBlocks : [],
                    }))
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setBlogs(fixed);
            });
    }, []);

    // Paragraph functions
    const addParagraph = () => setContentBlocks([...contentBlocks, { type: "paragraph", text: "", image: null, imagePosition: "top", imageWidth: 300, imageHeight: 200 }]);
    const updateParagraphText = (index, value) => {
        const updated = [...contentBlocks];
        updated[index].text = value;
        setContentBlocks(updated);
    };
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const updated = [...contentBlocks];
            updated[index].image = reader.result;
            setContentBlocks(updated);
        };
        reader.readAsDataURL(file);
    };
    const handleImagePositionChange = (index, position) => {
        const updated = [...contentBlocks];
        updated[index].imagePosition = position;
        setContentBlocks(updated);
    };
    const handleImageSizeChange = (index, width, height) => {
        const updated = [...contentBlocks];
        updated[index].imageWidth = width;
        updated[index].imageHeight = height;
        setContentBlocks(updated);
    };
    const removeParagraph = (index) => setContentBlocks(contentBlocks.filter((_, i) => i !== index));

    // Save new blog
    const saveBlog = async () => {
        const slug = title?.trim().toLowerCase().replace(/\s+/g, "-") || "";
        if (!title || !category) return alert("⚠️ Title and Category are required!");

        const blogData = { title, category, slug, contentBlocks, published: false };
        try {
            const res = await fetch(API_BLOGS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData),
            });
            if (!res.ok) throw new Error("Failed to save blog");
            const newBlog = await res.json();
            setBlogs([{ ...newBlog, contentBlocks: newBlog.contentBlocks || [] }, ...blogs]);
            resetForm();
        } catch (err) {
            console.error("Save blog error:", err);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await fetch(`${API_BLOGS}/${id}`, { method: "DELETE" });
            setBlogs(blogs.filter(b => b._id !== id));
        } catch (err) { console.error(err); }
    };

    const togglePublish = async (blog) => {
        try {
            const res = await fetch(`${API_BLOGS}/${blog._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: !blog.published }),
            });
            if (!res.ok) throw new Error("Failed to update publish status");
            const updated = await res.json();
            setBlogs(prev => prev.map(b => b._id === blog._id ? { ...b, published: updated.published } : b));
        } catch (err) { console.error(err); }
    };

    const resetForm = () => {
        setTitle("");
        setCategory(categories[0] || "");
        setContentBlocks([{ type: "paragraph", text: "", image: null, imagePosition: "top", imageWidth: 300, imageHeight: 200 }]);
        setNewBlog(false);
    };

    return (
        <div className={styles.tabContent}>
            <button className={styles.addBtn} onClick={() => setNewBlog(!newBlog)}>
                {newBlog ? "Cancel" : "+ Add New Blog"}
            </button>

            {newBlog && (
                <div className={styles.editorContainer}>
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                    <select
                        value={category || ""}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.input}
                    >
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    {contentBlocks.map((block, i) => (
                        <div key={`para-${i}`} style={{ marginBottom: "15px" }}>
                            <textarea
                                placeholder={`Paragraph ${i + 1}`}
                                value={block.text}
                                onChange={(e) => updateParagraphText(i, e.target.value)}
                                style={{ width: "100%", minHeight: "60px", padding: "6px", borderRadius: "6px", border: "1px solid #d1d5db" }}
                            />
                            <div style={{ marginTop: "5px" }}>
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, i)} />
                                {block.image && (
                                    <div>
                                        <img src={block.image} alt={`Image ${i}`} style={{ width: block.imageWidth, height: block.imageHeight, marginTop: "5px", borderRadius: "6px" }} />
                                        <div>
                                            <label>Position:</label>
                                            <select value={block.imagePosition} onChange={(e) => handleImagePositionChange(i, e.target.value)}>
                                                <option value="top">Top</option>
                                                <option value="bottom">Bottom</option>
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>
                                            </select>
                                            <label>Width:</label>
                                            <input type="number" value={block.imageWidth} onChange={(e) => handleImageSizeChange(i, parseInt(e.target.value), block.imageHeight)} />
                                            <label>Height:</label>
                                            <input type="number" value={block.imageHeight} onChange={(e) => handleImageSizeChange(i, block.imageWidth, parseInt(e.target.value))} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {contentBlocks.length > 1 && <button onClick={() => removeParagraph(i)}>Remove Paragraph</button>}
                        </div>
                    ))}

                    <button onClick={addParagraph}>+ Add Paragraph</button>
                    <button className={styles.saveBtn} onClick={saveBlog}>Save Blog</button>
                </div>
            )}

            <div style={{ marginTop: "20px" }}>
                {blogs.map((b) => (
                    <div key={b._id} className={styles.tabCard}>
                        <h3>{b.title}</h3>
                        <p><b>Category:</b> {b.category}</p>
                        {b.contentBlocks.map((block, i) => (
                            <div key={`${b._id}-${i}`} style={{
                                display: "flex",
                                flexDirection: (block.imagePosition === "left" ? "row" : block.imagePosition === "right" ? "row-reverse" : "column"),
                                alignItems: "center",
                                marginBottom: "10px"
                            }}>
                                {block.image && <img src={block.image} style={{ width: block.imageWidth, height: block.imageHeight, marginRight: block.imagePosition === "left" ? "10px" : 0, marginLeft: block.imagePosition === "right" ? "10px" : 0, borderRadius: "6px" }} />}
                                <p>{block.text}</p>
                            </div>
                        ))}
                        <p><b>Slug:</b> {b.slug}</p>
                        <button className={styles.publishBtn} onClick={() => togglePublish(b)}>
                            {b.published ? "Unpublish" : "Publish"}
                        </button>
                        <button className={styles.deleteBtn} onClick={() => deleteBlog(b._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}