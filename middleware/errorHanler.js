//Errores de usuario
export function  errorHandler (error, request, response, next) {
    //usamos console.log() para mostrar como se llama el error
    console.log("EL ERROR ES ",error.name)
    //con el if() manejamos el error y le asignamos el estatus 400
    if (error.name === "CastError") {
        console.log("EL ERROR ES ",error.name)
        return response.status(404).json({ error: "that is not an id" });
    }
    if ( error.name == "ReferenceError") {
        console.log("EL ERROR ES ",error.name)
        return response.status(404).json({ error: "Reference error" });
    }
    if (error === "TokenExpiredError") {
        return response.status(404).json({ error: "Token expired" });
    }
    //response.status(500).end();
    next();
}