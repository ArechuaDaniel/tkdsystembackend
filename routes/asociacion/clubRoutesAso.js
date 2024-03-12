import express from "express";
import { 
    obtenerClubes,
    obtenerClub,
    nuevoClub,
    editarClub,
    eliminarClub,
    cambiarPassword
} from "../../controller/asociacion/clubControllerAso.js";

import checkAuthAso from "../../middleware/checkAuthAso.js";



const router = express.Router();

router
    .route("/")
    .get(checkAuthAso, obtenerClubes)
    .post(checkAuthAso, nuevoClub)

router
    .route('/:id')
    .get(checkAuthAso, obtenerClub)
    .put(checkAuthAso, editarClub)
    .delete(checkAuthAso, eliminarClub)

router
    .route('/cambiar-password/:id')
    .put(checkAuthAso, cambiarPassword);
export default router;