import mongoose from "mongoose";
import Blog from "../models/Blog.js"; // apne path ke hisaab se
import connectDB from "../lib/mongodb";

async function migrate() {
    await connectDB();

    // Find all blogs that have `content` field
    const blogs = await Blog.find({ content: { $exists: true } });

    for (let blog of blogs) {
        // Agar contentBlocks nahi hai ya empty hai
        if (!blog.contentBlocks || !Array.isArray(blog.contentBlocks) || blog.contentBlocks.length === 0) {
            blog.contentBlocks = [
                {
                    type: "paragraph",
                    text: blog.content || "",
                    image: null,
                    imagePosition: "top",
                    imageWidth: 300,
                    imageHeight: 200,
                }
            ];
        }

        // Remove old content field
        blog.content = undefined;

        await blog.save();
        console.log(`Migrated blog: ${blog._id}`);
    }

    console.log("✅ Migration complete!");
    process.exit(0);
}

migrate().catch(err => {
    console.error(err);
    process.exit(1);
});
