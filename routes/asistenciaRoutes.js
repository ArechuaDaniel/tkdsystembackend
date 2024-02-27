import express  from "express";

import {
    obtenerAsistencias,
    obtenerAsistencia,
    nuevaAsistencia,
    editarAsistencia,
    eliminarAsitencia,
} from "../controller/asistenicaController.js"


import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuth,obtenerAsistencias)
    .post(checkAuth,nuevaAsistencia)

router
    .route('/:id')
    .get(checkAuth,obtenerAsistencia)
    .put(checkAuth,editarAsistencia)
    .delete(checkAuth,eliminarAsitencia)

export default router;