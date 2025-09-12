export default function handler(req, res) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        if (username === "admin" && password === "admin1234") {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
