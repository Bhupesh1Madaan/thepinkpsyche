import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const storyBlocks = [
        {
            img: "https://via.placeholder.com/400x300?text=Founder",
            text: "Meet our founder, a visionary woman passionate about empowering others. Her journey began with self-discovery and reflection.",
            side: "left",
        },
        {
            img: "https://via.placeholder.com/400x300?text=Mission",
            text: "Our mission is to inspire calmness, growth, and introspection. We believe every woman has the potential to bloom like a butterfly.",
            side: "right",
        },
        {
            img: "https://via.placeholder.com/400x300?text=Work",
            text: "Through workshops, articles, and community support, we guide women to embrace self-awareness and mindfulness in daily life.",
            side: "left",
        },
        {
            img: "https://via.placeholder.com/400x300?text=Impact",
            text: "Our impact is growing, connecting women globally, and creating a safe space to share stories and encouragement.",
            side: "right",
        },
    ];

    return (
        <div className="font-sans">
            <Navbar />

            <section className="about-section">
                <h1>About The Pink Psyche</h1>

                {storyBlocks.map((block, index) => (
                    <div
                        key={index}
                        className={`story-block ${block.side === "right" ? "right" : ""}`}
                        data-aos={block.side === "right" ? "fade-left" : "fade-right"}
                    >
                        <div className="story-image">
                            <Image
                                src={block.img}
                                alt="Story Image"
                                width={400}
                                height={300}
                            />
                        </div>
                        <div className="story-text" data-aos="fade-up">
                            <p>{block.text}</p>
                        </div>
                    </div>
                ))}

                <div className="about-cta">
                    <p>Inspired? Explore our journey further.</p>
                    <a href="/blogs">Read Our Blogs</a>
                </div>
            </section>

            <Footer />
        </div>
    );
}