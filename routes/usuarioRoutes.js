import express from "express";
import { 
    registrar, 
    autenticar, 
    olvidePassword,
    comprobarToken, 
    nuevoPassword, perfil  
} from "../controller/usuarioControllers.js";


const router = express.Router();

// Autenticación y registro de Usuarios
router.post("/", registrar ); // Cr;ea un nuevo usuario
router.post("/login", autenticar);
router.get('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
router.get('/perfil', perfil);
export default router;