import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
   {
       user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
       product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products'},
       description: {type: String, require: true},
       ratings: {type: String, require: true},
   },
    {
        timestamps: true,
        versionKey: false,
   }
)

export const ReviewModel =  mongoose.model("reviews", ReviewSchema);