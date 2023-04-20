SET my.app_user = 'admin';
INSERT INTO rol VALUES(0, 'No asignado');
INSERT INTO rol VALUES(1, 'Administrador');
INSERT INTO rol VALUES(2, 'Medico');
INSERT INTO rol VALUES(3, 'Bodeguero');

INSERT INTO usuario VALUES('admin', 'admin@gmail.com','12345',0, 'Francisco Paez', '85143629');
INSERT INTO usuario VALUES('admin1', 'admin1@gmail.com','12345',0, 'Julieta Venegas', '42569873');
INSERT INTO usuario VALUES('admin2', 'admin2@gmail.com','12345',0, 'Michael Scott', '56898547');
INSERT INTO usuario VALUES('admin3', 'admin3@gmail.com','12345',0, 'Emilia Mernes', '45863214');
INSERT INTO usuario VALUES('admin4', 'admin4@gmail.com','12345',0, 'Pingüino Rodríguez', '45689615');
INSERT INTO usuario VALUES('medico', 'medico@gmail.com','12345',2, 'Juan Pérez', '85467925');
INSERT INTO usuario VALUES('medico1', 'medico1@gmail.com','12345',2, 'Daniela Gómez', '56329874');
INSERT INTO usuario VALUES('medico2', 'medico2@gmail.com','12345',2, 'Cristian Ramírez', '25463189');
INSERT INTO usuario VALUES('medico3', 'medico3@gmail.com','12345',2, 'Ximena Sánchez','50124879');
INSERT INTO usuario VALUES('medico4', 'medico4@gmail.com','12345',2, 'Emily Gutiérrez', '50565748');

INSERT INTO especialidad VALUES(DEFAULT, 'Anestesiología');
INSERT INTO especialidad VALUES(DEFAULT, 'Anatomía Patológica');
INSERT INTO especialidad VALUES(DEFAULT, 'Cardiología Clínica');
INSERT INTO especialidad VALUES(DEFAULT, 'Cardiología Intervencionista');
INSERT INTO especialidad VALUES(DEFAULT, 'Cirugía Pediátrica');
INSERT INTO especialidad VALUES(DEFAULT, 'Cirugía General');
INSERT INTO especialidad VALUES(DEFAULT, 'Cirugía Plástica y Reconstructiva');
INSERT INTO especialidad VALUES(DEFAULT, 'Angiología y Cirugía Vascular y Endovascular');
INSERT INTO especialidad VALUES(DEFAULT, 'Dermatología');
INSERT INTO especialidad VALUES(DEFAULT, 'Endoscopia del Aparato Digestivo');
INSERT INTO especialidad VALUES(DEFAULT, 'Gastroenterología');
INSERT INTO especialidad VALUES(DEFAULT, 'Ginegología y Obstetricia');
INSERT INTO especialidad VALUES(DEFAULT, 'Hematología');
INSERT INTO especialidad VALUES(DEFAULT, 'Infectología de Adulto');
INSERT INTO especialidad VALUES(DEFAULT, 'Medicina Aeroespacial');
INSERT INTO especialidad VALUES(DEFAULT, 'Medicina de Rehabilitación');
INSERT INTO especialidad VALUES(DEFAULT, 'Medicina Interna');
INSERT INTO especialidad VALUES(DEFAULT, 'Nefrología');
INSERT INTO especialidad VALUES(DEFAULT, 'Neurología de Adultos');
INSERT INTO especialidad VALUES(DEFAULT, 'Neumología');
INSERT INTO especialidad VALUES(DEFAULT, 'Oftalmología');
INSERT INTO especialidad VALUES(DEFAULT, 'Ortopedia');
INSERT INTO especialidad VALUES(DEFAULT, 'Otorrinolaringología');
INSERT INTO especialidad VALUES(DEFAULT, 'Patología Clínica');
INSERT INTO especialidad VALUES(DEFAULT, 'Pediatría');
INSERT INTO especialidad VALUES(DEFAULT, 'Psiquiatría General');
INSERT INTO especialidad VALUES(DEFAULT, 'Radiología e Imagen');
INSERT INTO especialidad VALUES(DEFAULT, 'Medicina Crítica');
INSERT INTO especialidad VALUES(DEFAULT, 'Urología');
INSERT INTO especialidad VALUES(DEFAULT, 'Cardiología Intervencionista');
INSERT INTO especialidad VALUES(DEFAULT, 'Neumología');
INSERT INTO especialidad VALUES(DEFAULT, 'Hematología');
INSERT INTO especialidad VALUES(DEFAULT, 'Cirugía Oncológica');
INSERT INTO especialidad VALUES(DEFAULT, 'Oncología Médica');
INSERT INTO especialidad VALUES(DEFAULT, 'Oncología Pediátrica');
INSERT INTO especialidad VALUES(DEFAULT, 'Radio-Oncología');
INSERT INTO especialidad VALUES(DEFAULT, 'Cirugía Neurológica');

