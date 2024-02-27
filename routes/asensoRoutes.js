import express  from "express";
import {
    obtenerAsensos,
    nuevoAsenso,
    obtenerAsenso,
    editarAsenso,
    eliminarAsenso ,
} from "../controller/asensoController.js"
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuth, obtenerAsensos)
    .post(checkAuth, nuevoAsenso)

router
    .route('/:id')
    .get(checkAuth, obtenerAsenso)
    .put(checkAuth, editarAsenso)
    .delete(checkAuth, eliminarAsenso)

export default router;