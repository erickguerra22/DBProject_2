DROP TABLE IF EXISTS adiccion_padecida;
DROP TABLE IF EXISTS enfermedad_padecida;
DROP TABLE IF EXISTS medicamento_suministrado;
DROP TABLE IF EXISTS procedimiento_realizado;
DROP TABLE IF EXISTS tratamiento;
DROP TABLE IF EXISTS historial;
DROP TABLE IF EXISTS expediente;
DROP TABLE IF EXISTS bodega;
DROP TABLE IF EXISTS asignacion;
DROP TABLE IF EXISTS bitacora;
DROP TABLE IF EXISTS institucion cascade;
DROP TABLE IF EXISTS suministro;
DROP TABLE IF EXISTS material;
DROP TABLE IF EXISTS medicamento;
DROP TABLE IF EXISTS procedimiento;
DROP TABLE IF EXISTS examen;
DROP TABLE IF EXISTS cirugia;
DROP TABLE IF EXISTS municipio;
DROP TABLE IF EXISTS departamento;
DROP TABLE IF EXISTS enfermedad;
DROP TABLE IF EXISTS adiccion;
DROP TABLE IF EXISTS medico;
DROP TABLE IF EXISTS especialidad;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;

CREATE TABLE rol(
	rol_id SERIAL PRIMARY KEY, -- 0: No asignado, 1: Administrador, 2: Medico, 3: Encargado de bodega
	nombre VARCHAR(30)
);

CREATE TABLE adiccion(
	adiccion_id SERIAL PRIMARY KEY,
	sustancia VARCHAR(30)
);

CREATE TABLE enfermedad(
	enfermedad_id SERIAL PRIMARY KEY,
	nombre VARCHAR(30)
);

CREATE TABLE departamento(
	departamento_id SERIAL PRIMARY KEY,
	nombre VARCHAR(50)
);

CREATE TABLE municipio(
	municipio_id SERIAL PRIMARY KEY,
	nombre VARCHAR(100),
	departamento_id INT REFERENCES departamento(departamento_id)
);

CREATE TABLE especialidad(
	especialidad_id SERIAL PRIMARY KEY,
	nombre VARCHAR(50)
);

CREATE TABLE cirugia(
	cirugia_id SERIAL PRIMARY KEY,
	nombre VARCHAR(100)
);

CREATE TABLE examen(
	examen_id SERIAL PRIMARY KEY,
	nombre VARCHAR(50)
);

CREATE TABLE procedimiento(
	procedimiento_id VARCHAR(10) PRIMARY KEY,
	cirugia_id INT REFERENCES cirugia(cirugia_id) UNIQUE,
	examen_id INT REFERENCES examen(examen_id) UNIQUE,
	CONSTRAINT block_both_procedures
	CHECK(cirugia_id IS NULL OR examen_id IS NULL)
);

CREATE TABLE medicamento(
	medicamento_id SERIAL PRIMARY KEY,
	nombre VARCHAR(50)
);

CREATE TABLE material(
	material_id SERIAL PRIMARY KEY,
	nombre VARCHAR(50)
);

CREATE TABLE suministro(
	suministro_id VARCHAR(10) PRIMARY KEY,
	medicamento_id INT REFERENCES medicamento(medicamento_id) UNIQUE,
	material_id INT REFERENCES material(material_id) UNIQUE,
	CONSTRAINT block_both_supplies
	CHECK(medicamento_id IS NULL OR material_id IS NULL)
);

CREATE TABLE institucion(
	institucion_id SERIAL PRIMARY KEY,
	nombre VARCHAR(30) UNIQUE,
	municipio_id INT REFERENCES municipio(municipio_id)
);

CREATE TABLE usuario(
	username VARCHAR(30) PRIMARY KEY,
	email VARCHAR(100) UNIQUE,
	pass TEXT,
	rol_id INT REFERENCES rol(rol_id),
	nombre VARCHAR(50),
	telefono VARCHAR(10) UNIQUE
);

CREATE TABLE medico(
	no_colegiado VARCHAR(10) PRIMARY KEY,
	direccion VARCHAR(50),
	especialidad_id INT REFERENCES especialidad(especialidad_id),
	usuario VARCHAR(30) REFERENCES usuario(username) UNIQUE
);

CREATE TABLE asignacion(
	usuario VARCHAR(30) REFERENCES usuario(username),
	institucion INT REFERENCES institucion(institucion_id),
	fecha_entrada DATE default current_date,
	fecha_salida DATE,
	PRIMARY KEY (usuario, institucion, fecha_entrada)
);

CREATE TABLE bitacora(
	bitacora_id SERIAL PRIMARY KEY,
	fechahora TIMESTAMP,
	usuario VARCHAR(30) REFERENCES usuario(username),
	tabla VARCHAR(50),
	accion VARCHAR(30),
	descripcion TEXT
);

CREATE TABLE bodega(
	institucion_id INT REFERENCES institucion(institucion_id),
	suministro_id VARCHAR(10) REFERENCES suministro(suministro_id),
	cantidad INT,
	fecha_vencimiento DATE,
	fecha_compra TIMESTAMP DEFAULT NOW(),
	PRIMARY KEY (institucion_id, suministro_id, fecha_compra)
);

CREATE TABLE expediente(
	dpi VARCHAR(20) PRIMARY KEY,
	nombre VARCHAR(50),
	telefono VARCHAR(10),
	direccion VARCHAR(50),
	estado VARCHAR(10)
);

CREATE TABLE historial(
	historial_id SERIAL PRIMARY KEY,
	dpi VARCHAR(20) REFERENCES expediente(dpi) ON DELETE CASCADE,
	fechahora_atencion TIMESTAMP,
	altura FLOAT,
	peso FLOAT,
	imc FLOAT GENERATED ALWAYS AS (peso/(altura^2)) STORED,
	precedentes BOOL,
	resultado VARCHAR(10),
	evolucion TEXT,
	institucion_id INT REFERENCES institucion(institucion_id)
);

CREATE TABLE tratamiento(
	tratamiento_id SERIAL PRIMARY KEY,
	historial_id INT REFERENCES historial(historial_id) ON DELETE CASCADE,
	descripcion TEXT,
	enfermedad_tratada INT REFERENCES enfermedad(enfermedad_id),
	medico_tratante VARCHAR(10) REFERENCES medico(no_colegiado)
);

CREATE TABLE procedimiento_realizado(
	tratamiento_id INT REFERENCES tratamiento(tratamiento_id),
	procedimiento_id VARCHAR(10) REFERENCES procedimiento(procedimiento_id),
	PRIMARY KEY (tratamiento_id, procedimiento_id)
);

CREATE TABLE medicamento_suministrado(
	tratamiento_id INT REFERENCES tratamiento(tratamiento_id),
	medicamento_id INT REFERENCES medicamento(medicamento_id),
	cantidad INT,
	PRIMARY KEY (tratamiento_id, medicamento_id)
);

CREATE TABLE enfermedad_padecida(
	historial_id INT REFERENCES historial(historial_id) ON DELETE CASCADE,
	enfermedad_id INT REFERENCES enfermedad(enfermedad_id),
	PRIMARY KEY (historial_id, enfermedad_id)
);

CREATE TABLE adiccion_padecida(
	historial_id INT REFERENCES historial(historial_id) ON DELETE CASCADE,
	adiccion_id INT REFERENCES adiccion(adiccion_id),
	PRIMARY KEY (historial_id, adiccion_id)
);

