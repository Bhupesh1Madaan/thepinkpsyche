"use client";

import { useState } from "react";
import styles from "@/styles/dashboard.module.css";

export default function AnalyticsTab() {
    // Dummy data
    const [blogs] = useState([
        { id: 1, title: "Blog 1", category: "Travel", views: 120, shares: 5, published: true },
        { id: 2, title: "Blog 2", category: "Books", views: 80, shares: 2, published: false },
        { id: 3, title: "Blog 3", category: "Travel", views: 200, shares: 15, published: true },
        { id: 4, title: "Blog 4", category: "Food", views: 50, shares: 1, published: true },
    ]);

    const [userActions] = useState([
        { id: 1, type: "Contact Form", message: "Hi, I need info about your course", email: "abc@mail.com" },
        { id: 2, type: "Newsletter Signup", message: "Subscribed successfully", email: "xyz@mail.com" },
        { id: 3, type: "Quote Request", message: "Please provide a quote for bulk order", email: "" },
    ]);

    // Calculations
    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter(b => b.published).length;
    const unpublishedBlogs = totalBlogs - publishedBlogs;

    const blogsPerCategory = blogs.reduce((acc, blog) => {
        acc[blog.category] = (acc[blog.category] || 0) + 1;
        return acc;
    }, {});

    const topViewedBlogs = [...blogs].sort((a, b) => b.views - a.views).slice(0, 3);

    const totalShares = blogs.reduce((acc, blog) => acc + blog.shares, 0);

    return (
        <div className={styles.tabContent}>
            <h2>Analytics Overview</h2>

            {/* Total Blogs */}
            <div className={styles.analyticsCard}>
                <h3>Total Blogs</h3>
                <p>Total: {totalBlogs}</p>
                <p>Published: {publishedBlogs}</p>
                <p>Unpublished: {unpublishedBlogs}</p>
            </div>

            {/* Blogs per Category */}
            <div className={styles.analyticsCard}>
                <h3>Blogs per Category</h3>
                <ul>
                    {Object.entries(blogsPerCategory).map(([category, count]) => (
                        <li key={category}>{category}: {count}</li>
                    ))}
                </ul>
            </div>

            {/* Top Viewed Blogs */}
            <div className={styles.analyticsCard}>
                <h3>Top Viewed Blogs</h3>
                <ol>
                    {topViewedBlogs.map(blog => (
                        <li key={blog.id}>{blog.title} ({blog.views} views)</li>
                    ))}
                </ol>
            </div>

            {/* Share Blog Count */}
            <div className={styles.analyticsCard}>
                <h3>Total Blog Shares</h3>
                <p>{totalShares} shares</p>
            </div>

            {/* User Actions */}
            <div className={styles.analyticsCard}>
                <h3>User Actions</h3>
                <ul>
                    {userActions.map(action => (
                        <li key={action.id}>
                            <b>{action.type}:</b> {action.message} {action.email && `(Email: ${action.email})`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
