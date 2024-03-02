import express  from "express";
import {
    obtenerPagos,
    nuevoPago,
    obtenerPago,
    editarPago,
    eliminarPago ,
} from "../controller/pagoController.js"
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(checkAuth, obtenerPagos)
    .post(checkAuth, nuevoPago)

router
    .route('/:id')
    .get(checkAuth, obtenerPago)
    .put(checkAuth, editarPago)
    .delete(checkAuth, eliminarPago)

export default router;