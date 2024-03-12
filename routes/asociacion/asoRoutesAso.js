import express from "express";
import { 
    obtenerAsociaciones,
    obtenerAsociacion,
    nuevaAsociaacion,
    editarAsociacion,
    eliminarAsociacion,
    cambiarPassword,
} from "../../controller/asociacion/asoControllerAso.js";
import checkAuthAso from "../../middleware/checkAuthAso.js";




const router = express.Router();

router
    .route("/")
    .get(checkAuthAso, obtenerAsociaciones)
    .post(checkAuthAso, nuevaAsociaacion)

router
    .route('/:id')
    .get(checkAuthAso, obtenerAsociacion)
    .put(checkAuthAso, editarAsociacion)
    .delete(checkAuthAso, eliminarAsociacion)

router
    .route('/cambiar-password/:id')
    .put(checkAuthAso, cambiarPassword);
export default router;