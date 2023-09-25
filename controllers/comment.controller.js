import { request, response } from "express";
import { Comment } from "../models/comment.model.js";

//Crear comentarios - CREATE
export const createComment = async(request, response, next) => {
    try {
        const {title, content, auth} = request.body;

        const comment = await Comment.create({
            "title": title,
            "content": content,
            "auth": auth
        });
        response.json(comment);
    } catch (error) {
        next(error);
    }
}

//Consultar comentarios - GET
export const getComment = async (request, response, next) => {
    try {
        console.log("Ingresando al controlador de comentarios ✔");
        const comments = await Comment.find({}, "title content auth").populate("auth").exec();
        //.populate("auth") se utiliza para usar como llave para relacionar con otra tabla
        response.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

//Consultar comentarios por ID - GET
export const getCommnetId = async (request, response, next) => {
    //Utilizamos un trycatch para manejar el error cuando no se ingresa bien un id
    try {
        const id = request.params.id;
        const commentFound = await Comment.findById(id).populate("auth").exec();

        if (!commentFound) {
            return response.status(404).end();
        }
        response.status(200).json(commentFound);
    } catch (error) {
        next(error);
    }
}

//Eliminar comentarios - DELETE
export const deleteComment = async(request, response, next) =>{
    try {
        const id = request.params.id;
        const deleteComment = await Comment.findByIdAndRemove(id).exec();

        if(!deleteComment) {
            return response.status(404).end();
        }
        response.status(204).end();
    } catch (error) {
        next(error);
    }
}

//Actualizar campos de comentarios
export const updateComment = async(request, response, next) => {
    try {
        const id = request.params.id;
        const {tittle, content, auth} = request.body;
        
        const newBody = {
            "title": title,
            "content": content,
            "auth": auth
        }

        const comment = await Comment.findByIdAndUpdate(id, newBody, {new:true}).exec();
        response.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}