INSERT INTO medico VALUES('0112345', 'Zona 12',1, 'medico');
INSERT INTO medico VALUES('0185469','Zona 1',8, 'medico1');
INSERT INTO medico VALUES('1284796','Zona 10',10, 'medico2');
INSERT INTO medico VALUES('1013452','Zona 6',12, 'medico3');
INSERT INTO medico VALUES('0642158','Zona 4',20, 'medico4');

INSERT INTO adiccion VALUES(DEFAULT, 'Alcohol');
INSERT INTO adiccion VALUES(DEFAULT, 'Tabaco');

INSERT INTO enfermedad VALUES(DEFAULT, 'gripe');
INSERT INTO enfermedad VALUES(DEFAULT, 'varicela');
INSERT INTO enfermedad VALUES(DEFAULT, 'influenza');
INSERT INTO enfermedad VALUES(DEFAULT, 'asma');
INSERT INTO enfermedad VALUES(DEFAULT, 'cancer');

INSERT INTO departamento VALUES(DEFAULT, 'Alta Verapaz');
INSERT INTO departamento VALUES(DEFAULT, 'Baja Verapaz');
INSERT INTO departamento VALUES(DEFAULT, 'Chimaltenango');
INSERT INTO departamento VALUES(DEFAULT, 'Chiquimula');
INSERT INTO departamento VALUES(DEFAULT, 'El Progreso');
INSERT INTO departamento VALUES(DEFAULT, 'Escuintla');
INSERT INTO departamento VALUES(DEFAULT, 'Guatemala');
INSERT INTO departamento VALUES(DEFAULT, 'Huehuetenango');
INSERT INTO departamento VALUES(DEFAULT, 'Izabal');
INSERT INTO departamento VALUES(DEFAULT, 'Jalapa');
INSERT INTO departamento VALUES(DEFAULT, 'Jutiapa');
INSERT INTO departamento VALUES(DEFAULT, 'Petén');
INSERT INTO departamento VALUES(DEFAULT, 'Quetzaltenango');
INSERT INTO departamento VALUES(DEFAULT, 'Quiché');
INSERT INTO departamento VALUES(DEFAULT, 'Retalhuleu');
INSERT INTO departamento VALUES(DEFAULT, 'Sacatepéquez');
INSERT INTO departamento VALUES(DEFAULT, 'San Marcos');
INSERT INTO departamento VALUES(DEFAULT, 'Santa Rosa');
INSERT INTO departamento VALUES(DEFAULT, 'Sololá');
INSERT INTO departamento VALUES(DEFAULT, 'Suchitepéquez');
INSERT INTO departamento VALUES(DEFAULT, 'Totonicapán');
INSERT INTO departamento VALUES(DEFAULT, 'Zacapa');

