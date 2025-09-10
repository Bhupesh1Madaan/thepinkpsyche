import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Left: Logo + Name */}
                <div className="flex items-center space-x-2">
                    {/* <img
                        src="https://via.placeholder.com/40" // yaha apna logo daal
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                    /> */}
                    <span className="font-bold text-2xl text-green-700">The Pink Psyche</span>
                </div>

                {/* Right: Nav Links */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium">Home</Link>
                    <Link href="/about" className="text-gray-700 hover:text-pink-600 font-medium">About</Link>
                    <Link href="/blogs" className="text-gray-700 hover:text-pink-600 font-medium">Blogs</Link>
                    <Link href="/contactus" className="text-gray-700 hover:text-pink-600 font-medium">Contact</Link>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <svg
                            className="w-6 h-6 text-green-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
                    <Link href="/" className="block text-gray-700 hover:text-pink-600 font-medium">Home</Link>
                    <Link href="/about" className="block text-gray-700 hover:text-pink-600 font-medium">About</Link>
                    <Link href="/blogs" className="block text-gray-700 hover:text-pink-600 font-medium">Blogs</Link>
                    <Link href="/contactus" className="block text-gray-700 hover:text-pink-600 font-medium">Contact</Link>
                </div>
            )}
        </nav>
    );
}
