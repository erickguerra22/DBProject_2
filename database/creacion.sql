DROP TABLE IF EXISTS adiccion_padecida;
DROP TABLE IF EXISTS enfermedad_padecida;
DROP TABLE IF EXISTS medicamento_suministrado;
DROP TABLE IF EXISTS procedimiento_realizado;
DROP TABLE IF EXISTS tratamiento;
DROP TABLE IF EXISTS historial;
DROP TABLE IF EXISTS expediente;
DROP TABLE IF EXISTS bodega;
DROP TABLE IF EXISTS medico;
DROP TABLE IF EXISTS bitacora;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS institucion;
DROP TABLE IF EXISTS suministro;
DROP TABLE IF EXISTS material;
DROP TABLE IF EXISTS medicamento;
DROP TABLE IF EXISTS procedimiento;
DROP TABLE IF EXISTS examen;
DROP TABLE IF EXISTS cirugia;
DROP TABLE IF EXISTS especialidad;
DROP TABLE IF EXISTS municipio;
DROP TABLE IF EXISTS departamento;
DROP TABLE IF EXISTS enfermedad;
DROP TABLE IF EXISTS adiccion;
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

CREATE TABLE medico(
	no_colegiado VARCHAR(10) PRIMARY KEY,
	nombre VARCHAR(50),
	direccion VARCHAR(50),
	telefono VARCHAR(10),
	especialidad_id INT REFERENCES especialidad(especialidad_id)
);

CREATE TABLE usuario(
	usuario_id SERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE,
	email VARCHAR(100) UNIQUE,
	pass TEXT,
	institucion_id INT REFERENCES institucion(institucion_id),
	rol_id INT REFERENCES rol(rol_id),
	no_colegiado VARCHAR(10) REFERENCES medico(no_colegiado)
);

CREATE TABLE bitacora(
	fechahora TIMESTAMP PRIMARY KEY,
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
	PRIMARY KEY (institucion_id, suministro_id)
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
	dpi VARCHAR(20) REFERENCES expediente(dpi),
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
	historial_id INT REFERENCES historial(historial_id),
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
	historial_id INT REFERENCES historial(historial_id),
	enfermedad_id INT REFERENCES enfermedad(enfermedad_id),
	PRIMARY KEY (historial_id, enfermedad_id)
);

CREATE TABLE adiccion_padecida(
	historial_id INT REFERENCES historial(historial_id),
	adiccion_id INT REFERENCES adiccion(adiccion_id),
	PRIMARY KEY (historial_id, adiccion_id)
);

DROP FUNCTION IF EXISTS insertar_procedimiento;
CREATE OR REPLACE FUNCTION insertar_procedimiento()
RETURNS TRIGGER AS
$BODY$
DECLARE "rows" INT;
BEGIN
	IF(TG_TABLE_NAME = 'cirugia') THEN
		"rows" = (select count(cirugia_id) from procedimiento) + 1;
		INSERT INTO procedimiento VALUES(CONCAT('CIR',"rows"), new.cirugia_id, NULL);
	ELSE
		"rows" = (select count(examen_id) from procedimiento) + 1;
		INSERT INTO procedimiento VALUES(CONCAT('EXA',"rows"), NULL, new.examen_id);
	END IF;
	RETURN NEW;
END;
$BODY$
LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS triggerProcedimiento_on_cirugia ON cirugia;
CREATE TRIGGER triggerProcedimiento_on_cirugia
AFTER INSERT
ON cirugia
FOR EACH ROW
EXECUTE PROCEDURE insertar_procedimiento();

DROP TRIGGER IF EXISTS triggerProcedimiento_on_examen ON examen;
CREATE TRIGGER triggerProcedimiento_on_examen
AFTER INSERT
ON examen
FOR EACH ROW
EXECUTE PROCEDURE insertar_procedimiento();

DROP FUNCTION IF EXISTS insertar_suministro;
CREATE OR REPLACE FUNCTION insertar_suministro()
RETURNS TRIGGER AS
$BODY$
DECLARE "rows" INT;
BEGIN
	IF(TG_TABLE_NAME = 'medicamento') THEN
		"rows" = (select count(medicamento_id) from suministro) + 1;
		INSERT INTO suministro VALUES(CONCAT('MED',"rows"), new.medicamento_id, NULL);
	ELSE
		"rows" = (select count(material_id) from suministro) + 1;
		INSERT INTO suministro VALUES(CONCAT('MAT',"rows"), NULL, new.material_id);
	END IF;
	RETURN NEW;
END;
$BODY$
LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS triggerSuministro_on_medicamento ON medicamento;
CREATE TRIGGER triggerSuministro_on_medicamento
AFTER INSERT
ON medicamento
FOR EACH ROW
EXECUTE PROCEDURE insertar_suministro();

DROP TRIGGER IF EXISTS triggerSuministro_on_material ON examen;
CREATE TRIGGER triggerSuministro_on_material
AFTER INSERT
ON material
FOR EACH ROW
EXECUTE PROCEDURE insertar_suministro();

DROP FUNCTION IF EXISTS actualizar_estado;
CREATE OR REPLACE FUNCTION actualizar_estado()
RETURNS TRIGGER AS
$BODY$
BEGIN
	IF(LOWER(new.resultado) = 'muerto') THEN
		UPDATE expediente SET estado = 'Muerto' WHERE dpi = new.dpi;
	END IF;
	RETURN NEW;
END;
$BODY$
LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS triggerStatus_on_historial ON historial;
CREATE TRIGGER triggerStatus_on_historial
AFTER INSERT OR UPDATE
ON historial
FOR EACH ROW
EXECUTE PROCEDURE actualizar_estado();

DROP FUNCTION IF EXISTS actualizar_bodega;
CREATE OR REPLACE FUNCTION actualizar_bodega()
RETURNS TRIGGER AS
$BODY$
DECLARE institucion INT;
DECLARE existencias INT;
DECLARE medicamento VARCHAR(10);
BEGIN
	institucion = (select institucion_id from tratamiento natural join historial where tratamiento_id = new.tratamiento_id);
	medicamento = (select suministro_id from suministro where medicamento_id = new.medicamento_id);
	existencias = COALESCE((select cantidad from bodega where institucion_id = institucion and suministro_id = medicamento),0);
	IF (new.cantidad > existencias) then
		raise exception 'No hay cantidad suficiente en bodega para cumplir con la receta';
	ELSE
		UPDATE bodega SET cantidad = (existencias - new.cantidad) where suministro_id = medicamento and institucion_id = institucion;
	END IF;
	RETURN NEW;
END;
$BODY$
LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS trigger_on_medicamentoSuministrado ON medicamento_suministrado;
CREATE TRIGGER trigger_on_medicamentoSuministrado
BEFORE INSERT
ON medicamento_suministrado
FOR EACH ROW
EXECUTE PROCEDURE actualizar_bodega();