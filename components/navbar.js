"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ animate = false, forceShow = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(!animate);

    // Sync showNav with parent prop
    useEffect(() => {
        if (animate && typeof forceShow === "boolean") {
            setShowNav(forceShow);
        }
    }, [forceShow, animate]);

    // Local scroll logic for index page (animate only)
    useEffect(() => {
        if (!animate) return;

        const handleScroll = () => {
            if (forceShow) return; // parent controlling it
            setShowNav(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, [animate, forceShow]);

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