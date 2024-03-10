import express  from "express";
import {
    obtenerPaises,
    obtenerProvincias,
    obtenerCantones,
    obtenerParroquias
} from "../controller/ubicacionController.js"
//import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
    .route("/")
    .get(obtenerPaises)
    

router
    .route('/provincia')
    .get(obtenerProvincias)
router
    .route('/canton/:id')
    .get( obtenerCantones)
router
    .route('/parroquia/:id')
    .get(obtenerParroquias)

export default router;