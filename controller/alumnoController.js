import { pool } from "../db.js";

const obtenerAlumnos = async (req, res) => {
  
  try {
    const [rows] = await pool.query("SELECT * FROM alumno");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No se puede Obtener los alumnos" });
  }
}
const nuevoAlumno = async (req, res) => {
  
  
  try {
    const {  cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,cedulaInstructor } = req.body;      
        
        const [rows] = await pool.query(
          "INSERT INTO alumno (cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,cedulaInstructor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,cedulaInstructor]
        );
        res.status(201).json({ id: rows.insertId, cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,cedulaInstructor});
      } catch (error) {
        return res.status(500).json({ message: "No se puede registrar alumno" });
      }
}
const obtenerAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM alumno WHERE cedulaAlumno = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}
const editarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,cedulaInstructor } = req.body;
    
    const [result] = await pool.query(
      "UPDATE alumno SET cedulaAlumno = IFNULL(?, cedulaAlumno), primerApellido = IFNULL(?, primerApellido), segundoApellido = IFNULL(?, segundoApellido), primerNombre = IFNULL(?, primerNombre), segundoNombre = IFNULL(?, segundoNombre), fechaNacimiento = IFNULL(?, fechaNacimiento), direccion = IFNULL(?, direccion), fechaIngreso = IFNULL(?, fechaIngreso), telefono = IFNULL(?, telefono), ocupacion = IFNULL(?, ocupacion), cedulaInstructor = IFNULL(?, cedulaInstructor) WHERE cedulaAlumno = ?",
      [cedulaAlumno ,primerApellido ,segundoApellido ,primerNombre  ,segundoNombre , fechaNacimiento ,direccion, fechaIngreso,telefono, ocupacion,cedulaInstructor , id ]
    );
    

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Alumno no encontrado" });

    const [rows] = await pool.query("SELECT * FROM alumno WHERE cedulaAlumno = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "No se puede editar el alumno" });
  }
    
}
const eliminarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM alumno WHERE cedulaAlumno = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Alumno no se encuentra" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}

export {
    obtenerAlumnos,
    obtenerAlumno,
    nuevoAlumno,
    editarAlumno,
    eliminarAlumno,
}