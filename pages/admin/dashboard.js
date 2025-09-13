"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import BlogsTab from "@/components/BlogsTab";
import CategoriesTab from "@/components/CategoriesTab";
import AnalyticsTab from "@/components/AnalyticsTab";
import UsersTab from "@/components/UsersTab";
import styles from "@/styles/dashboard.module.css";

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("blogs");

    // ✅ Add state for categories
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Check admin auth
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.replace("/admin/login"); // redirect to login if not logged in
        }
    }, []);

    const renderTab = () => {
        switch (activeTab) {
            case "blogs":
                return <BlogsTab />;
            case "categories":
                // ✅ Pass categories and setCategories
                return <CategoriesTab categories={categories} setCategories={setCategories} />;
            case "analytics":
                return <AnalyticsTab />;
            case "users":
                return <UsersTab />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} styles={styles} />
            <div className={styles.dashboardMain}>{renderTab()}</div>
        </div>
    );
}
