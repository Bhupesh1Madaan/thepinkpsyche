import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.success) {
            router.push("/admin/dashboard");
        } else {
            setError(data.message || "Login failed");
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#f5f5f5",
            fontFamily: "Arial, sans-serif"
        }}>
            <form onSubmit={handleSubmit} style={{
                width: "350px",
                padding: "40px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#ff4d7e" }}>Admin Login</h2>

                <label style={{ fontWeight: "bold" }}>Username</label>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "6px", border: "1px solid #ccc" }}
                />

                <label style={{ fontWeight: "bold" }}>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "6px", border: "1px solid #ccc" }}
                />

                <button type="submit" style={{
                    width: "100%",
                    padding: "12px",
                    background: "#ff4d7e",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}>Login</button>

                {error && <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>{error}</p>}
            </form>
        </div>
    );
}
