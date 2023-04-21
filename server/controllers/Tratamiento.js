import db from '../services/DBConnection.js'

const getTratamientos = ({ params }, res) => {
  const { id } = params
  const query = `select tratamiento_id "ID", descripcion "Descripción", enfermedad_tratada "Enfermedad tratada",
  medico_tratante "Medico tratante", especialidad "Especialidad" from tratamientos_historialid(${id});`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

const getTratamiento = ({ params }, res) => {
  const { tratamiento_id } = params
  const query = `select tratamiento_id, descripcion, en.nombre "enfermedad", u.nombre "medico_tratante", es.nombre "especialidad" from tratamiento tr 
	inner join enfermedad en on tr.enfermedad_tratada = en.enfermedad_id
	inner join medico med on tr.medico_tratante = med.no_colegiado
	inner join usuario u on med.usuario = u.username
	inner join especialidad es on med.especialidad_id = es.especialidad_id
	where tratamiento_id = $1`

  db.query(query, [tratamiento_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

const getProcedimientosRealizados = ({ params }, res) => {
  const { tratamiento_id } = params
  const query = `select nombre examenes from (
    select tr.tratamiento_id, cir.nombre from procedimiento_realizado pr inner join tratamiento tr on pr.tratamiento_id = tr.tratamiento_id
    inner join procedimiento pro on pr.procedimiento_id = pro.procedimiento_id
    inner join cirugia cir on pro.cirugia_id = cir.cirugia_id
  union all	
  select tr.tratamiento_id, exa.nombre from procedimiento_realizado pr inner join tratamiento tr on pr.tratamiento_id = tr.tratamiento_id
    inner join procedimiento pro on pr.procedimiento_id = pro.procedimiento_id
    inner join examen exa on pro.examen_id = exa.examen_id
  )q where tratamiento_id = $1`

  db.query(query, [tratamiento_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

const getMedicamentosSuministrados = ({ params }, res) => {
  const { tratamiento_id } = params
  if (params === undefined) return
  const query = `select nombre medicamentos, cantidad from medicamento_suministrado ms
	inner join medicamento med on ms.medicamento_id = med.medicamento_id
	where ms.tratamiento_id = $1`

  db.query(query, [tratamiento_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

const searchTratamiento = ({ params }, res) => {
  const { id, search } = params
  const query = `select tratamiento_id "ID", descripcion "Descripción", enfermedad_tratada "Enfermedad tratada",
  medico_tratante "Medico tratante", especialidad "Especialidad" from tratamientos_historialid(${id})
  where enfermedad_tratada ilike '%${search}%' or descripcion ilike '%${search}%' or medico_tratante ilike '%${search}%'
  or especialidad ilike '%${search}%';`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

const newTratamiento = ({ params, body }, res) => {
  const { historial } = params
  const { descripcion, enfermedad, medico } = body
  const query = `INSERT INTO tratamiento VALUES(DEFAULT, $1, $2, $3, $4);`

  db.query(query, [historial, descripcion, enfermedad, medico], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.json({ ok: true })
    return
  })
}

export {
  getTratamientos,
  getTratamiento,
  getProcedimientosRealizados,
  getMedicamentosSuministrados,
  searchTratamiento,
  newTratamiento
}