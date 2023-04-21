import db from '../services/DBConnection.js'

const getEnfermedadesMortales = (req, res) => {

  const query = `select e.nombre, count(distinct h.dpi) muertes_ocasionadas
    from historial h natural join tratamiento t 
        left join enfermedad e on t.enfermedad_tratada = e.enfermedad_id
    where lower(resultado)  = 'muerto'
    group by e.nombre
    order by muertes_ocasionadas desc
    limit 10;`

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

    res.send({ ok: true, enfermedadesMortales: result.rows })
  })
}

const getMedicosMasPacientes = (req, res) => {
  
  const query = `select u.nombre, m.no_colegiado, count(distinct h.dpi) cant_pacientes_atendidos
    from tratamiento t natural join historial h
        left join medico m on t.medico_tratante = m.no_colegiado
        left join usuario u on m.usuario = u.username
    group by u.nombre, m.no_colegiado
    order by cant_pacientes_atendidos desc
    limit 10;`
  
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

    res.send({ ok: true, medicosMasPacientes: result.rows })
})
}

const getPacientesMayorAsistencia = (req, res) => {

  const query = `with t1 as (
	select h.dpi, max(fechahora_atencion) fecha, count(*) asistencias
	from historial h
	group by h.dpi
    )
    select e.nombre, e.dpi, h.altura, h.peso, h.imc, h.precedentes, t1.asistencias
    from t1 left join historial h on t1.dpi = h.dpi and t1.fecha = h.fechahora_atencion
        left join expediente e on t1.dpi = e.dpi
    order by asistencias desc;`

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

    res.send({ ok: true, pacientesMayorAsistencia: result.rows })
  })
}

const getReporteSuministros = ({ params }, res) => {
  const { idinsti, min_medicamentos, min_materiales } = params
  const query = `select * from reporte_suministros(${idinsti}, ${min_medicamentos}, ${min_materiales});`

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

    res.send({ ok: true, reporteSuministros: result.rows })
  })
}

const getInstitucionesMayorAsistencia = (req, res) => {

  const query = `select i.nombre, count(distinct h.dpi) pacientes_atendidos
    from historial h natural join expediente e 
        left join institucion i on h.institucion_id = i.institucion_id
    group by i.nombre
    order by pacientes_atendidos desc
    limit 3;`
  
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

    res.send({ ok: true, institucionesMayorAsistencia: result.rows })
  })
}

export {
  getEnfermedadesMortales,
  getMedicosMasPacientes,
  getPacientesMayorAsistencia,
  getReporteSuministros,
  getInstitucionesMayorAsistencia
}