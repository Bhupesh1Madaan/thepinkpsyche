import React, { useEffect, useState } from "react";

const slidesData = [
    {
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
        title: "Embrace Change",
        text: "Every great journey begins with a single step forward.",
    },
    {
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
        title: "Find Your Purpose",
        text: "Discover what truly drives you and make it your reality.",
    },
    {
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
        title: "Achieve Greatness",
        text: "Transform your dreams into tangible achievements.",
    },
];

const BlogSlides = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slidesData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="slideshow-section">
            <div className="slideshow-container">
                {slidesData.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === current ? "active" : ""}`}
                    >
                        <img src={slide.img} alt={slide.title} />
                        <div className="slide-content">
                            <h3>{slide.title}</h3>
                            <p>{slide.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSlides;
