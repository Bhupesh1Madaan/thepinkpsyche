import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const newCat = await Category.create(req.body);
            res.status(201).json(newCat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    if (req.method === "GET") {
        try {
            const cats = await Category.find({});
            res.status(200).json(cats);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
