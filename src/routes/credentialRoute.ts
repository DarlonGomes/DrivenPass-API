import { Router } from "express";
import * as credentialController from "../controllers/credentialController";
import { authenticateToken } from "../middlewares/tokenMiddleware";
import { joiValidation } from "../middlewares/joiMIddleware";
export const credentialRouter = Router();

credentialRouter.get("", authenticateToken, credentialController.allTitles);
credentialRouter.get("/:id", authenticateToken, credentialController.infoById);
credentialRouter.post("/create", authenticateToken, joiValidation.createCredential, credentialController.newCredential);
credentialRouter.delete("/:id", authenticateToken, credentialController.deleteById);
