import React from "react";

const categories = [
    {
        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
        title: "Personal Growth",
        text: "Develop yourself mentally, emotionally, and spiritually with our comprehensive guides.",
    },
    {
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
        title: "Career Success",
        text: "Advance your professional life with proven strategies and insights.",
    },
    {
        img: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=200&fit=crop",
        title: "Relationships",
        text: "Build stronger, more meaningful connections with the people around you.",
    },
];

const Categories = () => {
    return (
        <section className="categories" id="categoriesSection">
            <h2 className="categories-title">Explore Our Categories</h2>
            <div className="categories-grid">
                {categories.map((cat, index) => (
                    <div className="category-card" key={index}>
                        <img src={cat.img} alt={cat.title} />
                        <div className="category-card-content">
                            <h4>{cat.title}</h4>
                            <p>{cat.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
