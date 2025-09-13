"use client";

export default function AdminSidebar({ activeTab, setActiveTab, styles }) {
    const tabs = ["blogs", "categories", "analytics", "users"];

    const handleLogout = () => {
        // Clear user session/login info
        localStorage.removeItem("userToken"); // adjust according to your auth
        sessionStorage.removeItem("userToken");
        window.location.href = "/admin/login"; // redirect to login page
    };

    return (
        <div className={styles.sidebar}>
            <h2>Admin Dashboard</h2>
            <ul>
                {tabs.map((tab) => (
                    <li
                        key={tab}
                        className={activeTab === tab ? styles.activeTab : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                style={{
                    marginTop: "auto",
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>
        </div>
    );
}
