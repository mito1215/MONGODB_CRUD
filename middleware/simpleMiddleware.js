//ejemplo de midleware

import { request, response } from "express";
import Joi from "joi";

export const simpleMiddleware = (request, response, next) => {
    console.log("Ingresando al middleware ✔");
    /* Ejemplo de Auth muy basico
    if(request.headers.token == "Perrito1234")
        next()
    else
        response.status(500).send("error")
    */

    //Definir variables de usuario
    const { name, email, password } = request.body;

    //Definir reglas
    const schema = Joi.object({
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/)),
    });
    //Validar reglas
    const valueRules = schema.validate({
        name: name,
        email: email,
        password: password
    });

    if (valueRules.error) {
        response.status(500).json(valueRules.error)
    } else {
        next();
    }

    
}