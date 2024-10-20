import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { addComment, addReplyComment, deleteComment, getCommentsPost, getRepliesComment, updateComment } from "../controllers/commentsControllers"
import { validationComment } from "../utils/validators/validationComment"
import { errorValidation } from "../utils/validators/errorValidation"

export const commentRouter = express.Router()

// /:id => post id
commentRouter.route("/post/:id")
.get(verifyToken,getCommentsPost)
.post(verifyToken,validationComment,errorValidation,addComment)

// /:id => comment id
commentRouter.route("/:id")
.put(verifyToken,validationComment,errorValidation,updateComment)
.delete(verifyToken,deleteComment)

// /:id => comment id
commentRouter.route("/reply/:id")
.post(verifyToken,validationComment,errorValidation,addReplyComment)
.get(verifyToken,getRepliesComment)