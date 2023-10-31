import generarId from "../helpers/generarId.js";
//import generarJWT from "../helpers/generarJWT.js";
import { pool } from "../db.js";
import bcryptjs from 'bcryptjs'



const registrar = async (req,res) => {
  
    try {

        const { cedulaInstructor, correo,password,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub} = req.body;

        var passwordHash = await bcryptjs.hash(password,10);

            const [rows] = await pool.query(
              "INSERT INTO instructor (cedulaInstructor,correo,password,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [cedulaInstructor, correo,passwordHash,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub],
              
            );
            
            res.status(201).json({ cedulaInstructor, correo,passwordHash,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub});    

          } catch (error) {
            
            return res.status(500).json({ message: "No se puede registrar instructor" });
          }
};

const autenticar = async (req, res) => {
    
    try {
        const {correo, password} = req.body;
    //COMPROBAR SI EL USUARIO EXISTE    
    const [result]  = await pool.query("SELECT * FROM instructor WHERE correo = ?", [
        correo,
      ]);
      console.log(user);
      if (result.length == '') {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message})
      }
    //COMPOROBAR PASSWORD
    } catch (error) {
        
    }
}
 
const olvidePassword = async (req, res) => {
    
}
const comprobarToken = async (req,res) => {
     
}
const nuevoPassword = async (req, res) => {
    
}
const perfil = async (req, res) => {
    
}

export {
    registrar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword, 
    perfil
}