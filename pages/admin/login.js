"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/Login.module.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Admin Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
