import { Router } from "express";
import { userRouter } from "./usersRoute";
export const router = Router();

router.use("/auth", userRouter);

