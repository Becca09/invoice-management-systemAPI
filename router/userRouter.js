import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController.js';

const userRouter = express();


userRouter.route("/create").post(createUser);
userRouter.route("/all").get(getAllUsers)

export default userRouter;