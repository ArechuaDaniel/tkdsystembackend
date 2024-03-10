import { pool } from "../db.js";

const obtenerPaises = async (req, res) => {
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT * FROM pais;");
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los Paises" });
  }
}
const obtenerProvincias = async (req, res) => {
    
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT * FROM provincia ORDER BY provincia;");
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener las Provincias" });
  }
}
const obtenerCantones = async (req, res) => {
    
    
  try {
    const { id } = req.params;
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT * FROM canton WHERE idProvincia = ? ORDER BY canton;",[id]);
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los Cantones" });
  }
}
const obtenerParroquias = async (req, res) => {
    
  try {
    const { id } = req.params;
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT * FROM parroquia WHERE idCanton = ? ORDER BY parroquia;", [id]);
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener las Parroquias" });
  }
}
const obtenerCinturon= async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    // const [rows] = await pool.query("SELECT * FROM asistencia WHERE  idAsistencia = ? ", [
    //   id
    // ]);
    const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor= ? and idAsenso;",[cedulaInstructor, id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Asenso no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
  
}


export {
    obtenerPaises,
    obtenerProvincias,
    obtenerCantones,
    obtenerParroquias
   
}