import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const CategoryModel = mongoose.model("categories", CategorySchema);
export default CategoryModel;