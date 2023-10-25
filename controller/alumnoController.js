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
  const {  cedula, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento, direccion,fechaIngreso,telefono, ocupacion } = req.body;
  try {
        
        console.log(cedula);
        const [rows] = await pool.query(
          "INSERT INTO alumno (cedula, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento, direccion, fechaIngreso,telefono, ocupacion) VALUES (?, ?, ?,?, ?, ?.?, ?, ?,?)",
          [cedula, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento,direccion, fechaIngreso,telefono, ocupacion]
        );
        res.status(201).json({ cedula: rows.insertId, primerApellido, segundoApellido, primerNombre, segundoNombre, fechaNacimiento, direccion, fechaIngreso,telefono, ocupacion });
      } catch (error) {
        return res.status(500).json({ message: "Hubo un error" });
      }
}
const obtenerAlumno = async (req, res) => {
    
  
}
const editarAlumno = async (req, res) => {

    
}
const eliminarAlumno = async (req, res) => {
    
}

export {
    obtenerAlumnos,
    obtenerAlumno,
    nuevoAlumno,
    editarAlumno,
    eliminarAlumno,
}