import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users', registerUser);
publicRouter.post('/api/users/login', loginUser);

export {
    publicRouter
}