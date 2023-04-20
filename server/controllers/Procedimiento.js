import db from '../services/DBConnection.js'

const getProcedimientos = ({ params }, res) => {
  const { tratamiento } = params
  const query = `select tratamiento_id, tipo, nombre from (
    select 'Cirugia' as tipo ,*
      from procedimiento_realizado
      NATURAL JOIN procedimiento
      NATURAL JOIN cirugia
    union all
    select 'Examen' as tipo, *
      from procedimiento_realizado
      NATURAL JOIN procedimiento
      NATURAL JOIN examen
  ) q where tratamiento_id = $1;`
  db.query(query, [tratamiento], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, procedimientos_realizados: result.rows })
  })
}

export {
  getProcedimientos
}