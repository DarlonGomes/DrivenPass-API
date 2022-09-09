import { Router } from "express";
import * as credentialController from "../controllers/credentialController";
import { authenticateToken } from "../middlewares/tokenMiddleware";
export const credentialRouter = Router();

credentialRouter.get("", authenticateToken, credentialController.allTitles);
credentialRouter.get("/:id", authenticateToken, credentialController.infoById);
credentialRouter.post("/create", authenticateToken, credentialController.insertNoteDetails);
credentialRouter.delete("delete/:id", authenticateToken, credentialController.deleteById);
