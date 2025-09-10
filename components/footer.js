import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-green-700 text-white mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Top Section: Links + Newsletter */}
                <div className="md:flex md:justify-between md:items-start">
                    {/* Links */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
                        <ul>
                            <li><Link href="/" className="hover:text-pink-400">Home</Link></li>
                            <li><Link href="/about" className="hover:text-pink-400">About</Link></li>
                            <li><Link href="/blogs" className="hover:text-pink-400">Blogs</Link></li>
                            <li><Link href="/contactus" className="hover:text-pink-400">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Subscribe</h3>
                        <p className="mb-2 text-sm">Get updates and news</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="p-2 rounded-l-md w-full text-gray-900 border border-black-400 "
                            />
                            <button type="submit" className="bg-pink-500 p-2 rounded-r-md font-bold hover:bg-pink-600">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-pink-400 my-6"></div>

                {/* Bottom Section */}
                <div className="md:flex md:justify-between md:items-center text-sm">
                    <p>© 2025 The Pink Psyche. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social Media Icons Placeholder */}
                        <a href="#" className="hover:text-pink-400">FB</a>
                        <a href="#" className="hover:text-pink-400">Insta</a>
                        <a href="#" className="hover:text-pink-400">WhatsApp</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
