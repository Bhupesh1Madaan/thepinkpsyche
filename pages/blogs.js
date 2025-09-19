import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function BlogsPage() {
    const router = useRouter();
    const { category } = router.query;

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        let url = '/api/blogs';
        if (category) {
            url += `?categoryName=${category}`;
        }
        axios.get(`/api/blogs?categoryName=${category}`)
            .then(res => setBlogs(res.data))
            .catch(err => console.log(err));
    }, [category]);

    return (
        <>
            <Navbar animate={false} />
            <div className={styles.blogsContainer}>
                <h1 className={styles.pageTitle}>{category ?`Blogs in ${category}`: "Blogs"}</h1>
                <div className={styles.blogsGrid}>
                    {blogs.map(blog => (
                        <div key={blog.slug} className={styles.blogCard}>
                            <img
                                src={blog.featuredImage || "/placeholder.png"}
                                alt={blog.title}
                                className={styles.blogCardImage}
                            />
                            <div className={styles.blogCardContent}>
                                <h2 className={styles.blogCardTitle}>{blog.title}</h2>
                                <p className={styles.blogCardText}>
                                    {blog.contentBlocks?.[0]?.text?.slice(0, 100) || "No description available."}
                                </p>
                                <Link href={`/blog/${blog.slug}`}>
                                    <button className={styles.blogReadMoreBtn}>Read More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}