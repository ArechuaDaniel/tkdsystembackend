import { pool } from "../db.js";

const obtenerAsensos = async (req, res) => {
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.cinturon, instructor.cedulaInstructor FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor WHERE instructor.cedulaInstructor= ?;",[cedulaInstructor]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los asensos" });
  }
}
const nuevoAsenso = async (req, res) => {
    
}
const obtenerAsenso = async (req, res) => {
    
  
}
const editarAsenso = async (req, res) => {

   
}
const eliminarAsenso = async (req, res) => {
   
}

export {
    obtenerAsensos,
    nuevoAsenso,
    obtenerAsenso,
    editarAsenso,
    eliminarAsenso ,
}