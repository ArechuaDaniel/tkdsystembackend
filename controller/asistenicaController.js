
import { pool } from "../db.js";


const obtenerAsistencias = async (req, res) => {
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT asistencia.idAsistencia, alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre,asistencia.fechaRegistro, horario.idHorario,horario.hoarioInicio, horario.hoarioFin, horario.cedulaInstructor FROM asistencia join alumno on asistencia.cedulaAlumno = alumno.cedulaAlumno join horario on horario.idHorario = asistencia.idHorario WHERE horario.cedulaInstructor= ? ORDER BY asistencia.fechaRegistro DESC , alumno.primerApellido;",[cedulaInstructor]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener las asistencias" });
  }
}
const nuevaAsistencia = async (req, res) => {
  try {
    const { fechaRegistro,cedulaAlumno, idHorario} = req.body;    

    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    
    const [rows] = await pool.query("INSERT INTO asistencia (cedulaAlumno,fechaRegistro, idHorario) VALUES (?, ?, ?)",
    [cedulaAlumno,fechaRegistro, idHorario]
    );
    
        res.status(201).json({ id: rows.insertId,idAsistencia: rows.insertId, fechaRegistro,cedulaAlumno, idHorario});
        //console.log(rows.insertId);
      } catch (error) {
        return res.status(500).json({ message: "No se puede registrar Horario" });
      }
}
const obtenerAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    // const [rows] = await pool.query("SELECT * FROM asistencia WHERE  idAsistencia = ? ", [
    //   id
    // ]);
    const [rows] = await pool.query(" SELECT asistencia.idAsistencia, alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre,asistencia.fechaRegistro, horario.idHorario,horario.hoarioInicio, horario.hoarioFin, horario.cedulaInstructor FROM asistencia join alumno on asistencia.cedulaAlumno = alumno.cedulaAlumno join horario on horario.idHorario = asistencia.idHorario WHERE horario.cedulaInstructor= ? and idAsistencia = ? ;",[cedulaInstructor, id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Asistencia no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
  
}
const editarAsistencia = async (req, res) => {

  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    const { fechaRegistro, idHorario } = req.body;
    
    const [result] = await pool.query(
      "UPDATE asistencia SET fechaRegistro = IFNULL(?, fechaRegistro), idHorario = IFNULL(?, idHorario)  WHERE  idAsistencia = ?",
      [fechaRegistro, idHorario, id ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Asistencia no encontrada" });

    // const [rows] = await pool.query("SELECT * FROM horario WHERE cedulaInstructor = ? and idHorario = ?", [
    //   cedulaInstructor,id
    // ]);

    const [rows] = await pool.query(" SELECT asistencia.idAsistencia, alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre,asistencia.fechaRegistro, horario.idHorario,horario.hoarioInicio, horario.hoarioFin, horario.cedulaInstructor FROM asistencia join alumno on asistencia.cedulaAlumno = alumno.cedulaAlumno join horario on horario.idHorario = asistencia.idHorario WHERE horario.cedulaInstructor= ? and idAsistencia = ? ;",[cedulaInstructor, id]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede editar el horario" });
  }
}
const eliminarAsitencia = async (req, res) => {
   
}

export {
    obtenerAsistencias,
    obtenerAsistencia,
    nuevaAsistencia,
    editarAsistencia,
    eliminarAsitencia,
}