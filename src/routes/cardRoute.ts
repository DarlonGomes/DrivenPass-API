import { Router } from "express";
import * as cardController from "../controllers/cardsController";
import { joiValidation } from "../middlewares/joiMIddleware";
import { authenticateToken } from "../middlewares/tokenMiddleware";
export const cardRouter = Router();

cardRouter.get("", authenticateToken, cardController.allTitles);
cardRouter.get("/:id", authenticateToken, cardController.InfoById);
cardRouter.post("/create", authenticateToken, joiValidation.createCard, cardController.newCard);
cardRouter.delete("/:id", authenticateToken, cardController.deleteById);

