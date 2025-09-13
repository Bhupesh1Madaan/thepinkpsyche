"use client";

import React, { useState } from "react";
import styles from "@/styles/dashboard.module.css";

// Dummy categories
const categories = ["Technology", "Lifestyle", "Education", "Health", "Travel"];

export default function BlogsTab() {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState(false);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [content, setContent] = useState([""]); // Array of paragraphs
    const [images, setImages] = useState([{ file: null, preview: null }]);

    // Add paragraph
    const addParagraph = () => setContent([...content, ""]);

    // Update paragraph
    const handleParagraphChange = (index, value) => {
        const updated = [...content];
        updated[index] = value;
        setContent(updated);
    };

    // Remove paragraph
    const removeParagraph = (index) => {
        const updated = content.filter((_, i) => i !== index);
        setContent(updated);
    };

    // Handle image upload
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedImages = [...images];
            updatedImages[index] = { file, preview: reader.result };
            setImages(updatedImages);
        };
        reader.readAsDataURL(file);
    };

    const addImageInput = () => setImages([...images, { file: null, preview: null }]);

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    // Add new blog
    const addBlog = () => {
        const slug = title.toLowerCase().replace(/\s+/g, "-");
        setBlogs([
            ...blogs,
            {
                id: blogs.length + 1,
                title,
                category,
                content,
                images,
                slug,
                published: false,
            },
        ]);

        // Reset form
        setTitle("");
        setCategory(categories[0]);
        setContent([""]);
        setImages([{ file: null, preview: null }]);
        setNewBlog(false);
    };

    // Toggle publish/unpublish
    const togglePublish = (id) =>
        setBlogs(
            blogs.map((b) => (b.id === id ? { ...b, published: !b.published } : b))
        );

    // Delete blog
    const deleteBlog = (id) => setBlogs(blogs.filter((b) => b.id !== id));

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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.input}
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <div>
                        <b>Content:</b>
                        {content.map((para, i) => (
                            <div key={i} style={{ marginBottom: "10px" }}>
                                <textarea
                                    placeholder={`Paragraph ${i + 1}`}
                                    value={para}
                                    onChange={(e) => handleParagraphChange(i, e.target.value)}
                                    style={{
                                        width: "100%",
                                        minHeight: "60px",
                                        padding: "6px",
                                        borderRadius: "6px",
                                        border: "1px solid #d1d5db",
                                        marginBottom: "4px",
                                    }}
                                />
                                {content.length > 1 && (
                                    <button onClick={() => removeParagraph(i)}>Remove Paragraph</button>
                                )}
                            </div>
                        ))}
                        <button onClick={addParagraph}>+ Add Paragraph</button>
                    </div>

                    <div style={{ marginTop: "15px" }}>
                        <b>Images:</b>
                        {images.map((img, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                {img.preview && (
                                    <div>
                                        <img
                                            src={img.preview}
                                            alt={`Preview ${index}`}
                                            style={{ width: "150px", marginTop: "5px", borderRadius: "6px" }}
                                        />
                                        <button onClick={() => removeImage(index)} style={{ marginLeft: "10px" }}>
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button onClick={addImageInput}>+ Add Another Image</button>
                    </div>

                    <button className={styles.saveBtn} onClick={addBlog}>
                        Save Blog
                    </button>
                </div>
            )}

            <div style={{ marginTop: "20px" }}>
                {blogs.map((b) => (
                    <div key={b.id} className={styles.tabCard}>
                        <h3>{b.title}</h3>
                        <p><b>Category:</b> {b.category}</p>
                        {b.content.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            {b.images.map((img, i) =>
                                img.preview ? <img key={i} src={img.preview} alt="" style={{ width: "100px", borderRadius: "6px" }} /> : null
                            )}
                        </div>
                        <p><b>Slug:</b> {b.slug}</p>
                        <button className={styles.publishBtn} onClick={() => togglePublish(b.id)}>
                            {b.published ? "Unpublish" : "Publish"}
                        </button>
                        <button className={styles.deleteBtn} onClick={() => deleteBlog(b.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
