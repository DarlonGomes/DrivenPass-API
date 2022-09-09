import { Router } from "express";
import { authenticateToken } from "../middlewares/tokenMiddleware";
import * as userController from "../controllers/usersController";
import { stripRequestBody } from "../middlewares/stripMiddleware";
import { joiValidation } from "../middlewares/joiMIddleware";
const useRoute = Router();

useRoute.post("/sign-up", stripRequestBody, joiValidation.signUp, userController.signUp);
useRoute.post("/sign-in", authenticateToken, stripRequestBody, joiValidation.signIn, userController.signIn);
