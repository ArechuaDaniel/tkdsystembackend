import express from "express";
import { 
    obtenerInstructores,
    obtenerInstructor,
    nuevoInstructor,
    editarInstructor,
    eliminarInstructor, 
    cambiarPassword
} from "../controller/instructorController.js";
import checkAuth from "../middleware/checkAuth.js";



const router = express.Router();

router
    .route("/")
    .get(checkAuth, obtenerInstructor)
    .post(checkAuth, nuevoInstructor)

router
    .route('/:id')
    .get(checkAuth, obtenerInstructor)
    .put(checkAuth, editarInstructor)
    .delete(checkAuth, eliminarInstructor)

router
    .route('/cambiar-password/:id')
    .put(checkAuth, cambiarPassword);
export default router;