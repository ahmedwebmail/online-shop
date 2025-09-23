import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true},
        logo: {type: String, default: null},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const BrandModel = mongoose.model("brands", BrandSchema);