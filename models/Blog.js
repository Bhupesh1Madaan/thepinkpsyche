import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema({
    type: { type: String, default: "paragraph" },
    text: { type: String, default: "" },
    image: { type: String, default: null },
    imagePosition: { type: String, enum: ["top", "bottom", "left", "right"], default: "top" },
    imageWidth: { type: Number, default: 300 },
    imageHeight: { type: Number, default: 200 },
});

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        featuredImage: { type: String, default: null },
        content: { type: String, default: "" }, // ✅ simple content instead of contentBlocks
        contentBlocks: { type: [ContentBlockSchema], default: [] }, // optional
        published: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
