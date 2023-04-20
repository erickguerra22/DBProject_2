import db from '../services/DBConnection.js'

const getBodega = ({ params }, res) => {
  const {id} = params
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
  db.query(query,[id], (err, result) => {
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
  const {id,search} = params
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
  db.query(query,[id], (err, result) => {
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

export {
  getBodega,
  searchBodega
}