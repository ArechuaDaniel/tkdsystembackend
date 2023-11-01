import express  from "express";
import {
    obtenerAlumnos,
    obtenerAlumno,
    nuevoAlumno,
    editarAlumno,
    eliminarAlumno,
} from "../controller/alumnoController.js"
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuth, obtenerAlumnos)
    .post(checkAuth, nuevoAlumno)

router
    .route('/:id')
    .get(checkAuth, obtenerAlumno)
    .patch(checkAuth, editarAlumno)
    .delete(checkAuth, eliminarAlumno)

export default router;