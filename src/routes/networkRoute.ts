import { Router } from "express";
import * as networkController from "../controllers/networkController";
import { joiValidation } from "../middlewares/joiMIddleware";
import { authenticateToken } from "../middlewares/tokenMiddleware";
export const networkRouter = Router();

networkRouter.get("", authenticateToken, networkController.allTitles);
networkRouter.get("/:id", authenticateToken, networkController.InfoById);
networkRouter.post("/create", authenticateToken, joiValidation.createNetwork, networkController.newNetwork);
networkRouter.delete("delete/:id", authenticateToken, networkController.deleteById);