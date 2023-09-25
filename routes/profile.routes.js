import { Router } from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { authJWT } from "../middleware/auth.js";

export const profileRouter = Router();

profileRouter.get("/me", authJWT, getProfile);