import mongoose from "mongoose";

const ProductDetailsSchema = new mongoose.Schema(
    {
        description: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        img1: {type: String, default: null},
        img2: {type: String, default: null},
        img3: {type: String, default: null},
        img4: {type: String, default: null},
        img5: {type: String, default: null},
        img6: {type: String, default: null},
        img7: {type: String, default: null},
        img8: {type: String, default: null},
        product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products'}
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ProductDetailsModel = mongoose.model("product_details", ProductDetailsSchema);