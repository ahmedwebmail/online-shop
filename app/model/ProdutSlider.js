import mongoose from "mongoose";

const ProductSliderSchema = new mongoose.Schema(
   {
       title: {type: String, required: true},
       description: {type: String, required: true},
       price: {type: String, required: true},
       img: {type: String, required: true},
       product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products'}
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ProductSliderModel = mongoose.model("product_sliders", ProductSliderSchema);