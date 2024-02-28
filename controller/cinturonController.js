import { pool } from "../db.js";

const obtenerCinturones = async (req, res) => {
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT * FROM cinturon;");
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los cinturones" });
  }
}
const nuevoCinturon = async (req, res) => {
  try {
    const { fechaAsenso,cedulaAlumno, cinturon} = req.body;    

    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    
    const [rows] = await pool.query("INSERT INTO asenso(fechaAsenso,cedulaAlumno, cinturon,cedulaInstructor) VALUES (?, ?, ?,?)",
    [fechaAsenso,cedulaAlumno, cinturon,cedulaInstructor]
    );
    
        res.status(201).json({ id: rows.insertId,idAsenso: rows.insertId, fechaAsenso,cedulaAlumno, cinturon,cedulaInstructor});
        //console.log(rows.insertId);
      } catch (error) {
        return res.status(500).json({ message: "No se puede registrar Asenso" });
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
const editarCinturon = async (req, res) => {

   
}
const eliminarCinturon = async (req, res) => {
   
}

export {
    obtenerCinturones,
    nuevoCinturon,
    obtenerCinturon,
    editarCinturon,
    eliminarCinturon ,
}