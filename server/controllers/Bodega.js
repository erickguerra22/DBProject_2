import db from '../services/DBConnection.js'

const getBodega = ({ params }, res) => {
  const { id } = params
  const query = `with bod as (
    select 'medicamento' as tipo, institucion_id, med.nombre, cantidad, fecha_vencimiento
      from bodega b NATURAL JOIN suministro
      NATURAL JOIN medicamento med
    UNION ALL
    select 'material' as tipo, institucion_id, mat.nombre, cantidad, fecha_vencimiento
      from bodega b NATURAL JOIN suministro
      NATURAL JOIN material mat
  )
  SELECT tipo "Tipo", nombre "Nombre", cantidad "Cantidad", fecha_vencimiento "Fecha de vencimiento" FROM bod
    where institucion_id = $1;`
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ result: result.rows })
  })
}

const searchBodega = ({ params }, res) => {
  const { id, search } = params
  const query = `with bod as (
    select 'medicamento' as tipo, institucion_id, med.nombre, cantidad, fecha_vencimiento
      from bodega b NATURAL JOIN suministro
      NATURAL JOIN medicamento med
    UNION ALL
    select 'material' as tipo, institucion_id, mat.nombre, cantidad, fecha_vencimiento
      from bodega b NATURAL JOIN suministro
      NATURAL JOIN material mat
  )
  SELECT tipo "Tipo", nombre "Nombre", cantidad "Cantidad", fecha_vencimiento "Fecha de vencimiento" FROM bod
    where institucion_id = $1 and (nombre ilike '%${search}%' or tipo ilike '%${search}%');`
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ result: result.rows })
  })
}

const updateSuministro = ({ body, params }, res) => {
  const { cantidad } = body
  const { id_i, id_s } = params

  const query = `update bodega b set cantidad = $2
    where b.institucion_id = $1 and b.suministro_id = '${id_s.trim().toUpperCase()}'
    returning b.institucion_id, b.suministro_id, b.cantidad;`

  db.query(query, [id_i, cantidad], (err, result) => {
    if (err) {
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const updated = result.rows[0]

    res.json({ ok: true, updated })
    return
  })
}

const newSuministro = ({ params, body }, res) => {
  const { suministro, cantidad, expiracion } = body
  const { institucion } = params

  const query = `INSERT INTO bodega VALUES($4,$1,$2,$3) RETURNING suministro_id, cantidad, fecha_vencimiento;`

  db.query(query, [suministro, cantidad, expiracion, institucion], (err, result) => {
    if (err) {
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const inserted = result.rows[0]
    res.json({ ok: true, inserted })
    return
  })
}

export {
  getBodega,
  searchBodega,
  updateSuministro,
  newSuministro
}