import User from "../models/user.js";
import bcyrpt from "bcryptjs";
import jwt from 'jsonwebtoken'
import {promisify} from 'util';

export const createUser = async (req, res, next) => {
  try {
    const {
      companyName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      logoUrl,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "passwords do not match",
      });
    }
    const encryptedPassword = await bcyrpt.hash(password, 12);
    const newUser = await User.create({
      companyName,
      email,
      phoneNumber,
      password: encryptedPassword,
      logoUrl,
    });
    return res.status(200).json({
      status: "success",
      newUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or password missing");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user with " + email + " found");
    }
    const passwordsMatch = await bcyrpt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new Error("Incorrect password");
    }
    const payload = {
      id: user._id
    }
    const token = jwt.sign(payload , process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
        status: 'success',
        token
    })
  } catch (error) {
    return res.status(400).json({
        status: "fail",
        message: error.message,
        error,
      });
  }
};

export const requireAuth = async(req,res,next)=> {
  console.log("require auth running ")
  // console.log(req.headers)
    try {
        let token;
        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")) {
                const header = req.headers.authorization;
                // console.log(header)
                const tokenArray = req.headers.authorization.split(" ")
                // console.log(tokenArray);
                token = tokenArray[1];
                console.log("found token ")
                console.log(token)
            }
        if(!token) {
            throw new Error("Auth token required")
        }
    
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        console.log("decoding token")
        console.log(decodedToken)
        const userId = decodedToken.id;
        // console.log(userId)
        const currentUser = await User.findById(userId);
        if(!currentUser) {
            throw new Error("User on this token no longer exists")
        }
        console.log("found user... setting user field in requets obj")
        req.user = currentUser;
        console.log("moving to next operation")
        next();
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: error.message,
            error,
        });
    }
   
}

export const getAllUsers = async (req, res, next) => {
  console.log("from get all users user is")
  console.log(req.user)
  const allUsers = await User.find();
  return res.status(200).json({
    status: "success",
    allUsers,
  });
};

export const getAUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { companyName, email, phoneNumber } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        companyName,
        email,
        phoneNumber,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updateUser) {
      throw new Error(`User with id ${userId} not found`);
    }
    return res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};
