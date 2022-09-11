import { Router } from "express";
import * as noteController from "../controllers/noteController";
import { authenticateToken } from "../middlewares/tokenMiddleware";
import { joiValidation } from "../middlewares/joiMIddleware";

export const noteRouter = Router();

noteRouter.get("", authenticateToken, noteController.allTitles);
noteRouter.get("/:id", authenticateToken, noteController.InfoById);
noteRouter.post("/create", authenticateToken, joiValidation.createNote, noteController.newNote);
noteRouter.delete("delete/:id", authenticateToken, noteController.deleteById);