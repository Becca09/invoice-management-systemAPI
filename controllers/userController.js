import User from "../models/user.js";

export const createUser = async(req,res,next)=>{
    const {companyName,email,phoneNumber, password, confirmPassword} = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({
            status: 'fail',
            message: 'passwords do not match'
        })
    }
    
    
    const newUser = await User.create(
        {
        companyName,
        email,
        phoneNumber,
        password
        }
    )
    return res.status(200).json({
        status: 'success',
        newUser
    })
}

export const getAllUsers = async(req,res,next)=>{
    const allUsers  = await User.find();
    return res.status(200).json({
        status: 'success',
        allUsers
    })
}