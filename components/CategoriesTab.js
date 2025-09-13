"use client";

import { useState } from "react";
import styles from "@/styles/dashboard.module.css";

export default function CategoriesTab({ categories = [], setCategories }) {
    // ab categories undefined nahi ho sakta
    const [newCategory, setNewCategory] = useState({ name: "", image: null, description: "" });
    const [editingId, setEditingId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({ name: "", image: null, description: "" });
    

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

    const addCategory = () => {
        if (!newCategory.name.trim()) return;
        const newId = categories.length + 1;
        setCategories([...categories, { id: newId, ...newCategory }]);
        setNewCategory({ name: "", image: null, description: "" });
    };

    const deleteCategory = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    const startEditing = (cat) => {
        setEditingId(cat.id);
        setEditingCategory({ name: cat.name, image: cat.image, description: cat.description });
    };

    const saveEdit = (id) => {
        setCategories(categories.map(cat => cat.id === id ? { id, ...editingCategory } : cat));
        setEditingId(null);
        setEditingCategory({ name: "", image: null, description: "" });
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
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className={styles.input}
                />
                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} className={styles.input} />
                {newCategory.image && <img src={newCategory.image} alt="preview" className={styles.categoryImg} />}
                <textarea
                    placeholder="Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className={styles.input}
                />
                <button className={styles.saveBtn} onClick={addCategory}>Add Category</button>
            </div>

            {/* Existing Categories */}
            {categories.map(cat => (
                <div key={cat.id} className={styles.tabCard}>
                    {editingId === cat.id ? (
                        <>
                            <input
                                type="text"
                                value={editingCategory.name}
                                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                className={styles.input}
                            />
                            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, true)} className={styles.input} />
                            {editingCategory.image && <img src={editingCategory.image} alt="preview" className={styles.categoryImg} />}
                            <textarea
                                value={editingCategory.description}
                                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                className={styles.input}
                            />
                            <button className={styles.saveBtn} onClick={() => saveEdit(cat.id)}>Save</button>
                        </>
                    ) : (
                        <>
                            <p><b>{cat.name}</b></p>
                            {cat.image && <img src={cat.image} alt={cat.name} className={styles.categoryImg} />}
                            <p>{cat.description}</p>
                            <button className={styles.publishBtn} onClick={() => startEditing(cat)}>Edit</button>
                            <button className={styles.deleteBtn} onClick={() => deleteCategory(cat.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
