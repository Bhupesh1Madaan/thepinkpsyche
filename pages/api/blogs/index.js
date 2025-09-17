import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

export const config = {
    api: { bodyParser: { sizeLimit: "20mb" } }, // larger limit for images
};

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const blogData = { ...req.body };

            // contentBlocks me agar image Base64 hai to Cloudinary me upload karo
            if (Array.isArray(blogData.contentBlocks)) {
                for (let i = 0; i < blogData.contentBlocks.length; i++) {
                    const block = blogData.contentBlocks[i];
                    if (block.image && block.image.startsWith("data:")) {
                        const uploaded = await cloudinary.uploader.upload(block.image, {
                            folder: "blogs",
                        });
                        block.image = uploaded.secure_url; // replace Base64 with Cloudinary URL
                    }
                }
            }

            const blog = await Blog.create(blogData);
            res.status(201).json(blog);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    if (req.method === "GET") {
        try {
            const blogs = await Blog.find({}).sort({ createdAt: -1 });
            res.status(200).json(blogs);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
