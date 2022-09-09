import { Router } from "express";
import * as cardController from "../controllers/cardsController";

export const cardRouter = Router();

cardRouter.get("");
cardRouter.get("/:id");
cardRouter.post("/create");
cardRouter.delete("delete");
cardRouter.delete("delete/:id");

