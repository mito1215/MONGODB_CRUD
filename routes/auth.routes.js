import { Router } from "express"
import {signIn, signUP} from "../controllers/auth.controller.js";

export const authRouter = Router();

//Ruta para registranos
authRouter.post("/signup", signUP);

//Ruta para loguearse
authRouter.post("/signin", signIn);