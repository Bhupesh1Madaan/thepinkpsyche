import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function handler(req, res) {
    await connectDB();
    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const updated = await Blog.findByIdAndUpdate(id, req.body, { new: true });
            if (!updated) return res.status(404).json({ error: "Blog not found" });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    if (req.method === "DELETE") {
        try {
            const deleted = await Blog.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ error: "Blog not found" });
            return res.status(200).json({ message: "Blog deleted successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
