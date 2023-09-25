import mongoose from "mongoose";
import bcrypt from 'bcrypt';

//Crear SCHEMA o esquema de la tabla usuario
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {type: String, required: false}
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

//Encriptar password
userSchema.methods.encryptPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

//USER MODEL o Crear la coleccion
export const User = mongoose.model(
    'User', 
    userSchema
);/*El nombre debe ser siempre en singular User*/