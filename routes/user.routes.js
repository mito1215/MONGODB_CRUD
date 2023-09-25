import { Router } from "express";
import { User } from "../models/user.model.js"
import { simpleMiddleware } from "../middleware/simpleMiddleware.js";
import { upload } from "../middleware/upload.js";
import { getUser, getUserId, postUser, updateUser, deleteUser, login, uploadAvatar } from "../controllers/user.controller.js";
export const userRouter = Router();

//ROUTES
//CRUD
//GET all users
//htpp://localhost:3000/api/v1/users
userRouter.get("/", getUser);

//GET User by id
//htpp://localhost:3000/api/v1/users/:id
userRouter.get("/:id", getUserId );

//POST htpp://localhost:3000/api/v1/users
userRouter.post("/", simpleMiddleware, postUser);

//Loguearse
//POST htpp://localhost:3000/api/v1/users/login
userRouter.post("/login", login);

//Subir avatar
//POST htpp://localhost:3000/api/v1/users/avatar/id
userRouter.post("/avatar/:id", upload.single('avatar') , uploadAvatar);

//UPDATE User
//Put or Patch htpp://localhost:3000/api/v1/users/:id
//Put reemplaza todo el recurso y Patch actualiza el recurso
userRouter.patch("/:id", simpleMiddleware, updateUser);

//DELETE User by id
//Delete htpp://localhost:3000/api/v1/users/:id
userRouter.delete("/:id", deleteUser);