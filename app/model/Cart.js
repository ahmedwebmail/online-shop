import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
   {
       user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
       product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products'},
       color: {type: String, require: true},
       quantity: {type: String, require: true},
       size: {type: String, require: true},
   },
    {
        timestamps: true,
        versionKey: false,
   }
)

export const CartModel =  mongoose.model("carts", CartSchema);