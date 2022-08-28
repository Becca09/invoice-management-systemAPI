import express from 'express';
import { createUser, deleteUser, getAllUsers, getAUser, login, requireAuth, updateUser } from '../controllers/userController.js';

const userRouter = express();


userRouter.route("/login").post(login)
userRouter.route("/create").post(createUser);
userRouter.route("/all").get(requireAuth, getAllUsers)
userRouter.route("/:userId")
.get(requireAuth, getAUser)
.delete(requireAuth, deleteUser)
.put(requireAuth, updateUser)

export default userRouter;