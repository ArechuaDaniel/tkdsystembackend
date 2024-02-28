import express  from "express";
import {
    obtenerCinturones,
    nuevoCinturon,
    obtenerCinturon,
    editarCinturon,
    eliminarCinturon ,
} from "../controller/cinturonController.js"
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuth, obtenerCinturones)
    .post(checkAuth, nuevoCinturon)

router
    .route('/:id')
    .get(checkAuth, obtenerCinturon)
    .put(checkAuth, editarCinturon)
    .delete(checkAuth, eliminarCinturon)

export default router;