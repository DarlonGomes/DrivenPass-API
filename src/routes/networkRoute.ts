import { Router } from "express";
import * as networkController from "../controllers/networkController";

export const networkRouter = Router();

networkRouter.get("");
networkRouter.get("/:id");
networkRouter.post("/create");
networkRouter.delete("delete");
networkRouter.delete("delete/:id");