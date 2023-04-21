--------------------------------- TRIGGERS -------------------------------
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

create or replace function insertar_bitacora()
RETURNS trigger as
$BODY$
declare usuario text;
begin
	usuario = (SELECT current_setting('my.app_user'));
	if lower(TG_OP) = 'update' or lower(TG_OP) = 'delete' then  
		if TG_TABLE_NAME = 'historial' then
	    insert into bitacora(fechahora, usuario, tabla, accion, descripcion)
	    values (now(), usuario, 'historial', TG_OP, 
	   	(concat('|Registro modificdo| historial: ', old.historial_id, ' dpi: ', old.dpi, ' fechahora_atencion: ', old.fechahora_atencion, 
	   	' altura: ', old.altura, ' peso: ', old.peso, ' imc: ', old.imc, ' precedentes: ', old.precedentes, 
	   	' resultado: ', old.resultado, ' evolucion: ', old.evolucion, ' institucion_id: ', old.institucion_id))
	   	);
	   	else
	   	insert into bitacora(fechahora, usuario, tabla, accion, descripcion)
	    values (now(), usuario, 'expediente', TG_OP, 
	   	(concat('|Registro modificdo| dpi: ', old.dpi, ' nombre: ', old.nombre, ' telefono: ', old.telefono, 
	   	' direccion: ', old.direccion, ' estado: ', old.estado))
	   	);
	   	end if;
	else 
		if TG_TABLE_NAME = 'historial' then
		insert into bitacora(fechahora, usuario, tabla, accion, descripcion)
	    values (now(), usuario, 'historial', TG_OP, null);
	   	else
	   	insert into bitacora(fechahora, usuario, tabla, accion, descripcion)
	    values (now(), usuario, 'expediente', TG_OP, null);
	   	end if;
	end if;
    return new;
END;
$BODY$
LANGUAGE 'plpgsql';

drop trigger if exists trigger_on_historial on historial;
CREATE TRIGGER trigger_on_historial
after insert or update or delete 
ON historial
FOR EACH ROW
EXECUTE PROCEDURE insertar_bitacora();

drop trigger if exists trigger_on_expediente on expediente;
CREATE TRIGGER trigger_on_expediente
after insert or update or delete 
ON expediente
FOR EACH ROW
EXECUTE PROCEDURE insertar_bitacora();

create or replace function salida()
RETURNS trigger as
$BODY$
begin
	UPDATE asignacion SET fecha_salida = current_date WHERE usuario = new.usuario AND fecha_salida is null;
    return new;
END;
$BODY$
LANGUAGE 'plpgsql';

drop trigger if exists trigger_on_asignacion on asignacion;
CREATE TRIGGER trigger_on_asignacion
BEFORE insert
ON asignacion
FOR EACH ROW
EXECUTE PROCEDURE salida();

--------------------------------- FUNCIONES -------------------------------
drop function expediente_paciente_dpi(dpipa varchar(20));
CREATE OR REPLACE FUNCTION expediente_paciente_dpi(dpipa varchar(20))
RETURNS TABLE(nombre VARCHAR(50), telefono VARCHAR(10), direccion VARCHAR(50), estado VARCHAR(10)) as
$BODY$
begin
   	if dpipa not in (select dpi from expediente) then raise exception 'El DPI ingresado no es válido';
  	end if;
   	return query
   	select e.nombre, e.telefono, e.direccion, e.estado
   	from expediente e
   	where e.dpi = dpipa;
end;
$BODY$
LANGUAGE plpgsql;

drop function expediente_paciente_nombre(nombrein varchar(20));
CREATE OR REPLACE FUNCTION expediente_paciente_nombre(nombrein varchar(20))
RETURNS TABLE(dpi VARCHAR(20), nombre VARCHAR(50), telefono VARCHAR(10), direccion VARCHAR(50), estado VARCHAR(10)) as
$BODY$
begin
   	return query
   	select e.dpi, e.nombre, e.telefono, e.direccion, e.estado
   	from expediente e
   	where e.nombre ilike concat('%', nombrein, '%');
end;
$BODY$
LANGUAGE plpgsql;

