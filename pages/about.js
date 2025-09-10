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

            <section className="pt-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-green-700 mb-10 text-center">
                    About The Pink Psyche
                </h1>

                {storyBlocks.map((block, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center my-12 ${block.side === "right" ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        <div
                            className="md:w-1/2"
                            data-aos={block.side === "right" ? "fade-left" : "fade-right"}
                        >
                            <Image
                                src={block.img}
                                alt="Story Image"
                                width={400}
                                height={300}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div
                            className="md:w-1/2 mt-6 md:mt-0 md:px-8 text-gray-700"
                            data-aos="fade-up"
                        >
                            <p className="text-lg">{block.text}</p>
                        </div>
                    </div>
                ))}

                <div className="text-center mt-12">
                    <p className="text-xl font-semibold mb-4">
                        Inspired? Explore our journey further.
                    </p>
                    <a
                        href="/blogs"
                        className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 font-medium"
                    >
                        Read Our Blogs
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
