const express = require("express");
const { registerUser, loginUser,getAllUsers,deleteUserById,searchUser} = require("../controllers/user");
const { registerValidation, loginValidation } = require("../middlewares/userValidation");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/searchUser", searchUser);
userRouter.post('/register', registerValidation, registerUser);
userRouter.post('/login', loginValidation, loginUser);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;
