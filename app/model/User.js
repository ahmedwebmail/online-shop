import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
   {
       email: {type: String, required: true, unique: true},
       password: {type: String, default: null},
       otp: {type: String, default: 0},
   },
    {
        timestamps: true,
        versionKey: false,
   }
)

const UserModel = mongoose.model("users", UserSchema);