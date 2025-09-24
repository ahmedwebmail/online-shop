import mongoose from "mongoose";

const InvoiceProductSchema = new mongoose.Schema(
   {
       user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
       product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products'},
       invoice_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'invoices'},
       qty: {type: String, require: true},
       price: {type: String, require: true},
       color: {type: String, require: true},
       size: {type: String, require: true},
   },
    {
        timestamps: true,
        versionKey: false,
   }
)

export const InvoiceProductModel =  mongoose.model("invoices", InvoiceProductSchema);