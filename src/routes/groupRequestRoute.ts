import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { acceptGroupRequest, cancelGroupRequest, getGroupRequest, joinToGroup } from '../controllers/groupRequestControllers';

export const groupRequestRouter = express.Router();

groupRequestRouter.get("/join/:id",verifyToken,joinToGroup)

groupRequestRouter.get("/getAllRequest/:id",verifyToken,getGroupRequest)

groupRequestRouter.get("/accept/:id",verifyToken,acceptGroupRequest)

groupRequestRouter.delete("/cancel/:id",verifyToken,cancelGroupRequest)