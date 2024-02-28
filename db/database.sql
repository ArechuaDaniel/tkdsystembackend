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
  ('Club Apolo','Pinto Mario','Carapungo','2000-10-10','0960073310');

CREATE TABLE instructor (
  cedulaInstructor CHAR(15) NOT NULL,
  correo CHAR(45) NOT NULL,
  password VARCHAR(200) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) DEFAULT NULL,
  primerNombre VARCHAR(45) NOT NULL,
  segundoNombre VARCHAR(45) DEFAULT NULL,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaRegistro DATE,
  telefono CHAR(10) DEFAULT NULL,
  idClub INT NOT NULL,
  token CHAR(45),
  confirmado boolean DEFAULT false,
  PRIMARY KEY(cedulaInstructor),
  FOREIGN KEY (idClub) REFERENCES club(idClub)
);
INSERT INTO instructor (cedulaInstructor,correo,password,primerApellido,segundoApellido,primerNombre,segundoNombre,direccion,fechaRegistro,telefono,idClub, confirmado) values 
  ('1234567811','correo@correo.com','123456','Sabonim','ken','Mario','Doe','Carapungo','2019-12-31','0999999999','1', '1');

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
  estado ENUM("Activo", "Inactivo" ),
  cedulaInstructor CHAR(15) NOT NULL ,
  PRIMARY KEY(cedulaAlumno),
  FOREIGN KEY (cedulaInstructor) REFERENCES instructor(cedulaInstructor)
);

INSERT INTO alumno values 
  ('1234567810','Arias','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante','Activo','1234561232'),
  ('1234567815','Bartco','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Otros','Activo','1234561232'),
  ('1234567825','Perez','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante','Activo','1234561232'),
  ('1234567824','Zaza','ken','Jhon','Doe','1999-12-31','Carapungo','2019-12-31','0999999999','Estudiante','Inactivo','1234561232');


SELECT club.club, instructor.primerNombre
FROM club
INNER JOIN instructor ON club.idClub = instructor.idClub;

SELECT * FROM alumno;

CREATE TABLE horario (
  idHorario INT NOT NULL AUTO_INCREMENT,
  hoarioInicio TIME NOT NULL,
  hoarioFin TIME NOT NULL,
  cedulaInstructor CHAR(15) NOT NULL ,
  PRIMARY KEY(idHorario), 
  FOREIGN KEY (cedulaInstructor) REFERENCES instructor(cedulaInstructor)
);
INSERT INTO horario (hoarioInicio, hoarioFin, cedulaInstructor) values 
  ('10:00','11:00','0930766449'),
  ('11:00','12:00','0930766449'),
  ('12:00','13:00','0930766449'),
  ('13:00','14:00','1234561232')
  ;

SELECT * FROM horario;

CREATE TABLE asistencia (
  idAsistencia INT NOT NULL AUTO_INCREMENT,
  fechaRegistro DATE,
  cedulaAlumno CHAR(10) NOT NULL,
  idHorario INT,
  PRIMARY KEY(idAsistencia),
  CONSTRAINT FK_cedulaAlumno FOREIGN KEY (cedulaAlumno) REFERENCES alumno(cedulaAlumno),
  CONSTRAINT FK_idHorario FOREIGN KEY (idHorario) REFERENCES horario(idHorario)
);
INSERT INTO asistencia (fechaRegistro,cedulaAlumno, idHorario) values 
  ('2023-10-30','1202547898',1),
  ('2023-10-30','1234567810',4);

CREATE TABLE cinturon (
  idCinturon INT NOT NULL AUTO_INCREMENT,
  color VARCHAR(70) NOT NULL,
  PRIMARY KEY(idCinturon) 
);
INSERT INTO cinturon (color) values 
  ('Blanco'),
  ('Blanco - Amarillo'),
  ('Amarillo'),
  ('Amarillo - Verde'),
  ('Verde'),
  ('Verde - Azul'),
  ('Azul'),
  ('Azul - Rojo'),
  ('Rojo'),
  ('Rojo - Negro'),
  ('Negro')
  ;  
