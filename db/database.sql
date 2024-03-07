drop database systemtkdbd1;
CREATE DATABASE IF NOT EXISTS systemtkdbd;
USE systemtkdbd;

CREATE TABLE asociacion (
  idAsociacion INT NOT NULL AUTO_INCREMENT,
  asociacion VARCHAR(45) NOT NULL,
  director VARCHAR(45) NOT NULL,
  fechaAfiliacion DATE,
  telefono CHAR(10) DEFAULT NULL,
  password VARCHAR(200) NOT NULL,
  correo CHAR(45) NOT NULL,
  idParroquia BIGINT(20) NOT NULL,
  token CHAR(45),
  confirmado boolean DEFAULT false,
  PRIMARY KEY(idAsociacion),
  FOREIGN KEY (idParroquia) REFERENCES parroquia(idParroquia) 
);
INSERT INTO asociacion (asociacion,director,fechaAfiliacion,telefono,password,correo,idParroquia) values 
  ('Asociación de Pichincha','Juanito','2000-10-10','0960073310','123456','asociacionpichincha@correo.com','1069');

CREATE TABLE club (
  idClub INT NOT NULL AUTO_INCREMENT,
  club VARCHAR(45) NOT NULL,
  director VARCHAR(45) NOT NULL,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaAfiliacion DATE,
  telefono CHAR(10) DEFAULT NULL,
  password VARCHAR(200) NOT NULL,
  correo CHAR(45) NOT NULL,
  idAsociacion INT NOT NULL,
  token CHAR(45),
  confirmado boolean DEFAULT false,
  PRIMARY KEY(idClub),
  FOREIGN KEY (idAsociacion) REFERENCES asociacion(idAsociacion) 
);
INSERT INTO club (club,director,direccion,fechaAfiliacion,telefono, correo,password,idAsociacion) values 
  ('Club Apolo','Pinto Mario','Carapungo','2000-10-10','0960073310','','','1');

CREATE TABLE instructor (
  cedulaInstructor CHAR(15) NOT NULL,
  correo CHAR(45) NOT NULL,
  password VARCHAR(200) NOT NULL,
  primerApellido VARCHAR(45) NOT NULL,
  segundoApellido VARCHAR(45) DEFAULT NULL,
  primerNombre VARCHAR(45) NOT NULL,
  segundoNombre VARCHAR(45) DEFAULT NULL,
  fechaNacimiento DATE,
  direccion VARCHAR(80) DEFAULT NULL,
  fechaRegistro DATE,
  telefono CHAR(10) DEFAULT NULL,
  genero ENUM("Masculino", "Femenino","Otros" ),
  idClub INT NOT NULL,
  token CHAR(45),
  confirmado boolean DEFAULT false,
  PRIMARY KEY(cedulaInstructor),
  FOREIGN KEY (idClub) REFERENCES club(idClub)
);
INSERT INTO instructor (cedulaInstructor,correo,password,primerApellido,segundoApellido,primerNombre,segundoNombre,fechaNacimiento,direccion,fechaRegistro,telefono,genero,idClub, confirmado) values 
  ('1234567811','correo@correo.com','123456','Sabonim','ken','Mario','Doe','1990-12-31','Carapungo','2019-12-31','0999999999','Masculino','1', '1');

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
  genero ENUM("Masculino", "Femenino","Otros" ),
  tipoSangre ENUM("AB+", "AB-","A+", "A-","B+", "B-","O+", "O-"),
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
  asensoColor VARCHAR(70) NOT NULL,
  color VARCHAR(70) NOT NULL,
  color2 VARCHAR(70),
  PRIMARY KEY(idCinturon) 
);
INSERT INTO cinturon (asensoColor,color,color2) values 
  ('Blanco', 'white', null),
  ('Blanco - Amarillo','white','yellow'),
  ('Amarillo', 'yellow', null),
  ('Amarillo - Verde','yellow' ,'green'),
  ('Verde','green', null),
  ('Verde - Azul','green','blue'),
  ('Azul', 'blue',null),
  ('Azul - Rojo', 'blue','red'),
  ('Rojo','red', null),
  ('Rojo - Negro','red', 'black'),
  ('Negro', 'black', null)
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





CREATE TABLE pago (
  idPago INT NOT NULL AUTO_INCREMENT,
  fechaPago DATE,
  mesPago DATE,
  cedulaAlumno CHAR(10) NOT NULL,
  formaPago ENUM("Efectivo","Transferencia","Deposito") NOT NULL,
  comprobante VARCHAR(55), 
  cedulaInstructor CHAR(10) NOT NULL,
  PRIMARY KEY(idPago),
  CONSTRAINT FK_cedulaInstructor1 FOREIGN KEY (cedulaInstructor) REFERENCES instructor(cedulaInstructor),
  CONSTRAINT FK_cedulaAlumno2 FOREIGN KEY (cedulaAlumno) REFERENCES alumno(cedulaAlumno)
);
INSERT INTO pago (fechaPago,mesPago,cedulaAlumno, formaPago, comprobante,cedulaInstructor) values 
  ('2024-03-01','2024-03-01','1234567897','Efectivo',null,'0930766449'),
  ('2024-03-01','2024-03-01','1234567896','Transferencia','4565988745','0930766449'); 

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


SELECT pago.idPago, pago.fechaPago, pago.mesPago,  pago.formaPago, pago.comprobante,pago.cedulaInstructor,alumno.cedulaAlumno, alumno.primerApellido, alumno.primerNombre FROM pago RIGHT JOIN alumno on alumno.cedulaAlumno = pago.cedulaAlumno WHERE pago.cedulaInstructor = '0930766449';

SELECT instructor.cedulaInstructor,instructor.primerApellido,instructor.segundoApellido,instructor.primerNombre,instructor.segundoNombre,instructor.fechaNacimiento,instructor.direccion,instructor.fechaRegistro,instructor.telefono,instructor.correo,instructor.genero,instructor.idClub, club.club FROM instructor JOIN club ON club.idClub = instructor.idClub WHERE instructor.cedulaInstructor = '0930766449' ;

SELECT pais.pais, provincia.provincia, canton.canton FROM pais JOIN provincia ON provincia.idPais = pais.idPais JOIN canton ON canton.idProvincia = provincia.idProvincia WHERE canton.idCanton = '178';

SELECT pais.pais, provincia.provincia, canton.canton FROM pais JOIN provincia ON provincia.idPais = pais.idPais JOIN canton ON canton.idProvincia = provincia.idProvincia WHERE canton.idCanton = '178';



-- CONSULTA DE PAIS PROVINCIA CANTON PARROQUIA
select asociacion.asociacion, parroquia.parroquia, canton.canton, provincia.provincia, pais.pais from asociacion JOIN parroquia ON parroquia.idParroquia = asociacion.idParroquia JOIN canton ON canton.idCanton = parroquia.idCanton JOIN provincia ON provincia.idProvincia = canton.idProvincia JOIN pais ON pais.idPais = provincia.idPais;