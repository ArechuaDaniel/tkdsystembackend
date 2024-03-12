import express from "express";
import { 
    obtenerInstructores,
    obtenerInstructor,
    nuevoInstructor,
    editarInstructor,
    eliminarInstructor, 
    cambiarPassword
} from "../../controller/club/instructorControllerClub.js";
import checkAuthClub from "../../middleware/checkAuthClub.js";



const router = express.Router();

router
    .route("/")
    .get(checkAuthClub, obtenerInstructores)
    .post(checkAuthClub, nuevoInstructor)

router
    .route('/:id')
    .get(checkAuthClub, obtenerInstructor)
    .put(checkAuthClub, editarInstructor)
    .delete(checkAuthClub, eliminarInstructor)

router
    .route('/cambiar-password/:id')
    .put(checkAuthClub, cambiarPassword);
export default router;