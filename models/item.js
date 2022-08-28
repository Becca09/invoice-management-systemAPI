import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
        itemName:{
            type: String,
            required: [true, "please enter item name"]
        },

        quantity: {
            type: Number,
            required: [true, "please enter a number"]
        },

        amount: {
            type: Number,
            required: [true, "please enter an amount"]
        }

})

export default itemSchema;