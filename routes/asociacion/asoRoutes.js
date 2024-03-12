import express from "express";
import { 
    registrar, 
    autenticar, 
    confirmar,
    olvidePassword,
    comprobarToken, 
    nuevoPassword, perfil  
} from "../../controller/asociacion/asoController.js";

// import checkAuth from "../middleware/checkAuth.js";
import checkAuthAso from "../../middleware/checkAuthAso.js";


const router = express.Router();

// Autenticación y registro de Usuarios
router.post("/", registrar ); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
router.get('/perfil',checkAuthAso, perfil);
export default router;