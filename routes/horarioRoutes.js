import express  from "express";

import {
    obtenerHorarios,
    obtenerHorario,
    nuevoHorario,
    editarHorario,
    eliminarHorario,
} from "../controller/horarioController.js"


import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuth,obtenerHorarios)
    .post(checkAuth,nuevoHorario)

router
    .route('/:id')
    .get(checkAuth,obtenerHorario)
    .put(checkAuth,editarHorario)
    .delete(checkAuth,eliminarHorario)

export default router;