import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    companyName : {
        type: String,
        required: [true, 'Please provide company name']
    },
    email : {
        type: String,
        unique: true,
        required: [true, "please provide your email"],
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phoneNumber : {
        type: String,
        required: [true, "please provide your phone number"],
    },
    password: {
        type: String,
        required: [true, "please provide your password"],
        minLength: 8
    },
    role: {
        type: String,
    },
    logoUrl: {
        type: String,
    }
},
{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User;