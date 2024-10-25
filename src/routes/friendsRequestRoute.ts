import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { acceptFriendRequest, addFriendRequest, deleteFriendRequest, getFriendsRequest } from '../controllers/friendsRequestControllers';

export const friendsRequest = express.Router()

friendsRequest.get("/",verifyToken,getFriendsRequest)

friendsRequest.post("/:id",verifyToken,addFriendRequest)

friendsRequest.post("/accept/:id",verifyToken,acceptFriendRequest)
friendsRequest.delete("/delete/:id",verifyToken,deleteFriendRequest)