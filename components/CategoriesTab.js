"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import { uploadImage } from "@/lib/uploadImage";

export default function CategoriesTab() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: "",
        image: null,
        description: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({
        name: "",
        image: null,
        description: "",
    });

    // 🟢 Fetch categories from DB
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // 🟢 Handle image upload (base64)
    const handleImageChange = (e, isEdit = false) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (isEdit) {
                setEditingCategory({ ...editingCategory, image: reader.result });
            } else {
                setNewCategory({ ...newCategory, image: reader.result });
            }
        };
        reader.readAsDataURL(file);
    };

    // 🟢 Add new category (API → MongoDB)
    const addCategory = async () => {
        if (!newCategory.name.trim()) return;

        let imageUrl = null;
        if (newCategory.image) {
            imageUrl = await uploadImage(newCategory.image); // base64 → url
        }

        const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: newCategory.name,
                description: newCategory.description,
                image: imageUrl,
            }),
        });

        const savedCat = await res.json();
        setCategories([...categories, savedCat]);

        setNewCategory({ name: "", image: null, description: "" });
    };


    // 🟢 Delete category (API → MongoDB)
    const deleteCategory = async (id) => {
        try {
            await fetch(`/api/categories/${id}`, { method: "DELETE" });
            setCategories(categories.filter((cat) => cat._id !== id));
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // 🟢 Start editing
    const startEditing = (cat) => {
        setEditingId(cat._id);
        setEditingCategory({
            name: cat.name,
            image: cat.image,
            description: cat.description,
        });
    };

    // 🟢 Save edited category (API → MongoDB)
    const saveEdit = async (id) => {
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingCategory),
            });

            const data = await res.json();
            setCategories(categories.map((cat) => (cat._id === id ? data : cat)));
            setEditingId(null);
            setEditingCategory({ name: "", image: null, description: "" });
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    return (
        <div className={styles.tabContent}>
            <h2>Manage Categories</h2>

            {/* Add New Category */}
            <div className={styles.editorContainer}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className={styles.input}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className={styles.input}
                />
                {newCategory.image && (
                    <img
                        src={newCategory.image}
                        alt="preview"
                        className={styles.categoryImg}
                    />
                )}
                <textarea
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) =>
                        setNewCategory({ ...newCategory, description: e.target.value })
                    }
                    className={styles.input}
                />
                <button className={styles.saveBtn} onClick={addCategory}>
                    Add Category
                </button>
            </div>

            {/* Existing Categories */}
            {categories.map((cat) => (
                <div key={cat._id} className={styles.tabCard}>
                    {editingId === cat._id ? (
                        <>
                            <input
                                type="text"
                                value={editingCategory.name}
                                onChange={(e) =>
                                    setEditingCategory({
                                        ...editingCategory,
                                        name: e.target.value,
                                    })
                                }
                                className={styles.input}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, true)}
                                className={styles.input}
                            />
                            {editingCategory.image && (
                                <img
                                    src={editingCategory.image}
                                    alt="preview"
                                    className={styles.categoryImg}
                                />
                            )}
                            <textarea
                                value={editingCategory.description}
                                onChange={(e) =>
                                    setEditingCategory({
                                        ...editingCategory,
                                        description: e.target.value,
                                    })
                                }
                                className={styles.input}
                            />
                            <button
                                className={styles.saveBtn}
                                onClick={() => saveEdit(cat._id)}
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <p>
                                <b>{cat.name}</b>
                            </p>
                            {cat.image && (
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className={styles.categoryImg}
                                />
                            )}
                            <p>{cat.description}</p>
                            <button
                                className={styles.publishBtn}
                                onClick={() => startEditing(cat)}
                            >
                                Edit
                            </button>
                            <button
                                className={styles.deleteBtn}
                                onClick={() => deleteCategory(cat._id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
