import { request, response } from "express";
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken";

//Obtener datos
export const getUser = async (request, response) => {
    const users = await User.find({});
    //Mostrar el status 200 y los usuarios
    response.status(200).json(users);
}

//Obtener datos por id
export const getUserId = async (request, response, next) => {
    //Utilizamos un trycatch para manejar el error cuando no se ingresa bien un id
    try {
        const id = request.params.id;
        const userFound = await User.findById(id);

        if (!userFound) {
            return response.status(404).end();
        }
        response.status(200).json(userFound);
    } catch (error) {
        next(error);
    }
}

//Crear usuario
export const postUser = async (request, response, next) => {
    try {
        //Definir variables de usuario
        const {name, email, password} = request.body;
    
        const userProps = {
            name,
            email,
            password
        };
            
        //Primera forma de crear documentos
        // const newUser = new User(userProps);
        // await newUser.save();
        //Segunda forma de crear documentos
        await User.create(userProps);
        //Responder con el estatus 201 y los datos del usuario
        //response.status(201).json(newUser);
        //Responder solo con el estatus 201
        response.status(201).end();
    }   catch (error) {
        // console.log(error.name);
        // console.log(error.message);
        // response.status(400).end();
        next(error);
    }
}

//Actualizar campos de usuario
export const updateUser = async(request, response, next) => {
    try {
        const id = request.params.id;
        const userNewProps = request.body;
        const updatedUser = await User.findByIdAndUpdate(id, userNewProps, {new: true}).exec();
        //response.status(200).json(updatedUser);
        response.status(200).end();
    } catch (error) {
        // console.log(error.name);
        // console.log(error.message);
        // response.status(400).end();
        next(error);
    }
}

//Eliminar usuario
export const deleteUser = async(request, response, next) =>{
    try {
        const id = request.params.id;
        const deleteUser = await User.findByIdAndRemove(id).exec();

        if(!deleteUser) {
            return response.status(404).end();
        }
        //Definir un 204 ignorara y no enviara ninguna respuesta la cliente si se pone .json o send.
        response.status(204).end();
    } catch (error) {
        // console.log(error.name);
        // console.log(error.message);
        // response.status(400).end();
        next(error);
    }
}

//Login usuario
export const login = async (request, response, next) => {
    const {email, password} = request.body;
    const data = {
        email,
        password
    };
    
    jwt.sign(data, process.env.JWT_SECRET,(err, token) => {
        if(err) {
            next(error)
        } else {
            response.json({"Mensaje":"Token creado", "Token": token})
        }
    })
}

//Subir avatar
export const uploadAvatar = async (request, response, next) => {
    console.log(request.body)
    const id = request.params.id;

    const img = `http://localhost:3000/${request.file.path}`;

    const userNewProps = {
        avatar: img
    };

    const updatedUser = await User.findByIdAndUpdate(id, userNewProps, {
        new: true,
    }).exec();

    // response.json({
    //     "success": request.file,
    //     "body": request.body
    // })
    response.json(updateUser);
}