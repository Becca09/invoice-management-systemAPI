import mongoose from "mongoose";
import validator from "validator";
import itemSchema from "./item.js";

const invoiceSchema = new mongoose.Schema({
  customersName: {
    type: String,
    required: [true, "please fill in customer's name"],
  },

  customersEmail: {
    type: String,
    required: [true, "please customer's  email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  phoneNumber: {
    type: String,
    required: [true, "please provide customer's phone number"],
  },

  customersAdress: {
    type: String,
  },

  invoiceDate:{
    type: String,
    required:[true, "please enter a valide date"]
  },

  invoicePaymentDate:{
    type: String,
    // required:[true, "please enter a valide date"]
  },

  invoiceDescription:{
    type: String
  },
  
  invoiceItemList:{
        type: [itemSchema],
        required:[true]
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  status: {
   type: Boolean, 
   default: false
  }
})

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice

