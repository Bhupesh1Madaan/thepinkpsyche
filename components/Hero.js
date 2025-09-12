import React, { useEffect } from "react";

const Hero = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const heroText = document.getElementById("heroText");
            const stickyHeader = document.getElementById("stickyHeader");
            const contentSection = document.getElementById("contentSection");

            if (heroText) {
                heroText.style.transform = `translateY(-${scrolled * 0.5}px)`;
            }

            if (contentSection && stickyHeader) {
                const contentTop = contentSection.offsetTop;
                if (scrolled >= contentTop - 100) {
                    stickyHeader.classList.add("visible");
                } else {
                    stickyHeader.classList.remove("visible");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Sticky Header */}
            <header className="sticky-header" id="stickyHeader">
                <h1>Transform Your Life Today</h1>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg"></div>
                <h1 className="hero-text" id="heroText">
                    Transform Your Life Today
                </h1>
            </section>
        </>
    );
};

export default Hero;