CREATE TABLE asenso (
  idAsenso INT NOT NULL AUTO_INCREMENT,
  fechaAsenso DATE,
  cedulaAlumno CHAR(10) NOT NULL,
  idCinturon INT,
  -- cinturon ENUM("Blanco", "Blanco-Amarillo", "Amarillo", "Amarillo-Verde", "Verde","Verde-Azul", "Azul", "Azul-Rojo", "Rojo", "Rojo-Negro", "Negro"),
  cedulaInstructor CHAR(10) NOT NULL,
  PRIMARY KEY(idAsenso),
  CONSTRAINT FK_idCinturon FOREIGN KEY (idCinturon) REFERENCES cinturon(idCinturon),
  CONSTRAINT FK_cedulaAlumno1 FOREIGN KEY (cedulaAlumno) REFERENCES alumno(cedulaAlumno),
  CONSTRAINT FK_cedulaInstructor FOREIGN KEY (cedulaInstructor) REFERENCES instructor(cedulaInstructor)
  
);
INSERT INTO asenso (fechaAsenso,cedulaAlumno, idCinturon,cedulaInstructor) values 
  ('2023-10-30','1234567897','2','0930766449'),
  ('2023-10-30','1234567896','3','0930766449');  

SELECT * FROM asistencia;
SELECT * FROM instructor;
SELECT cedulaInstructor, password, primerApellido FROM instructor;
SELECT cedulaInstructor, password, 	CONCAT(primerApellido,' ',primerNombre) AS Nombres FROM instructor;
SELECT cedulaInstructor,correo, password, 	CONCAT(primerApellido,' ',primerNombre) AS Nombres, token FROM instructor;
SELECT cedulaInstructor,correo, password, 	CONCAT(primerApellido,' ',primerNombre) AS Nombres, token, confirmado FROM instructor;

update instructor set confirmado = 1 where cedulaInstructor = "1234567817";


SELECT asistencia.idAsistencia, alumno.cedulaAlumno, 
  alumno.primerApellido, alumno.primerNombre,asistencia.fechaRegistro, horario.idHorario,
  horario.hoarioInicio, horario.hoarioFin, horario.cedulaInstructor
  FROM asistencia inner join alumno on asistencia.cedulaAlumno = alumno.cedulaAlumno
  inner join horario on horario.idHorario = asistencia.idHorario 
  where horario.cedulaInstructor= '0930766449';


" SELECT asistencia.idAsistencia, alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre,asistencia.fechaRegistro, horario.idHorario,horario.hoarioInicio, horario.hoarioFin, horario.cedulaInstructor FROM asistencia join alumno on asistencia.cedulaAlumno = alumno.cedulaAlumno join horario on horario.idHorario = asistencia.idHorario WHERE horario.cedulaInstructor= ?;"

const [rows] = await pool.query(" SELECT asistencia.idAsistencia, alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre,asistencia.fechaRegistro, horario.idHorario,horario.hoarioInicio, horario.hoarioFin, horario.cedulaInstructor FROM asistencia join alumno on asistencia.cedulaAlumno = alumno.cedulaAlumno join horario on horario.idHorario = asistencia.idHorario WHERE horario.cedulaInstructor= ?;",[cedulaInstructor]);


SELECT asenso.idAsenso, asenso.fechaAsenso, asenso.cedulaAlumno, alumno.primerApellido,alumno.primerNombre,asenso.cedulaInstructor, asenso.idCinturon,cinturon.color FROM asenso join alumno on alumno.cedulaAlumno = asenso.cedulaAlumno join instructor on instructor.cedulaInstructor = asenso.cedulaInstructor join cinturon on cinturon.idCinturon = asenso.idCinturon WHERE instructor.cedulaInstructor='0930766449';