import { pool } from "../db.js";

const obtenerHorarios = async (req, res) => {
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
  try {
    
    const [rows] = await pool.query("SELECT * FROM horario WHERE cedulaInstructor = ? ORDER BY hoarioInicio",[cedulaInstructor]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los horarios" });
  }
}
const nuevoHorario = async (req, res) => {
    try {
        const {  hoarioInicio ,hoarioFin} = req.body;    
    
        const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
        
        
        const [rows] = await pool.query("INSERT INTO horario (hoarioInicio ,hoarioFin , cedulaInstructor) VALUES (?, ?, ?)",
        [hoarioInicio ,hoarioFin ,cedulaInstructor]
        );
        
            res.status(201).json({ id: rows.insertId,idHorario: rows.insertId, hoarioInicio ,hoarioFin , cedulaInstructor});
            //console.log(rows.insertId);
          } catch (error) {
            return res.status(500).json({ message: "No se puede registrar Horario" });
          }
}
const obtenerHorario = async (req, res) => {
    try {
        const { id } = req.params;
        const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
        const [rows] = await pool.query("SELECT * FROM horario WHERE  idHorario = ? and cedulaInstructor = ? ", [
          id, cedulaInstructor
        ]);
    
        if (rows.length <= 0) {
          return res.status(404).json({ message: "Horario no se encuentra" });
        }
    
        res.json(rows[0]);
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
  
}
const editarHorario = async (req, res) => {

    try {
        const { id } = req.params;
        const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
        
        const {  hoarioInicio ,hoarioFin} = req.body;
        
        const [result] = await pool.query(
          "UPDATE horario SET hoarioInicio = IFNULL(?, hoarioInicio), hoarioFin = IFNULL(?, hoarioFin)  WHERE  cedulaInstructor = ? and idHorario = ?",
          [hoarioInicio ,hoarioFin,cedulaInstructor, id ]
        );
        
    
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Horario no encontrado" });
    
        const [rows] = await pool.query("SELECT * FROM horario WHERE cedulaInstructor = ? and idHorario = ?", [
          cedulaInstructor,id
        ]);
    
        res.json(rows[0]);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "No se puede editar el horario" });
      }
}
const eliminarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    const [rows] = await pool.query("DELETE FROM horario WHERE idHorario = ? and cedulaInstructor = ? ;", [id, cedulaInstructor]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Horario no se encuentra" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "No se puede eliminar Horario" });
  }
}

export {
    obtenerHorarios,
    obtenerHorario,
    nuevoHorario,
    editarHorario,
    eliminarHorario,
}