import express from "express";
import { 
    obtenerClubes,
    obtenerClub,
    nuevoClub,
    editarClub,
    eliminarClub,
    cambiarPassword
} from "../../controller/club/clubControllerClub.js";
import checkAuthClub from "../../middleware/checkAuthClub.js";



const router = express.Router();

router
    .route("/")
    .get(checkAuthClub, obtenerClubes)
    .post(checkAuthClub, nuevoClub)

router
    .route('/:id')
    .get(checkAuthClub, obtenerClub)
    .put(checkAuthClub, editarClub)
    .delete(checkAuthClub, eliminarClub)

router
    .route('/cambiar-password/:id')
    .put(checkAuthClub, cambiarPassword);
export default router;