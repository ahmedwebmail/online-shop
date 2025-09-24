import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
   {
       user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
       payable: {type: String, require: true},
       cust_details: {type: String, require: true},
       ship_details: {type: String, require: true},
       tran_id: {type: String, require: true},
       val_id: {type: String, require: true},
       payment_status: {type: String, require: true},
       delivery_status: {type: String, require: true},
       total: {type: String, require: true},
       vat: {type: String, require: true},
   },
    {
        timestamps: true,
        versionKey: false,
   }
)

export const InvoiceModel =  mongoose.model("invoices", InvoiceSchema);