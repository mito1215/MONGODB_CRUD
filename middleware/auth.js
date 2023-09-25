import { request, response } from "express";
import jwt  from "jsonwebtoken";
import { getProfile } from "../controllers/profile.controller.js";

export const authJWT = (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers.authorization || '';

    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if(!token) {
        return response.status(401).json({ok: false, error:"Empty token"});
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        request.userId = uid;
        next();
    } catch (error) {
        next(error);
    }

}