import express  from "express";
import {
    obtenerAlumnos,
    obtenerAlumno,
    nuevoAlumno,
    editarAlumno,
    eliminarAlumno,
} from "../controller/alumnoController.js"
const router = express.Router();

router
    .route("/")
    .get(obtenerAlumnos)
    .post(nuevoAlumno)

router
    .route('/:id')
    .get(obtenerAlumno)
    .put(editarAlumno)
    .delete(eliminarAlumno)

export default router;