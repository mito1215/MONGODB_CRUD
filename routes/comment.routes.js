import { Router } from "express";
import { Comment } from "../models/comment.model.js";
import { simpleMiddleware } from "../middleware/simpleMiddleware.js";
import { authJWT } from "../middleware/auth.js";
import { createComment, getComment, getCommnetId, deleteComment, updateComment } from "../controllers/comment.controller.js";
export const commentRouter = Router();

//Ejemplo de middleware uso general
commentRouter.use(authJWT);

//GET htpp://localhost:3000/api/v1/comments
commentRouter.get("/", getComment);
//GET htpp://localhost:3000/api/v1/comments/:id
commentRouter.get("/:id", getCommnetId);
//POST htpp://localhost:3000/api/v1/comments
commentRouter.post("/", createComment);
//UPDATE htpp://localhost:3000/api/v1/comments/:id
commentRouter.patch("/:id", updateComment);
//DELETE htpp://localhost:3000/api/v1/comments/:id
commentRouter.delete("/:id", deleteComment);

