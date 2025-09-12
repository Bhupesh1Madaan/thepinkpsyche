import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                {/* Logo */}
                <div className="navbar-logo">
                    {/* <img src="logo.png" alt="Logo" className="w-10 h-10 rounded-full" /> */}
                    The Pink Psyche
                </div>

                {/* Desktop Links */}
                <div className="navbar-links">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/blogs">Blogs</Link>
                    <Link href="/contactus">Contact</Link>
                </div>

                {/* Mobile Hamburger */}
                <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/contactus">Contact</Link>
            </div>
        </nav>
    );
}
