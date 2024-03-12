import { pool } from "../../db.js";
import bcryptjs from 'bcryptjs'

const obtenerAsociaciones= async (req, res) => {
  
  const idAsociacion= req.usuario[0][0].idAsociacion;
    
  try {
    
    const [rows] = await pool.query("select asociacion.asociacion, asociacion.director, asociacion.fechaAfiliacion, asociacion.telefono, asociacion.correo,  asociacion.direccion, asociacion.idAsociacion, parroquia.parroquia, canton.canton, provincia.provincia, pais.pais, pais.idPais, provincia.idProvincia, canton.idCanton, parroquia.idParroquia from asociacion JOIN parroquia ON parroquia.idParroquia = asociacion.idParroquia JOIN canton ON canton.idCanton = parroquia.idCanton JOIN provincia ON provincia.idProvincia = canton.idProvincia JOIN pais ON pais.idPais = provincia.idPais WHERE idAsociacion = ? ;", [
      idAsociacion
    ]);
    //console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener Asociacion" });
  }
}
const nuevaAsociaacion = async (req, res) => {
  
  
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
const obtenerAsociacion = async (req, res) => {
  try {
    const { id } = req.params;
    const idAsociacion= req.usuario[0][0].idClub;
    const [rows] = await pool.query("select asociacion.asociacion, asociacion.director, asociacion.fechaAfiliacion, asociacion.telefono, asociacion.correo,  asociacion.direccion, asociacion.idAsociacion, parroquia.parroquia, canton.canton, provincia.provincia, pais.pais, pais.idPais, provincia.idProvincia, canton.idCanton, parroquia.idParroquia from asociacion JOIN parroquia ON parroquia.idParroquia = asociacion.idParroquia JOIN canton ON canton.idCanton = parroquia.idCanton JOIN provincia ON provincia.idProvincia = canton.idProvincia JOIN pais ON pais.idPais = provincia.idPais WHERE idAsociacion = ? ;", [
      idAsociacion
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Asociación no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}
const editarAsociacion = async (req, res) => {
  try {
    const { id } = req.params;
    const idAsociacion= req.usuario[0][0].idAsociacion;
    const {asociacion, director, fechaAfiliacion, telefono, correo, idParroquia, direccion} = req.body;
    
    const [result] = await pool.query(
      "UPDATE asociacion SET  asociacion = IFNULL(?, asociacion), director = IFNULL(?, director), fechaAfiliacion = IFNULL(?, fechaAfiliacion), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo), idParroquia = IFNULL(?, idParroquia), direccion = IFNULL(?, direccion) WHERE idAsociacion = ?",
      [asociacion, director, fechaAfiliacion, telefono, correo, idParroquia, direccion, idAsociacion  ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Asociación no encontrada" });

    const [rows] = await pool.query("SELECT * FROM asociacion WHERE idAsociacion = ?", [
      idAsociacion
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede actualizar la Asociación" });
  }
    
}

const cambiarPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const idAsociacion= req.usuario[0][0].idAsociacion;
    const { password } = req.body;
    var passwordHash = await bcryptjs.hash(password, 10);
    
    const [result] = await pool.query(
      "UPDATE asociacion SET password = IFNULL(?, password) WHERE idAsociacion = ?",
      [passwordHash,idAsociacion  ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Asociación no encontrada" });

    const [rows] = await pool.query("SELECT * FROM asociacion WHERE idAsociacion = ?", [
      idAsociacion
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede actualizar la Asociación" });
  }
    
}
const eliminarAsociacion = async (req, res) => {
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
    obtenerAsociaciones,
    obtenerAsociacion,
    nuevaAsociaacion,
    editarAsociacion,
    eliminarAsociacion,
    cambiarPassword,
}