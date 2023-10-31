import generarId from "../helpers/generarId.js";
//import generarJWT from "../helpers/generarJWT.js";
import { pool } from "../db.js";
import bcryptjs from 'bcryptjs'



const registrar = async (req,res) => {
  
    try {

        const { cedulaInstructor, correo,password,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub} = req.body;

        var passwordHash = await bcryptjs.hash(password,10);
        const token = generarId();

            const [rows] = await pool.query(
              "INSERT INTO instructor (cedulaInstructor,correo,password,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub,token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
              [cedulaInstructor, correo,passwordHash,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub,token],
              
            );
            
            res.status(201).json({ cedulaInstructor, correo,passwordHash,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub,token});    

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
      
      if (result.length == '') {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message})
      }
      
    //COMPROBAR SI EL USUARIO ESTA CONFIRMADO
        
    if (result[0].confirmado <= 0 ) {
      const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message})
    }
    console.log(result[0].password);
    //COMPOROBAR PASSWORD
    const hashSaved = result[0].password;
    const compare = bcryptjs.compareSync(password, hashSaved);
    if (compare) {
      res.json({
        correo
      })
    } else {
      const error = new Error('El Password es Incorrecto');
        return res.status(403).json({msg: error.message})
    }
    } catch (error) {
        console.log(error);
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