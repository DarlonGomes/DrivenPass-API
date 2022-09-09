import { Router } from "express";
import * as noteController from "../controllers/noteController";

export const noteRouter = Router();

noteRouter.get("");
noteRouter.get("/:id");
noteRouter.post("/create");
noteRouter.delete("delete");
noteRouter.delete("delete/:id");