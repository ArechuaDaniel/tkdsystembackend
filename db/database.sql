drop database systemtkdbd;
CREATE DATABASE IF NOT EXISTS systemtkdbd;
USE systemtkdbd;

CREATE TABLE almuno (
  cedula CHAR(10) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) DEFAULT NULL,
  primerNombre VARCHAR(45) NOT NULL,
  segundoNombre VARCHAR(45) DEFAULT NULL,
  fechaNacimiento DATE,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaIngreso DATE,
  telefono CHAR(10) DEFAULT NULL,
  ocupacion ENUM("Estudiante", "Trabaja", "Otros" ),
  PRIMARY KEY(cedula)
);

INSERT INTO almuno values 
  ('1234567890','Arias','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante'),
  ('1234567891','Bartco','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Otros'),
  ('1234567892','Pkdj','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante'),
  ('1234567893','Ad','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante');

SELECT * FROM almuno;