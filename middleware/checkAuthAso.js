import jwt  from "jsonwebtoken";
import { pool } from "../db.js";

const checkAuthAso = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            //console.log(token);

             const decoded = jwt.verify(token, process.env.JWT_SECRET);
             
             
            req.usuario = await pool.query("SELECT idAsociacion, director, correo ,asociacion FROM asociacion  WHERE idAsociacion = ?", [
                decoded.id,
              ]);
            return next();
        } catch (error) {
            return res.status(404).json({msg: 'Hubo un error'})
        }
    }
    if (!token) {
        const error = new Error('Token no válido');
        return res.status(403).json({msg: error.message})
      } 
    next();
};

export default checkAuthAso;