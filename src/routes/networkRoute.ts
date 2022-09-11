import { Router } from "express";
import * as networkController from "../controllers/networkController";
import { joiValidation } from "../middlewares/joiMIddleware";
import { authenticateToken } from "../middlewares/tokenMiddleware";
export const networkRouter = Router();

networkRouter.get("", authenticateToken);
networkRouter.get("/:id", authenticateToken);
networkRouter.post("/create", authenticateToken, joiValidation.createNetwork);
networkRouter.delete("delete/:id", authenticateToken);