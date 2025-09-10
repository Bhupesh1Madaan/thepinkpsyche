import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";

export default function ContactUs() {
    const faqs = [
        {
            question: "How can I join the community?",
            answer: "You can join by signing up on our website and subscribing to our newsletter.",
        },
        {
            question: "Can I submit my story?",
            answer: "Yes! We encourage you to share your personal journey with us via the contact form.",
        },
        {
            question: "Is the content free?",
            answer: "Absolutely, all our blogs and resources are free to access.",
        },
        {
            question: "Do you offer workshops?",
            answer: "Yes, we organize workshops and events occasionally. Stay updated through our newsletter.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="font-sans">
            <Navbar />

            {/* Contact Form */}
            <section className="pt-24 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
                    Contact Us
                </h1>

                <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Message</label>
                        <textarea
                            placeholder="Your Message"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={5}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-600"
                    >
                        Send Message
                    </button>
                </form>
            </section>

            {/* FAQs Accordion */}
            <section className="pt-16 px-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg overflow-hidden"
                        >
                            <button
                                className="w-full flex justify-between items-center p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-medium">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
                                    ▼
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="p-4 bg-white text-gray-700">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
