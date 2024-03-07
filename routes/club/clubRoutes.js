import express from "express";
import { 
    registrar, 
    autenticar, 
    confirmar,
    olvidePassword,
    comprobarToken, 
    nuevoPassword, perfil  
} from "../../controller/club/clubController.js";
// import checkAuth from "../middleware/checkAuth.js";
import checkAuth from "../../middleware/checkAuth.js";


const router = express.Router();

// Autenticación y registro de Usuarios
router.post("/", registrar ); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
router.get('/perfil',checkAuth, perfil);
export default router;