import db from '../services/DBConnection.js'

const getHistorial = ({ params }, res) => {
  const { dpi } = params
  const query = `select * from historial_paciente_dpi('${dpi}');`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, historiales: result.rows })
  })
}

const searchHistorialByDate = ({ params, body }, res) => {
  console.log(params)
  const { dpi } = params
  const { date1, date2 } = body
  const query = `select * from historial_fecha('${dpi}', '${date1}', '${date2}');`

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

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

const searchHistorialByInstitution = ({ params }, res) => {
  console.log(params)
  const { dpi, institution } = params
  const query = `select * from historial_nombre_institucion('${dpi}', '${institution}');`

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

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

const searchHistorialByMunicipio = ({ params }, res) => {
  console.log(params)
  const { dpi, municipio } = params
  const query = `select * from historial_municipio_institucion('${dpi}', '${municipio}');`

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

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

const searchHistorialByDepartamento = ({ params }, res) => {
  console.log(params)
  const { dpi, departamento } = params
  const query = `select * from historial_departamento_institucion('${dpi}', '${departamento}');`

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

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

const searchHistorialByMedico = ({ params }, res) => {
  console.log(params)
  const { dpi, medico } = params
  const query = `select * from historial_nombre_medico('${dpi}', '${medico}');`

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

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

const searchHistorialByEspMedico = ({ params }, res) => {
  console.log(params)
  const { dpi, espmedico } = params
  const query = `select * from historial_especialidad_medico('${dpi}', '${espmedico}');`

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

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

const newHistorial = ({ params, body }, res) => {
  const { dpi } = params
  const { altura, peso, precedentes, resultado, evolucion, institucion } = body
  const query = `INSERT INTO historial VALUES(DEFAULT, $1, now(), $2, $3, DEFAULT, $4, $5,$6, $7);`

  db.query(query, [dpi, altura, peso, precedentes, resultado, evolucion, institucion], (err, result) => {
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
  getHistorial,
  searchHistorialByDate,
  searchHistorialByInstitution,
  searchHistorialByMunicipio,
  searchHistorialByDepartamento,
  searchHistorialByMedico,
  searchHistorialByEspMedico,
  newHistorial
}