import connectDB from "@/lib/mongodb"; 
import Category from "@/models/Category";

export default async function handler(req, res) {
    await connectDB();
    const { id } = req.query;

    if (req.method === "PUT") {
        const { name, image, description } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name, image, description }, { new: true });
        return res.status(200).json(category);
    }

    if (req.method === "DELETE") {
        await Category.findByIdAndDelete(id);
        return res.status(200).json({ message: "Category deleted successfully" });
    }

    res.status(405).json({ message: "Method not allowed" });
}
