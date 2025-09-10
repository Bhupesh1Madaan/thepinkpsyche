import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-pink-100 text-pink-900 p-4 flex gap-6 justify-center shadow-md">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/contactus">Contact</Link>
        </nav>
    );
}
