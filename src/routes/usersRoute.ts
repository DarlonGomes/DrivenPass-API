import { Router } from "express";
import * as userController from "../controllers/usersController";
import { joiValidation } from "../middlewares/joiMIddleware";
export const userRouter = Router();

userRouter.post("/sign-up", joiValidation.signUp, userController.signUp);
userRouter.post("/sign-in", joiValidation.signIn, userController.signIn);
