import express from "express";
import { 
    registrar, 
    autenticar, 
    confirmar,
    olvidePassword,
    comprobarToken, 
    nuevoPassword, perfil  
} from "../../controller/club/usuarioControllersClub.js";
import checkAuthClub from "../../middleware/checkAuthClub.js";
//import checkAuth from "../..checkAuth.js";



const router = express.Router();

// Autenticación y registro de Usuarios
router.post("/",checkAuthClub, registrar ); // Crea un nuevo usuario
router.post("/login",checkAuthClub,autenticar);
router.get('/confirmar/:token',checkAuthClub, confirmar)
router.post('/olvide-password',checkAuthClub, olvidePassword);
router.route('/olvide-password/:token').get(checkAuthClub,comprobarToken).post(checkAuthClub,nuevoPassword)
router.get('/perfil',checkAuthClub, perfil);
export default router;