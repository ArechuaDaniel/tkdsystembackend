import express  from "express";
import {
    obtenerAlumnos,
    obtenerAlumno,
    nuevoAlumno,
    editarAlumno,
    eliminarAlumno,
} from "../../controller/club/alumnoControllerClub.js"
import checkAuthClub from "../../middleware/checkAuthClub.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuthClub, obtenerAlumnos)
    .post(checkAuthClub, nuevoAlumno)

router
    .route('/:id')
    .get(checkAuthClub, obtenerAlumno)
    .patch(checkAuthClub, editarAlumno)
    .delete(checkAuthClub, eliminarAlumno)

export default router;