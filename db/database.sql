drop database systemtkdbd;
CREATE DATABASE IF NOT EXISTS systemtkdbd;
USE systemtkdbd;

CREATE TABLE club (
  idClub INT NOT NULL AUTO_INCREMENT,
  club VARCHAR(45) NOT NULL,
  director VARCHAR(45) NOT NULL,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaAfiliacion DATE,
  telefono CHAR(10) DEFAULT NULL,
  PRIMARY KEY(idClub) 
);
INSERT INTO club (club,director,direccion,fechaAfiliacion,telefono) values 
  ('Club Apolo','Pinto Mario','Carapungo','2019-12-31','0999999999');

CREATE TABLE instructor (
  cedulaInstructor CHAR(15) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) DEFAULT NULL,
  primerNombre VARCHAR(45) NOT NULL,
  segundoNombre VARCHAR(45) DEFAULT NULL,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaRegistro DATE,
  telefono CHAR(10) DEFAULT NULL,
  idClub INT NOT NULL,
  PRIMARY KEY(cedulaInstructor),
  FOREIGN KEY (idClub) REFERENCES club(idClub)
);
INSERT INTO instructor values 
  ('1234567811','Pinto','ken','Mario','Doe','Carapungo','2019-12-31','0999999999','1');

SELECT * FROM club;

CREATE TABLE alumno (
  cedulaAlumno CHAR(10) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) DEFAULT NULL,
  primerNombre VARCHAR(45) NOT NULL,
  segundoNombre VARCHAR(45) DEFAULT NULL,
  fechaNacimiento DATE,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaIngreso DATE,
  telefono CHAR(10) DEFAULT NULL,
  ocupacion ENUM("Estudiante", "Trabaja", "Otros" ),
  cedulaInstructor CHAR(15) NOT NULL ,
  PRIMARY KEY(cedulaAlumno),
  FOREIGN KEY (cedulaInstructor) REFERENCES instructor(cedulaInstructor)
);

INSERT INTO alumno values 
  ('1234567890','Arias','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante','1234567811'),
  ('1234567891','Bartco','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Otros','1234567811'),
  ('1234567892','Pkdj','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante','1234567811'),
  ('1234567893','Ad','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante','1234567811');


SELECT club.club, instructor.primerNombre
FROM club
INNER JOIN instructor ON club.idClub = instructor.idClub;

SELECT * FROM alumno;

CREATE TABLE horario (
  idHorario INT NOT NULL AUTO_INCREMENT,
  club VARCHAR(45) NOT NULL,
  director VARCHAR(45) NOT NULL,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaAfiliacion DATE,
  telefono CHAR(10) DEFAULT NULL,
  PRIMARY KEY(idClub) 
);
INSERT INTO club (club,director,direccion,fechaAfiliacion,telefono) values 
  ('Club Apolo','Pinto Mario','Carapungo','2019-12-31','0999999999');
