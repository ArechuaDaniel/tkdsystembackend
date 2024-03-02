import { pool } from "../db.js";

const obtenerAsensos = async (req, res) => {
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color, cinturon.color2,cinturon.asensoColor FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor= ? ORDER BY asenso.fechaAsenso DESC;",[cedulaInstructor]);
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los asensos" });
  }
}
const nuevoAsenso = async (req, res) => {
  try {
    const { fechaAsenso,cedulaAlumno,idCinturon} = req.body;    

    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    
    const [rows] = await pool.query("INSERT INTO asenso(fechaAsenso,cedulaAlumno, idCinturon,cedulaInstructor) VALUES (?, ?, ?,?)",
    [fechaAsenso,cedulaAlumno, idCinturon,cedulaInstructor]
    );
    
        res.status(201).json({ id: rows.insertId,idAsenso: rows.insertId, fechaAsenso,cedulaAlumno, idCinturon,cedulaInstructor});
        //console.log(rows.insertId);
      } catch (error) {
        return res.status(500).json({ message: "No se puede registrar Asenso" });
      }
}
const obtenerAsenso = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    // const [rows] = await pool.query("SELECT * FROM asistencia WHERE  idAsistencia = ? ", [
    //   id
    // ]);
    // const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor= ? and idAsenso;",[cedulaInstructor, id]);
    const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor= ? and idAsenso = ?;",[cedulaInstructor,id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Asenso no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
  
}
const editarAsenso = async (req, res) => {

  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    const { fechaAsenso, idCinturon } = req.body;
    
    const [result] = await pool.query(
      "UPDATE asenso SET fechaAsenso = IFNULL(?, fechaAsenso), idCinturon = IFNULL(?, idCinturon)  WHERE  idAsenso = ?",
      [fechaAsenso, idCinturon, id ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Asenso no encontrado" });

    // const [rows] = await pool.query("SELECT * FROM horario WHERE cedulaInstructor = ? and idHorario = ?", [
    //   cedulaInstructor,id
    // ]);

    const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor= ? and idAsenso = ?;",[cedulaInstructor,id]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede editar el asenso" });
  }
}
const eliminarAsenso = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    const [rows] = await pool.query("DELETE FROM asenso WHERE idAsenso = ? and cedulaInstructor = ? ", [id, cedulaInstructor]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Asenso no se encuentra" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "No se puede eliminar asenso" });
  }
}

export {
    obtenerAsensos,
    nuevoAsenso,
    obtenerAsenso,
    editarAsenso,
    eliminarAsenso ,
}