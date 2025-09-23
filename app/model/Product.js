import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        slug: {type: String, required: true},
        price: {type: Number, required: true},
        discount: {type: Number, default: 0},
        discount_price: {type: Number, default: 0},
        image: {type: String, default: null},
        stock: {type: Number, required: true},
        star:{type: String, default: null},
        remark: {type: String, default: null},
        logo: {type: String, default: null},
        category_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories'},
        brand_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'brands'},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ProductModel = mongoose.model("products", ProductSchema);