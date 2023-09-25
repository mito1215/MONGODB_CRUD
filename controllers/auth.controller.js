import { response } from "express";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/token.util.js";

//Controlador para registrarse
export const signUP = async (req, res, next) => {
    try {
        //Definir variables de usuario
        const {name, email, password} = req.body;
        
        //Validar que el usuario no este registrado
        const foundUser = await User.findOne({ email });
        if(foundUser) {
            return res.status(401).json({error: 'Email already exist'})
        }

        const userProps = {
            name,
            email,
            password
        };
            
        //Primera forma de crear usuarios
        const newUser = new User(userProps);
        console.log(newUser);

        //Segunda forma de crear usuarios
        //const user = await User.create(userProps);

        //Encriptar contraseña
        newUser.password = await newUser.encryptPassword(password);

        //Guardar el usuario
        await newUser.save();

        //Generar JWT
        const token = generateToken(newUser);

        //Responder con el estatus 201 y los datos del usuario
        //response.status(201).json(newUser);
        //Responder solo con el estatus 201
        res.status(201).json({ok: true, token});
    }   catch (error) {
        // console.log(error.name);
        // console.log(error.message);
        // response.status(400).end();
        next(error);
    }
};

//Controlador para loguearse
export const signIn = async (req, res) => {
    const {email, password} = req.body;

    const foundUser = await User.findOne({email});
    console.log(foundUser.id);
    console.log(foundUser);

    //Validar si no existe un usuario registrado con ese email
    if(!foundUser) {
        return res.status(404).json({error: "Email does not exist"})
    }

    const validPassword = await foundUser.validatePassword(password);

    if (!validPassword) {
        return res.status(401).json({
            ok: false,
            error: "Incorrect Password"
        })
    }

    const token = generateToken(foundUser);
    res.status(200).json({ok: true, token});
};