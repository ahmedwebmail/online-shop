import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
   {
       f_name: {type: String, default: null},
       l_name: {type: String, default: null},
       cust_city: {type: String, default: null},
       cust_postcode: {type: String, default: null},
       cust_phn: {type: String, default: null, unique: true},
       cust_fax: {type: String, default: null, unique: true},
       ship_name: {type: String, default: null},
       ship_add: {type: String, default: null},
       ship_city: {type: String, default: null},
       ship_sate: {type: String, default: null},
       ship_postcode: {type: String, default: null},
       ship_country: {type: String, default: null},
       ship_phn: {type: String, default: null},
       photo: {type: String, default: null},
       user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
   },
    {
        timestamps: true,
        versionKey: false,
   }
)

const UserProfileModel = mongoose.model("user_profiles", UserProfileSchema);