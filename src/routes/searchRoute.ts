import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { search } from "../controllers/searchControllers";

export const searchRouter = Router()

searchRouter.get("/",verifyToken,search)