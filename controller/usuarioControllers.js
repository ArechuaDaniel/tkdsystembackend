import generarId from "../helpers/generarId.js";
//import generarJWT from "../helpers/generarJWT.js";
import { pool } from "../db.js";
import bcryptjs from 'bcryptjs'
import generarJWT from "../helpers/generarJWT.js";



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
    // console.log(result[0].primerApellido);
    
    //COMPOROBAR PASSWORD
    const hashSaved = result[0].password;
    const compare = bcryptjs.compareSync(password, hashSaved);
    if (compare) {
      res.json({
        primerApellido: result[0].primerApellido,
        correo,
        token: generarJWT(result[0].cedulaInstructor),
      })
    } else {
      const error = new Error('El Password es Incorrecto');
        return res.status(403).json({msg: error.message})
    }
    } catch (error) {
        console.log(error);
    }
}
const confirmar= async (req, res) => {
   
    try {
      const {token} = req.params;
      const [result]  = await pool.query("SELECT * FROM instructor WHERE token = ?", [
        token,
      ]);
      if (result.length == '') {
        const error = new Error('Token no válido');
        return res.status(403).json({msg: error.message})
      }
 
      await pool.query(
        "UPDATE instructor SET confirmado = ?,token = ?  WHERE token = ?",
        [1 ,''  , token ]
      );
      res.json({msg:"Usuario Confirmado Correctamente"})
    } catch (error) {
      console.log(error);
    }
}

const olvidePassword = async (req, res) => {
    const {correo} = req.body;
    //COMPROBAR SI EL USUARIO EXISTE    
    
    const [result]  = await pool.query("SELECT * FROM instructor WHERE correo = ?", [
      correo,
    ]);
    
    if (result.length == '') {
      const error = new Error('El usuario no existe');
      return res.status(404).json({msg: error.message})
    }
    try {
      const token = generarId();
      await pool.query(
        "UPDATE instructor SET token = ?  WHERE correo = ?",
        [token , correo ]
      );
      res.json({msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
      console.log(error);
    }
}
const comprobarToken = async (req,res) => {
     const {token} = req.params;
     const [result]  = await pool.query("SELECT * FROM instructor WHERE token = ?", [
      token,
    ]);
    if (result.length == '') {
      const error = new Error('Token no válido');
      return res.status(403).json({msg: error.message})
    } else {
      res.json({msg: "Token válido y el usuario existe"})
    }
}
const nuevoPassword = async (req, res) => {
  const {token} = req.params;
  const {password} = req.body;
  const [result]  = await pool.query("SELECT * FROM instructor WHERE token = ?", [
   token,
 ]);
 if (result.length == '') {
   const error = new Error('Token no válido');
   return res.status(403).json({msg: error.message})
 } else {
  try {
    var passwordHash = await bcryptjs.hash(password,10);
    await pool.query(
      "UPDATE instructor SET token = ?, password=?  WHERE token = ?",
      ['',passwordHash , token ]
    );
     res.json({msg: "Password Modificado Correctamente"})  
  } catch (error) {
    console.log(error);
  }
  
 }
}
const perfil = async (req, res) => {
  
  const {usuario} = req;
    res.json(usuario[0][0])
    
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword, 
    perfil
}