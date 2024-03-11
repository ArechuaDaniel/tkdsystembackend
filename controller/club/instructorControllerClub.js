import { pool } from "../../db.js";
import bcryptjs from 'bcryptjs'

const obtenerInstructores = async (req, res) => {
  
  const idClub= req.usuario[0][0].idClub;
    
  try {
    
    const [rows] = await pool.query("SELECT * FROM instructor WHERE idClub = ? ORDER BY primerApellido",[idClub]);
    //console.log(rows);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los Instructores" });
  }
}
const nuevoInstructor = async (req, res) => {
  
  
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
const obtenerInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const idClub= req.usuario[0][0].idClub;
    // const [rows] = await pool.query("SELECT instructor.cedulaInstructor,instructor.primerApellido,instructor.segundoApellido,instructor.primerNombre,instructor.segundoNombre,instructor.fechaNacimiento,instructor.direccion,instructor.fechaRegistro,instructor.telefono,instructor.correo,instructor.genero,instructor.idClub, club.club FROM instructor JOIN club ON club.idClub = instructor.idClub WHERE instructor.cedulaInstructor = ? ;", [
    //   id
    // ]);
    
    const [rows] = await pool.query("SELECT instructor.cedulaInstructor,instructor.primerApellido,instructor.segundoApellido,instructor.primerNombre,instructor.segundoNombre,instructor.fechaNacimiento,instructor.direccion,instructor.fechaRegistro,instructor.telefono,instructor.correo,instructor.genero,instructor.tipoSangre,instructor.idClub, club.club,parroquia.parroquia, canton.canton, provincia.provincia, pais.pais, pais.idPais, provincia.idProvincia, canton.idCanton, parroquia.idParroquia FROM instructor JOIN club ON club.idClub = instructor.idClub JOIN parroquia ON parroquia.idParroquia = instructor.idParroquia JOIN canton ON canton.idCanton = parroquia.idCanton JOIN provincia ON provincia.idProvincia = canton.idProvincia JOIN pais ON pais.idPais = provincia.idPais WHERE instructor.idClub = ? and instructor.cedulaInstructor = ?",[idClub, id]);
    //console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Instructor no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}
const editarInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    const { primerApellido,segundoApellido,primerNombre,segundoNombre,fechaNacimiento,direccion,fechaRegistro,telefono,idClub,correo,genero} = req.body;
    //var passwordHash = await bcryptjs.hash(password, 10);
    
    const [result] = await pool.query(
      "UPDATE instructor SET  primerApellido = IFNULL(?, primerApellido), segundoApellido = IFNULL(?, segundoApellido), primerNombre = IFNULL(?, primerNombre), segundoNombre = IFNULL(?, segundoNombre), fechaNacimiento = IFNULL(?, fechaNacimiento), direccion = IFNULL(?, direccion), fechaRegistro = IFNULL(?, fechaRegistro), telefono = IFNULL(?, telefono), idClub = IFNULL(?, idClub), correo = IFNULL(?, correo), genero = IFNULL(?, genero) WHERE cedulaInstructor = ?",
      [primerApellido,segundoApellido,primerNombre,segundoNombre,fechaNacimiento,direccion,fechaRegistro,telefono,idClub,correo,genero,cedulaInstructor  ]
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
const eliminarInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const idClub= req.usuario[0][0].idClub;
    const [rows] = await pool.query("DELETE FROM instructor WHERE cedulaInstructor = ? and idClub = ?", [id, idClub]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Instructor no se encuentra" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "No se puede eliminar Instructor" });
  }
}

export {
    obtenerInstructores,
    obtenerInstructor,
    nuevoInstructor,
    editarInstructor,
    eliminarInstructor,
    cambiarPassword,
}