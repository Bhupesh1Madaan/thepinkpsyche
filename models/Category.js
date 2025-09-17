import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String },       // base64 ya hosted URL
    description: { type: String }
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
