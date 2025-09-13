"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ animate = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(!animate); // agar animate nahi hai toh hamesha dikhado

    useEffect(() => {
        if (!animate) return; // agar animation nahi chahiye toh kuch mat karo

        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [animate]);

    return (
        <nav className={`navbar ${showNav ? "show" : "hide"}`}>
            <div className="navbar-inner">
                <div className="navbar-logo">The Pink Psyche</div>

                <div className="navbar-links">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blogs">Blogs</Link>
                    <Link href="/contactus">Contact</Link>
                </div>

                <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/contactus">Contact</Link>
            </div>
        </nav>
    );
}
