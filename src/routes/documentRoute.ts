import { Router } from "express";
import * as documentController from "../controllers/docsController";

export const documentRouter = Router();

documentRouter.get("");
documentRouter.get("/:id");
documentRouter.post("/create");
documentRouter.delete("delete");
documentRouter.delete("delete/:id");
