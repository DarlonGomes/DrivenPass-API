import { Router } from "express";
import { userRouter } from "./usersRoute";
import { credentialRouter } from "./credentialRoute";
import { noteRouter } from "./noteRoute";
import { cardRouter } from "./cardRoute";
import { networkRouter } from "./networkRoute";
import { documentRouter } from "./documentRoute";

export const router = Router();

router.use("/auth", userRouter);
router.use("/credentials", credentialRouter);
router.use("/notes", noteRouter);
router.use("/cards", cardRouter);
router.use("/networks", networkRouter);
router.use("/documents", documentRouter)