INSERT INTO municipio VALUES(DEFAULT, 'Cobán', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz Verapaz', 1);
INSERT INTO municipio VALUES(DEFAULT, 'San Cristobal Verapaz', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Tactíc', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Tamahú', 1);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Tucurú', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Panzos', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Senahú', 1);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Carchá', 1);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Chamelco', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Lanquín', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Santa María Cahabón', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Chisec', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Chahal', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Fray Bartolomé de las Casas', 1);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Catarina La Tinta', 1);

INSERT INTO municipio VALUES(DEFAULT, 'Salamá', 2);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Chicaj', 2);
INSERT INTO municipio VALUES(DEFAULT, 'Rabinal', 2);
INSERT INTO municipio VALUES(DEFAULT, 'Cubulco', 2);
INSERT INTO municipio VALUES(DEFAULT, 'Granados', 2);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz El Chol', 2);
INSERT INTO municipio VALUES(DEFAULT, 'San Jerónimo', 2);
INSERT INTO municipio VALUES(DEFAULT, 'Purulhá', 2);

INSERT INTO municipio VALUES(DEFAULT, 'Chimaltenango', 3);
INSERT INTO municipio VALUES(DEFAULT, 'San José Poaquil', 3);
INSERT INTO municipio VALUES(DEFAULT, 'San Martín Jilotepeque', 3);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Comalapa', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Apolonia', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Tecpán Guatemala', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Patzun', 3);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Pochuta', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Patzicia', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz Balanyá', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Acatenango', 3);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Yepocapa', 3);
INSERT INTO municipio VALUES(DEFAULT, 'San Andrés Itzapa', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Parramos', 3);
INSERT INTO municipio VALUES(DEFAULT, 'Zaragoza', 3);
INSERT INTO municipio VALUES(DEFAULT, 'El Tejar', 3);

INSERT INTO municipio VALUES(DEFAULT, 'Chiquimula', 4);
INSERT INTO municipio VALUES(DEFAULT, 'San José La Arada', 4);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Hermita', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Jocotán', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Camotán', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Olopa', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Esquipulas', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Concepción Las Minas', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Quezaltepeque', 4);
INSERT INTO municipio VALUES(DEFAULT, 'San Jacinto', 4);
INSERT INTO municipio VALUES(DEFAULT, 'Ipala', 4);

INSERT INTO municipio VALUES(DEFAULT, 'Guastatoya', 5);
INSERT INTO municipio VALUES(DEFAULT, 'Morazán', 5);
INSERT INTO municipio VALUES(DEFAULT, 'San Agustín Acasaguastlan', 5);
INSERT INTO municipio VALUES(DEFAULT, 'San Cristóbal Acasaguastlan', 5);
INSERT INTO municipio VALUES(DEFAULT, 'El Jícaro', 5);
INSERT INTO municipio VALUES(DEFAULT, 'Sansare', 5);
INSERT INTO municipio VALUES(DEFAULT, 'Sanarate', 5);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio La Paz', 5);

INSERT INTO municipio VALUES(DEFAULT, 'Escuintla', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Lucía Cotzumalguapa', 6);
INSERT INTO municipio VALUES(DEFAULT, 'La Democracia', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Siquinalá', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Masagua', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Pueblo Nuevo Tiquisate', 6);
INSERT INTO municipio VALUES(DEFAULT, 'La Gomera', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Guanagazapa', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Puerto de San José', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Iztapa', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Palín', 6);
INSERT INTO municipio VALUES(DEFAULT, 'San Vicente Pacaya', 6);
INSERT INTO municipio VALUES(DEFAULT, 'Nueva Concepción', 6);

INSERT INTO municipio VALUES(DEFAULT, 'Guatemala', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Catarina Pinula', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San José Pinula', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San José del Golfo', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Palencia', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Chinautla', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Ayampuc', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Mixco', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Sacatepequez', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Sacatepequez', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San Raymundo', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Chuarrancho', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Fraijanes', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Amatitlán', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Villa Nueva', 7);
INSERT INTO municipio VALUES(DEFAULT, 'Villa Canales', 7);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Petapa', 7);

INSERT INTO municipio VALUES(DEFAULT, 'Huehuetenango', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Chiantla', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Malacatancito', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Cuilco', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Nentón', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Necta', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Jacaltenango', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Soloma', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Ildefonso Ixtahuacán ', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Bárbara', 8);
INSERT INTO municipio VALUES(DEFAULT, 'La Libertad', 8);
INSERT INTO municipio VALUES(DEFAULT, 'La Democracia', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Acatán', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Rafael La Independencia', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Todos Santos Chuchcumatán', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Atitán', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Eulalia', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Mateo Ixtatán', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Colotenango', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Sebastián Huehuetenango ', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Tectitán', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Concepción Huista', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Ixcoy', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio Huista ', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Sebastián Coatán', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz Barillas', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Rafael Petzal', 8);
INSERT INTO municipio VALUES(DEFAULT, 'San Gaspar Ixchil', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Santiago Chimaltenango', 8);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Ana Huista', 8);

INSERT INTO municipio VALUES(DEFAULT, 'Puerto Barrios', 9);
INSERT INTO municipio VALUES(DEFAULT, 'Livingston', 9);
INSERT INTO municipio VALUES(DEFAULT, 'El Estor', 9);
INSERT INTO municipio VALUES(DEFAULT, 'Morales', 9);
INSERT INTO municipio VALUES(DEFAULT, 'Los Amates', 9);

INSERT INTO municipio VALUES(DEFAULT, 'Jalapa', 10);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Pinula', 10);
INSERT INTO municipio VALUES(DEFAULT, 'San Luis Jilotepeque', 10);
INSERT INTO municipio VALUES(DEFAULT, 'San Manuel Chaparrón', 10);
INSERT INTO municipio VALUES(DEFAULT, 'San Carlos Alzatate', 10);
INSERT INTO municipio VALUES(DEFAULT, 'Monjas', 10);
INSERT INTO municipio VALUES(DEFAULT, 'Mataquescuintla', 10);

INSERT INTO municipio VALUES(DEFAULT, 'Jutiapa', 11);
INSERT INTO municipio VALUES(DEFAULT, 'El Progreso', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Catarina Mita', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Agua Blanca', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Asunción Mita', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Yupiltepeque', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Atescatempa', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Jerez', 11);
INSERT INTO municipio VALUES(DEFAULT, 'El Adelanto', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Zapotitlán', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Comapa', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Jalpatagua', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Conguaco', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Moyuta', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Pasaco', 11);
INSERT INTO municipio VALUES(DEFAULT, 'San José Acatempa', 11);
INSERT INTO municipio VALUES(DEFAULT, 'Quezada', 11);

INSERT INTO municipio VALUES(DEFAULT, 'Flores', 12);
INSERT INTO municipio VALUES(DEFAULT, 'San José', 12);
INSERT INTO municipio VALUES(DEFAULT, 'San Benito', 12);
INSERT INTO municipio VALUES(DEFAULT, 'San Andrés', 12);
INSERT INTO municipio VALUES(DEFAULT, 'La Libertad', 12);
INSERT INTO municipio VALUES(DEFAULT, 'San Francisco', 12);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Ana', 12);
INSERT INTO municipio VALUES(DEFAULT, 'Dolores', 12);
INSERT INTO municipio VALUES(DEFAULT, 'San Luis', 12);
INSERT INTO municipio VALUES(DEFAULT, 'Sayaxche', 12);
INSERT INTO municipio VALUES(DEFAULT, 'Melchor de Mencos', 12);
INSERT INTO municipio VALUES(DEFAULT, 'Poptún', 12);

INSERT INTO municipio VALUES(DEFAULT, 'Quetzaltenango', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Salcajá', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Olintepeque', 13);
INSERT INTO municipio VALUES(DEFAULT, 'San Carlos Sija', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Sibilia', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Cabrican', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Cajola', 13);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Siguilça', 13);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Ostuncalco', 13);
INSERT INTO municipio VALUES(DEFAULT, 'San Mateo', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Concepción Chiquirichapa', 13);
INSERT INTO municipio VALUES(DEFAULT, 'San Martín Sacatepequez', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Almolonga', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Cantel', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Huitán', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Zunil', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Colomba', 13);
INSERT INTO municipio VALUES(DEFAULT, 'San Francisco La Unión', 13);
INSERT INTO municipio VALUES(DEFAULT, 'El Palmar', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Coatepeque', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Génova', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Flores Costa Cuca', 13);
INSERT INTO municipio VALUES(DEFAULT, 'La Esperanza', 13);
INSERT INTO municipio VALUES(DEFAULT, 'Palestina de los Altos', 13);

INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz del Quiche', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Chiche', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Chinique', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Zacualpa', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Chajul', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Santo Tomás Chichicstenango', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Patzité', 14);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio Ilotenango', 14);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Jocopilas', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Cunén', 14);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Cotzal', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Joyabaj', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Santa María Nebaj', 14);
INSERT INTO municipio VALUES(DEFAULT, 'San Andrés Sajcabajá', 14);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Uspatán', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Sacapulas', 14);
INSERT INTO municipio VALUES(DEFAULT, 'San Bartolomé Jocotenango', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Canilla', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Chicaman', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Ixcán', 14);
INSERT INTO municipio VALUES(DEFAULT, 'Pachalúm', 14);

INSERT INTO municipio VALUES(DEFAULT, 'Retalhuelu', 15);
INSERT INTO municipio VALUES(DEFAULT, 'San Sebastián', 15);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz Mulúa', 15);
INSERT INTO municipio VALUES(DEFAULT, 'San Martín Zapotitlán', 15);
INSERT INTO municipio VALUES(DEFAULT, 'San Felipe Retalhuleu', 15);
INSERT INTO municipio VALUES(DEFAULT, 'San Andrés Villa Seca', 15);
INSERT INTO municipio VALUES(DEFAULT, 'Champerico', 15);
INSERT INTO municipio VALUES(DEFAULT, 'Nuevo San Carlos', 15);
INSERT INTO municipio VALUES(DEFAULT, 'El Asintal', 15);

INSERT INTO municipio VALUES(DEFAULT, 'Antigua Guatemala', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Jocotenango', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Pastores', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Sumpango', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Santo Domingo Xenacoj', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Santiago Sacatepequez', 16);
INSERT INTO municipio VALUES(DEFAULT, 'San Bartolomé Milpas Altas', 16);
INSERT INTO municipio VALUES(DEFAULT, 'San Lucas Sacatepequez', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Lucía Milpas Altas', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Magdalena Milpas Altas', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Santa María de Jesús ', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Ciudad Vieja', 16);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Dueñas', 16);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Alotenango', 16);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio Aguas Calientes', 16);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Catarina Barahona', 16);

INSERT INTO municipio VALUES(DEFAULT, 'San Marcos', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro Sacatepéquez', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Comitancillo', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio Sacatepéquez', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Ixtahuacan', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Concepción Tutuapa', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Tacaná', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Sibinal', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Tajumulco', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Tejutla', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Rafael Pié de la Cuesta', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Nuevo Progreso', 17);
INSERT INTO municipio VALUES(DEFAULT, 'El Tumbador', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San José El Rodeo', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Malacatán', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Catarina', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Ayutla', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Ocos', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Pablo', 17);
INSERT INTO municipio VALUES(DEFAULT, 'El Quetzal', 17);
INSERT INTO municipio VALUES(DEFAULT, 'La Reforma', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Pajapita', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Ixchiguan', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San José Ojetenán', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Cristóbal Cucho', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Sipacapa', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Esquipulas Palo Gordo', 17);
INSERT INTO municipio VALUES(DEFAULT, 'Río Blanco', 17);
INSERT INTO municipio VALUES(DEFAULT, 'San Lorenzo', 17);

INSERT INTO municipio VALUES(DEFAULT, 'Cuilapa', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Barberena', 18);
INSERT INTO municipio VALUES(DEFAULT, 'San Rosa de Lima', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Casillas', 18);
INSERT INTO municipio VALUES(DEFAULT, 'San Rafael Las Flores', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Oratorio', 18);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Tecuaco', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Chiquimulilla', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Taxisco', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Santa María Ixhuatan', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Guazacapán', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz Naranjo', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Pueblo Nuevo Viñas', 18);
INSERT INTO municipio VALUES(DEFAULT, 'Nueva Santa Rosa', 18);

INSERT INTO municipio VALUES(DEFAULT, 'Sololá', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San José Chacaya', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santa María Visitación', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Lucía Utatlán', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Nahualá', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Catarina Ixtahuacán', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Clara La Laguna', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Concepción', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San Andrés Semetabaj', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Panajachel', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Catarina Palopó', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio Palopó', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San Lucas Tolimán', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Cruz La Laguna', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Sna Pablo La Laguna', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San Marcos La Laguna', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan La Laguna', 19);
INSERT INTO municipio VALUES(DEFAULT, 'San Pedro La Laguna', 19);
INSERT INTO municipio VALUES(DEFAULT, 'Santiago Atitlán', 19);

INSERT INTO municipio VALUES(DEFAULT, 'Mazatenango', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Cuyotenango', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Francisco Zapotitlán', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Bernardino', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San José El Ídolo', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Santo Domingo Suchitepequez', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Lorenzo', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Samayac', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Pablo Jocopilas', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Antonio Suchitepéquez', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Miguel Panán', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Gabriel', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Chicacao', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Patulul', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Bárbara', 20);
INSERT INTO municipio VALUES(DEFAULT, 'San Juan Bautista', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Santo Tomás La Unión', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Zunilito', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Pueblo Nuevo Suchitepéquez', 20);
INSERT INTO municipio VALUES(DEFAULT, 'Río Bravo', 20);

INSERT INTO municipio VALUES(DEFAULT, 'Totonicapán', 21);
INSERT INTO municipio VALUES(DEFAULT, 'San Cristóbal Totonicapán', 21);
INSERT INTO municipio VALUES(DEFAULT, 'San Francisco El Alto', 21);
INSERT INTO municipio VALUES(DEFAULT, 'San Andrés Xecul', 21);
INSERT INTO municipio VALUES(DEFAULT, 'Momostenango', 21);
INSERT INTO municipio VALUES(DEFAULT, 'Santa María Chiquimula', 21);
INSERT INTO municipio VALUES(DEFAULT, 'Santa Lucía La Reforma', 21);
INSERT INTO municipio VALUES(DEFAULT, 'San Bartolo Aguas Calientes', 21);

INSERT INTO municipio VALUES(DEFAULT, 'Zacapa', 22);
INSERT INTO municipio VALUES(DEFAULT, 'Estanzuela', 22);
INSERT INTO municipio VALUES(DEFAULT, 'Río Hondo', 22);
INSERT INTO municipio VALUES(DEFAULT, 'gualán', 22);
INSERT INTO municipio VALUES(DEFAULT, 'Teculután', 22);
INSERT INTO municipio VALUES(DEFAULT, 'Usumatlán', 22);
INSERT INTO municipio VALUES(DEFAULT, 'Cabañas', 22);
INSERT INTO municipio VALUES(DEFAULT, 'San Diego', 22);
INSERT INTO municipio VALUES(DEFAULT, 'La Unión', 22);
INSERT INTO municipio VALUES(DEFAULT, 'Huite', 22);

INSERT INTO cirugia VALUES(DEFAULT, 'Cabeza');
INSERT INTO cirugia VALUES(DEFAULT, 'Cuello');
INSERT INTO cirugia VALUES(DEFAULT, 'Pecho');
INSERT INTO cirugia VALUES(DEFAULT, 'Oído');
INSERT INTO cirugia VALUES(DEFAULT, 'Abdomen');

INSERT INTO examen VALUES(DEFAULT, 'Heces');
INSERT INTO examen VALUES(DEFAULT, 'Orina');
INSERT INTO examen VALUES(DEFAULT, 'Sangre');
INSERT INTO examen VALUES(DEFAULT, 'Triglicéridos');
INSERT INTO examen VALUES(DEFAULT, 'Endoscopía');

INSERT INTO medicamento VALUES(DEFAULT, 'Tabcin');
INSERT INTO medicamento VALUES(DEFAULT, 'Aspirina');
INSERT INTO medicamento VALUES(DEFAULT, 'Paracetamol');
INSERT INTO medicamento VALUES(DEFAULT, 'Santemicina');
INSERT INTO medicamento VALUES(DEFAULT, 'Ibuprofeno');

INSERT INTO material VALUES(DEFAULT, 'Bisturí');
INSERT INTO material VALUES(DEFAULT, 'Desfribilador');
INSERT INTO material VALUES(DEFAULT, 'Esterilizador');
INSERT INTO material VALUES(DEFAULT, 'Respirador artificial');
INSERT INTO material VALUES(DEFAULT, 'Jeringa');

INSERT INTO institucion VALUES(DEFAULT,'Hospital El Pilar', 73);
INSERT INTO institucion VALUES(DEFAULT,'Hospital San Juan de Dios', 73);
INSERT INTO institucion VALUES(DEFAULT,'Hospital Nacional de Amatitlán', 86);
INSERT INTO institucion VALUES(DEFAULT,'Centro de Salud de Villa Nueva', 87);
INSERT INTO institucion VALUES(DEFAULT,'Hospital San Cristóbal', 80);
INSERT INTO institucion VALUES(DEFAULT,'Hospital San José', 80);

INSERT INTO asignacion VALUES('medico', 1, DEFAULT, DEFAULT);
INSERT INTO asignacion VALUES('medico1', 4, DEFAULT, DEFAULT);
INSERT INTO asignacion VALUES('medico2', 2, DEFAULT, DEFAULT);
INSERT INTO asignacion VALUES('medico3', 1, DEFAULT, DEFAULT);
INSERT INTO asignacion VALUES('medico4', 3, DEFAULT, DEFAULT);

INSERT INTO bodega VALUES(1,'MED1',30,'20230510');
INSERT INTO bodega VALUES(2,'MED1',30,'20230510');
INSERT INTO bodega VALUES(3,'MED2',30,'20230425');
INSERT INTO bodega VALUES(3,'MED4',30,'20230510');
INSERT INTO bodega VALUES(1,'MAT1',30,'20230510');
INSERT INTO bodega VALUES(5,'MAT5',15,'20230430');
INSERT INTO bodega VALUES(1,'MED4',50,'20230501');
INSERT INTO bodega VALUES(2,'MED3',22,'20230701');
INSERT INTO bodega VALUES(4,'MAT2',9,'20240510');
INSERT INTO bodega VALUES(5,'MAT3',12,'20230610');

INSERT INTO expediente VALUES('3013344040101','Erick Stiv Junior Guerra Muñoz','59993108','Villa Nueva',DEFAULT);
INSERT INTO expediente VALUES('1345879632154','Juan Alberto García Gómez','40563125','Zona 5',DEFAULT);
INSERT INTO expediente VALUES('1576548796251','Gabriel Enrique Morales Fuentes','53154986','Zona 1',DEFAULT);
INSERT INTO expediente VALUES('1531459785155','Ximena Daniela Muñoz López','51234608','Zona 10',DEFAULT);
INSERT INTO expediente VALUES('8654781405012','Cristina Josefa Álvarez Aguirre','85467963','Zona 4',DEFAULT);

INSERT INTO historial VALUES(DEFAULT, '3013344040101', '2018-02-15', 1.73, 80, DEFAULT, false, 'vivo','El paciente ha evolucionado correctamente en sus respectivas enfermedades', 1);
INSERT INTO historial VALUES(DEFAULT, '3013344040101', '2019-12-10', 1.65, 75, DEFAULT, true, 'curado','El paciente ha evolucionado correctamente en sus respectivas enfermedades', 3);
INSERT INTO historial VALUES(DEFAULT, '1345879632154', '2019-10-05', 1.80, 50, DEFAULT, true, 'muerto','El paciente ha evolucionado correctamente en sus respectivas enfermedades', 2);
INSERT INTO historial VALUES(DEFAULT, '1576548796251', '2020-01-06', 1.40, 110, DEFAULT, false, 'vivo','El paciente ha evolucionado correctamente en sus respectivas enfermedades', 1);
INSERT INTO historial VALUES(DEFAULT, '1576548796251', '2020-03-15', 1.68, 85, DEFAULT, false, 'curado','El paciente ha evolucionado correctamente en sus respectivas enfermedades', 4);

INSERT INTO tratamiento VALUES(DEFAULT, 1, 'Se diagnosticaron los síntomas, se realizó un examen de orina y se recetó ibuprofeno', 1, '0112345');
INSERT INTO tratamiento VALUES(DEFAULT, 1, 'Se diagnosticaron los síntomas, se realizó un examen de orina y se recetó ibuprofeno', 2, '0185469');
INSERT INTO tratamiento VALUES(DEFAULT, 3, 'Se diagnosticaron los síntomas, se realizó un examen de orina y se recetó ibuprofeno', 3, '1284796');
INSERT INTO tratamiento VALUES(DEFAULT, 3, 'Se diagnosticaron los síntomas, se realizó un examen de orina y se recetó ibuprofeno', 4, '1013452');
INSERT INTO tratamiento VALUES(DEFAULT, 2, 'Se diagnosticaron los síntomas, se realizó un examen de orina y se recetó ibuprofeno', 5, '0642158');

INSERT INTO procedimiento_realizado VALUES(1, 'EXA1');
INSERT INTO procedimiento_realizado VALUES(3, 'CIR1');
INSERT INTO procedimiento_realizado VALUES(2, 'CIR5');
INSERT INTO procedimiento_realizado VALUES(2, 'EXA3');
INSERT INTO procedimiento_realizado VALUES(5, 'CIR1');

INSERT INTO medicamento_suministrado VALUES(1,1,30);
INSERT INTO medicamento_suministrado VALUES(3,1,10);
INSERT INTO medicamento_suministrado VALUES(4,3,10);
INSERT INTO medicamento_suministrado VALUES(5,2,5);
INSERT INTO medicamento_suministrado VALUES(3,3,2);
INSERT INTO medicamento_suministrado VALUES(5,4,3);
INSERT INTO medicamento_suministrado VALUES(1,4,1);

INSERT INTO enfermedad_padecida VALUES(1,5);
INSERT INTO enfermedad_padecida VALUES(1,4);
INSERT INTO enfermedad_padecida VALUES(2,2);
INSERT INTO enfermedad_padecida VALUES(3,4);
INSERT INTO enfermedad_padecida VALUES(5,5);

INSERT INTO adiccion_padecida VALUES(1,1);
INSERT INTO adiccion_padecida VALUES(2,1);
INSERT INTO adiccion_padecida VALUES(3,2);
INSERT INTO adiccion_padecida VALUES(4,1);
INSERT INTO adiccion_padecida VALUES(5,2);