drop function expediente_paciente_estado(estadoin varchar(20));
CREATE OR REPLACE FUNCTION expediente_paciente_estado(estadoin varchar(20))
RETURNS TABLE(dpi VARCHAR(20), nombre VARCHAR(50), telefono VARCHAR(10), direccion VARCHAR(50)) as
$BODY$
begin
   	if lower(estadoin) not in (select distinct lower(estado) from expediente) then raise exception 'El estado ingresado no es válido';
  	end if;
   	return query
   	select e.dpi, e.nombre, e.telefono, e.direccion
   	from expediente e
   	where lower(e.estado) = lower(estadoin);
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_paciente_dpi(dpiin varchar(20));
CREATE OR REPLACE FUNCTION historial_paciente_dpi(dpiin varchar(20))
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, h.evolucion, i.nombre institucion
	from historial h natural join institucion i
	where h.dpi = dpiin;
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_fecha(dpiin varchar(20), fecha1in date, fecha2in date);
CREATE OR REPLACE FUNCTION historial_fecha(dpiin varchar(20), fecha1in date, fecha2in date)
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, 
   		h.evolucion, i.nombre institucion
	from historial h natural join institucion i
	where h.dpi = dpiin and h.fechahora_atencion between fecha1in and fecha2in;
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_nombre_institucion(dpiin varchar(20), nominstitucionin varchar(30));
CREATE OR REPLACE FUNCTION historial_nombre_institucion(dpiin varchar(20), nominstitucionin varchar(30))
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, 
   		h.evolucion, i.nombre
	from historial h natural join institucion i
	where h.dpi = dpiin and i.nombre ilike concat('%', nominstitucionin, '%') ;
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_municipio_institucion(dpiin varchar(20), municipioin varchar(100));
CREATE OR REPLACE FUNCTION historial_municipio_institucion(dpiin varchar(20), municipioin varchar(100))
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30), municipio VARCHAR(100)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, 
   		h.evolucion, i.nombre, m.nombre
	from historial h natural join institucion i
		left join municipio m on i.municipio_id = m.municipio_id
	where h.dpi = dpiin and m.nombre ilike concat('%', municipioin, '%') ;
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_departamento_institucion(dpiin varchar(20), departamentoin varchar(100));
CREATE OR REPLACE FUNCTION historial_departamento_institucion(dpiin varchar(20), departamentoin varchar(100))
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30), municipio VARCHAR(100), departamento VARCHAR(50)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, 
   		h.evolucion, i.nombre, m.nombre, d.nombre 
	from historial h natural join institucion i
		left join municipio m on i.municipio_id = m.municipio_id
		left join departamento d on m.departamento_id = d.departamento_id
	where h.dpi = dpiin and d.nombre ilike concat('%', departamentoin, '%');
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_nombre_medico(dpiin varchar(20), nommedicoin varchar(50));
CREATE OR REPLACE FUNCTION historial_nombre_medico(dpiin varchar(20), nommedicoin varchar(50))
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30), no_colegiado_medico VARCHAR(10),
	medico_tratante VARCHAR(50)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, 
   		h.evolucion, i.nombre, m.no_colegiado, u.nombre
	from historial h natural join tratamiento t
		left join medico m on t.medico_tratante = m.no_colegiado
		left join usuario u on m.usuario = u.username
		left join institucion i on h.institucion_id = i.institucion_id
	where h.dpi = dpiin and u.nombre ilike concat('%', nommedicoin, '%');
end;
$BODY$
LANGUAGE plpgsql;

drop function historial_especialidad_medico(dpiin varchar(20), especialidadin varchar(50));
CREATE OR REPLACE FUNCTION historial_especialidad_medico(dpiin varchar(20), especialidadin varchar(50))
RETURNS TABLE(fechahora_atencion TIMESTAMP,	altura FLOAT, peso FLOAT, imc FLOAT, precedentes BOOL,
	resultado VARCHAR(10), evolucion TEXT, institucion VARCHAR(30), no_colegiado_medico VARCHAR(10),
	medico_tratante VARCHAR(50), especialidad VARCHAR(50)) as
$BODY$
begin
   	return query
   	select h.fechahora_atencion, h.altura, h.peso, h.imc, h.precedentes, h.resultado, 
   		h.evolucion, i.nombre, m.no_colegiado, u.nombre, e.nombre
	from historial h natural join tratamiento t
		left join medico m on t.medico_tratante = m.no_colegiado
		left join usuario u on m.usuario = u.username
		left join institucion i on h.institucion_id = i.institucion_id
		left join especialidad e on m.especialidad_id = e.especialidad_id
	where h.dpi = dpiin and e.nombre ilike concat('%', especialidadin, '%');
end;
$BODY$
LANGUAGE plpgsql;

drop function tratamientos_historialid(historialidin int);
CREATE OR REPLACE FUNCTION tratamientos_historialid(historialidin int)
RETURNS TABLE(descripcion TEXT, enfermedad_tratada varchar(30), no_colegiado_medico VARCHAR(10),
	medico_tratante varchar(50)) as
$BODY$
begin
   	return query
   	select t.descripcion, e.nombre, t.medico_tratante, u.nombre 
	from tratamiento t left join enfermedad e on t.enfermedad_tratada = e.enfermedad_id
		left join medico m on t.medico_tratante = m.no_colegiado 
		left join usuario u on m.usuario = u.username 
	where t.historial_id = historialidin;
end;
$BODY$
LANGUAGE plpgsql;

drop function enfermedades_historialid(historialidin int);
CREATE OR REPLACE FUNCTION enfermedades_historialid(historialidin int)
RETURNS TABLE(enfermedad_tratada varchar(30)) as
$BODY$
begin
   	return query
   	select e.nombre
	from historial h natural join enfermedad_padecida ep
		natural join enfermedad e
	where h.historial_id = historialidin;
end;
$BODY$
LANGUAGE plpgsql;

drop function adicciones_historialid(historialidin int);
CREATE OR REPLACE FUNCTION adicciones_historialid(historialidin int)
RETURNS TABLE(adiccion_padecida varchar(30)) as
$BODY$
begin
   	return query
   	select a.sustancia
	from historial h natural join adiccion_padecida ap
		natural join adiccion a
	where h.historial_id = historialidin;
end;
$BODY$
LANGUAGE plpgsql;