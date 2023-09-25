import { request } from "express";
import multer from "multer";

//export const upload = multer({dest: './uploads'});

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

//cargar solo imagenes
const pictures = (request, file, cb) => {
    const separarPuntos = file.originalname.split(".");
    const ext = separarPuntos[separarPuntos.lenght-1];

    if(ext == "jpg" || ext == "png" | ext == "gif" ) {
        return cb(null, true)
    } else {
        return cb(new Error ('Solo se aceptan imagenes'))
    }
}

export const upload = multer ({
    storage: storage,
    fileFilter: pictures
})