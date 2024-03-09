import { pool } from "../../db.js";
import bcryptjs from 'bcryptjs'

const obtenerClubes= async (req, res) => {
  
  const idClub= req.usuario[0][0].idClub;
    
  try {
    
    const [rows] = await pool.query("SELECT * FROM club WHERE idClub = ? ;", [
        idClub
      ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener Club" });
  }
}
const nuevoClub = async (req, res) => {
  
  
  try {
    const {  cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion, estado,genero,tipoSangre,} = req.body;    

    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    
    
        
        const [rows] = await pool.query(
          "INSERT INTO alumno (cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,estado, genero,tipoSangre,cedulaInstructor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)",
          [cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,estado,genero,tipoSangre,cedulaInstructor]
        );
        res.status(201).json({ id: rows.insertId, cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,estado,genero,tipoSangre, cedulaInstructor});
      } catch (error) {
        return res.status(500).json({ message: "No se puede registrar alumno" });
      }
}
const obtenerClub = async (req, res) => {
  try {
    const { id } = req.params;
    const idClub= req.usuario[0][0].idClub;
    const [rows] = await pool.query("SELECT * FROM club WHERE idClub = ? ;", [
      idClub
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Club no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}
const editarClub = async (req, res) => {
  try {
    const { id } = req.params;
    const idClub= req.usuario[0][0].idClub;
    const {club, director, fechaAfiliacion, telefono, correo, idParroquia, direccion} = req.body;
    
    const [result] = await pool.query(
      "UPDATE club SET  club = IFNULL(?, club), director = IFNULL(?, director), fechaAfiliacion = IFNULL(?, fechaAfiliacion), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo), idParroquia = IFNULL(?, idParroquia), direccion = IFNULL(?, direccion) WHERE idClub = ?",
      [club, director, fechaAfiliacion, telefono, correo, idParroquia, direccion, idClub  ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Club no encontrado" });

    const [rows] = await pool.query("SELECT * FROM club WHERE idClub = ?", [
      idClub
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede actualizar el Club" });
  }
    
}

const cambiarPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    const { password } = req.body;
    var passwordHash = await bcryptjs.hash(password, 10);
    
    const [result] = await pool.query(
      "UPDATE instructor SET password = IFNULL(?, password) WHERE cedulaInstructor = ?",
      [passwordHash,cedulaInstructor  ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Instructor no encontrado" });

    const [rows] = await pool.query("SELECT * FROM instructor WHERE cedulaInstructor = ?", [
      cedulaInstructor
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede actualizar el instructor" });
  }
    
}
const eliminarClub = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    const [rows] = await pool.query("DELETE FROM alumno WHERE cedulaAlumno = ? and cedulaInstructor = ?", [id, cedulaInstructor]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Alumno no se encuentra" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "No se puede eliminar Alumno" });
  }
}

export {
    obtenerClubes,
    obtenerClub,
    nuevoClub,
    editarClub,
    eliminarClub,
    cambiarPassword,
}