import mongoose from "mongoose";

//Crear SCHEMA o esquema de la tabla Comentarios
const commentSchema = new mongoose.Schema({
    title: String,
    content: String,
    auth: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
    //{type: mongoose.Schema.Types.ObjectId, ref:'User'} se usa como llave para relacionar con otra tabla
});

export const Comment = mongoose.model(
    "Comment", 
    commentSchema
);