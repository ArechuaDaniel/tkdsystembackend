import express  from "express";

import {
    obtenerHorarios,
    obtenerHorario,
    nuevoHorario,
    editarHorario,
    eliminarHorario,
} from "../controller/horarioController.js"

//TODO: AGREGAR CHECKAUTH

const router = express.Router();

router
    .route("/")
    .get(obtenerHorarios)
    .post(nuevoHorario)

router
    .route('/:id')
    .get(obtenerHorario)
    .put(editarHorario)
    .delete(eliminarHorario)

export default router;