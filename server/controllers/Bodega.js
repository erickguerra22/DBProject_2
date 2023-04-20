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
  SELECT tipo, nombre, cantidad, fecha_vencimiento FROM bod
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

    res.send({ bodega: result.rows })
  })
}

export {
  getBodega
}