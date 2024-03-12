import { pool } from "../../db.js";
import bcryptjs from 'bcryptjs'

const obtenerClubes= async (req, res) => {
  try {
    const idAsociacion= req.usuario[0][0].idAsociacion;
    
    const [rows] = await pool.query("select club.club, club.director, club.fechaAfiliacion, club.telefono, club.correo,  club.direccion, club.idClub, parroquia.parroquia, canton.canton, provincia.provincia, pais.pais, pais.idPais, provincia.idProvincia, canton.idCanton, parroquia.idParroquia, asociacion.idAsociacion, asociacion.asociacion from club JOIN asociacion ON asociacion.idAsociacion = club.idAsociacion JOIN parroquia ON parroquia.idParroquia = club.idParroquia JOIN canton ON canton.idCanton = parroquia.idCanton JOIN provincia ON provincia.idProvincia = canton.idProvincia JOIN pais ON pais.idPais = provincia.idPais WHERE club.idAsociacion = ? ;", [
      idAsociacion
    ]);
    //const [rows] = await pool.query("select * from club",);
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los Clubes" });
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
    const [rows] = await pool.query("select club.club, club.director, club.fechaAfiliacion, club.telefono, club.correo,  club.direccion, club.idClub, parroquia.parroquia, canton.canton, provincia.provincia, pais.pais, pais.idPais, provincia.idProvincia, canton.idCanton, parroquia.idParroquia from club JOIN parroquia ON parroquia.idParroquia = club.idParroquia JOIN canton ON canton.idCanton = parroquia.idCanton JOIN provincia ON provincia.idProvincia = canton.idProvincia JOIN pais ON pais.idPais = provincia.idPais WHERE idClub = ? ;", [
      id
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
    const idClub= req.usuario[0][0].idClub;
    const { password } = req.body;
    var passwordHash = await bcryptjs.hash(password, 10);
    
    const [result] = await pool.query(
      "UPDATE club SET password = IFNULL(?, password) WHERE idClub = ?",
      [passwordHash,idClub  ]
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