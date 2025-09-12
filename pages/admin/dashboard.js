import { useState } from "react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("categories");

    // Categories State
    const [categories, setCategories] = useState([
        { id: 1, name: "Love", description: "Articles about love and relationships", imageFile: null },
        { id: 2, name: "Career", description: "Women career empowerment tips", imageFile: null },
        { id: 3, name: "Self Growth", description: "Self improvement and introspection", imageFile: null },
    ]);
    const [newCategory, setNewCategory] = useState({ name: "", description: "", imageFile: null });
    const [editingId, setEditingId] = useState(null);

    // Blogs State
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Self Love Tips",
            category: "Love",
            paragraphs: ["Paragraph 1", "Paragraph 2"],
            images: [],
            published: true
        },
        {
            id: 2,
            title: "Career Guidance",
            category: "Career",
            paragraphs: ["Paragraph 1", "Paragraph 2"],
            images: [],
            published: false
        }
    ]);
    const [newBlog, setNewBlog] = useState({ title: "", category: "", paragraphs: [""], images: [], published: false });
    const [editingBlogId, setEditingBlogId] = useState(null);

    // ===== Categories CRUD =====
    const addCategory = () => {
        if (!newCategory.name) return alert("Name is required");
        const id = categories.length ? categories[categories.length - 1].id + 1 : 1;
        setCategories([...categories, { id, ...newCategory }]);
        setNewCategory({ name: "", description: "", imageFile: null });
    };

    const startEditCategory = (cat) => {
        setEditingId(cat.id);
        setNewCategory({ name: cat.name, description: cat.description, imageFile: cat.imageFile });
    };

    const saveEditCategory = () => {
        setCategories(categories.map(c => c.id === editingId ? { ...c, ...newCategory } : c));
        setEditingId(null);
        setNewCategory({ name: "", description: "", imageFile: null });
    };

    const cancelEditCategory = () => {
        setEditingId(null);
        setNewCategory({ name: "", description: "", imageFile: null });
    };

    const deleteCategory = (id) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    // ===== Blogs CRUD =====
    const addBlog = () => {
        if (!newBlog.title || !newBlog.category) return alert("Title and Category required");
        const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1;
        setBlogs([...blogs, { id, ...newBlog }]);
        setNewBlog({ title: "", category: "", paragraphs: [""], images: [], published: false });
    };

    const startEditBlog = (blog) => {
        setEditingBlogId(blog.id);
        setNewBlog({ ...blog });
    };

    const saveEditBlog = () => {
        setBlogs(blogs.map(b => b.id === editingBlogId ? { ...newBlog } : b));
        setEditingBlogId(null);
        setNewBlog({ title: "", category: "", paragraphs: [""], images: [], published: false });
    };

    const cancelEditBlog = () => {
        setEditingBlogId(null);
        setNewBlog({ title: "", category: "", paragraphs: [""], images: [], published: false });
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(b => b.id !== id));
    };

    const renderTabContent = () => {
        if (activeTab === "categories") {
            return (
                <div>
                    <h2>Categories Management</h2>

                    {editingId === null && (
                        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                            <input type="text" placeholder="Name" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
                            <input type="text" placeholder="Description" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
                            <input type="file" accept="image/*" onChange={e => setNewCategory({ ...newCategory, imageFile: e.target.files[0] })} />
                            <button style={buttonStyle} onClick={addCategory}>Add Category</button>
                        </div>
                    )}

                    {categories.map(cat => (
                        <div key={cat.id} style={{ background: "#ccc", border: "5px solid black", padding: "10px", marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                            {editingId === cat.id ? (
                                <>
                                    <input type="text" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} />
                                    <input type="text" value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} />
                                    <input type="file" accept="image/*" onChange={e => setNewCategory({ ...newCategory, imageFile: e.target.files[0] })} />
                                    {newCategory.imageFile && <img src={URL.createObjectURL(newCategory.imageFile)} alt="preview" style={{ width: "60px", height: "60px", objectFit: "cover" }} />}
                                    <button style={buttonStyle} onClick={saveEditCategory}>Save</button>
                                    <button style={buttonStyle} onClick={cancelEditCategory}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {cat.imageFile && <img src={cat.imageFile instanceof File ? URL.createObjectURL(cat.imageFile) : ""} alt={cat.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} />}
                                    <div style={{ flex: 1 }}>
                                        <h3>{cat.name}</h3>
                                        <p>{cat.description}</p>
                                    </div>
                                    <button style={buttonStyle} onClick={() => startEditCategory(cat)}>Edit</button>
                                    <button style={buttonStyle} onClick={() => deleteCategory(cat.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === "blogs") {
            return (
                <div>
                    <h2>Blogs Management</h2>

                    {editingBlogId === null && (
                        <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            <input type="text" placeholder="Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
                            <select value={newBlog.category} onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>

                            {newBlog.paragraphs.map((p, idx) => (
                                <textarea key={idx} value={p} onChange={e => {
                                    const paras = [...newBlog.paragraphs];
                                    paras[idx] = e.target.value;
                                    setNewBlog({ ...newBlog, paragraphs: paras });
                                }} />
                            ))}
                            <button style={buttonStyle} onClick={() => setNewBlog({ ...newBlog, paragraphs: [...newBlog.paragraphs, ""] })}>Add Paragraph</button>

                            <input type="file" multiple onChange={e => setNewBlog({ ...newBlog, images: [...newBlog.images, ...Array.from(e.target.files)] })} />
                            <label>
                                Published:
                                <input type="checkbox" checked={newBlog.published} onChange={e => setNewBlog({ ...newBlog, published: e.target.checked })} />
                            </label>

                            <button style={buttonStyle} onClick={addBlog}>Add Blog</button>
                        </div>
                    )}

                    {blogs.map(blog => (
                        <div key={blog.id} style={{ border: "5px solid black", padding: "10px", marginBottom: "10px", background: "#ccc" }}>
                            <h3>{blog.title} ({blog.published ? "Published" : "Unpublished"})</h3>
                            <p>Category: {blog.category}</p>
                            {blog.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
                            {blog.images.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} alt="blog" style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "5px" }} />)}

                            {editingBlogId === blog.id ? (
                                <>
                                    <button style={buttonStyle} onClick={saveEditBlog}>Save</button>
                                    <button style={buttonStyle} onClick={cancelEditBlog}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button style={buttonStyle} onClick={() => startEditBlog(blog)}>Edit</button>
                                    <button style={buttonStyle} onClick={() => deleteBlog(blog.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        return <p>Select a tab to manage content.</p>;
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
                background: "#ff4d7e",
                color: "#000"
            }}>
                <h1>The Pink Psyche Admin</h1>
                <button style={buttonStyle}>Logout</button>
            </header>

            <div style={{ display: "flex" }}>
                {/* Sidebar Tabs */}
                <nav style={{
                    width: "200px",
                    background: "#f5f5f5",
                    minHeight: "calc(100vh - 70px)",
                    paddingTop: "20px",
                    boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
                }}>
                    {["users", "categories", "blogs", "interactions", "analytics"].map(tab => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "15px 20px",
                                cursor: "pointer",
                                background: activeTab === tab ? "#ffccd6" : "transparent",
                                fontWeight: activeTab === tab ? "bold" : "normal"
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </div>
                    ))}
                </nav>

                {/* Content Area */}
                <main style={{ flex: 1, padding: "40px" }}>
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
}

// Button common style
const buttonStyle = {
    padding: "8px 12px",
    border: "2px solid black",
    borderRadius: "6px",
    background: "#eee",
    cursor: "pointer",
    margin: "0 5px",
};

