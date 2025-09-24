import mongoose from "mongoose";

const ProductDetailsSchema = new mongoose.Schema(
   {
        description: {type: String, required: true},
        color: {type: String, required: true},
        size: {type: String, required: true},
        img1: {type: String, required: true},
        img2: {type: String, required: true},
        img3: {type: String, required: true},
        img4: {type: String, required: true},
        img5: {type: String, default: null},
        img6: {type: String, default: null},
        img7: {type: String, default: null},
        img8: {type: String, default: null},
        product_id: {type: mongoose.Schema.Types.ObjectId, unique: true, required: true, ref: 'products'}
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ProductDetailsModel = mongoose.model("product_details", ProductDetailsSchema);