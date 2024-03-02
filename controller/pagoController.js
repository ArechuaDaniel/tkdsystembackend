import { pool } from "../db.js";

const obtenerPagos = async (req, res) => {
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
  try {
    
    // const [rows] = await pool.query("SELECT * FROM asistencia ");
    const [rows] = await pool.query(" SELECT pago.idPago, pago.fechaPago, pago.mesPago,  pago.formaPago, pago.comprobante,pago.cedulaInstructor,alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre FROM pago RIGHT JOIN alumno on alumno.cedulaAlumno = pago.cedulaAlumno WHERE pago.cedulaInstructor =  ? ;",[cedulaInstructor]);
    
    
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los pagos" });
  }
}
const nuevoPago = async (req, res) => {
  try {
    const { cedulaAlumno, fechaPago, mesPago,formaPago,comprobante} = req.body;    

    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    
    const [rows] = await pool.query("INSERT INTO pago(cedulaAlumno, fechaPago, mesPago,formaPago,comprobante,cedulaInstructor) VALUES (?, ?, ?,?,?,?)",
    [cedulaAlumno, fechaPago, mesPago,formaPago,comprobante,cedulaInstructor]
    );
    // if (rows.length <= 0) {
    //   return res.status(404).json({ message: "Pago no se encuentra" });
    // }
    
        res.status(201).json({ id: rows.insertId,idPago: rows.insertId, cedulaAlumno, fechaPago, mesPago,formaPago,comprobante,cedulaInstructor});
        //console.log(rows.insertId);
      } catch (error) {
        return res.status(500).json({ message: "No se puede registrar Pago" });
      }
}
const obtenerPago = async (req, res) => {
  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    // const [rows] = await pool.query("SELECT * FROM asistencia WHERE  idAsistencia = ? ", [
    //   id
    // ]);
    // const [rows] = await pool.query(" SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor= ? and idAsenso;",[cedulaInstructor, id]);
    const [rows] = await pool.query(" SELECT pago.idPago, pago.fechaPago, pago.mesPago,  pago.formaPago, pago.comprobante,pago.cedulaInstructor,alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre FROM pago RIGHT JOIN alumno on alumno.cedulaAlumno = pago.cedulaAlumno WHERE pago.cedulaInstructor =  ? and pago.idPago = ? ;",[cedulaInstructor, id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Pago no se encuentra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
  
}
const editarPago = async (req, res) => {

  try {
    const { id } = req.params;
    const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
    
    const { fechaPago, mesPago,formaPago,comprobante } = req.body;
    
    const [result] = await pool.query(
      "UPDATE pago SET fechaPago = IFNULL(?, fechaPago), mesPago = IFNULL(?, mesPago), formaPago = IFNULL(?, formaPago), comprobante = IFNULL(?, comprobante)  WHERE  idPago= ? ",
      [fechaPago, mesPago,formaPago,comprobante, id ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pago no encontrado" });

    // const [rows] = await pool.query("SELECT * FROM horario WHERE cedulaInstructor = ? and idHorario = ?", [
    //   cedulaInstructor,id
    // ]);

    const [rows] = await pool.query(" SELECT pago.idPago, pago.fechaPago, pago.mesPago,  pago.formaPago, pago.comprobante,pago.cedulaInstructor,alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre FROM pago RIGHT JOIN alumno on alumno.cedulaAlumno = pago.cedulaAlumno WHERE pago.cedulaInstructor =  ? and pago.idPago = ? ;",[cedulaInstructor, id]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "No se puede editar el Pago" });
  }
}
const eliminarPago = async (req, res) => {
    try {
        const { id } = req.params;
        const cedulaInstructor= req.usuario[0][0].cedulaInstructor;
        const [rows] = await pool.query("DELETE FROM pago WHERE idPago = ? and cedulaInstructor = ?", [id, cedulaInstructor]);
    
        if (rows.affectedRows <= 0) {
          return res.status(404).json({ message: "Pago no se encuentra" });
        }
    
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: "Ha ocurrido un error" });
      }
}

export {
    obtenerPagos,
    nuevoPago,
    obtenerPago,
    editarPago,
    eliminarPago ,
}