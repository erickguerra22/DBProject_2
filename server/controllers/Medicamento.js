import db from '../services/DBConnection.js'

const getMedicamentos = ({ params }, res) => {
  const { tratamiento } = params
  const query = `select medicamento.nombre medicamento, cantidad
  from medicamento_suministrado
  NATURAL JOIN medicamento where tratamiento_id = $1;`
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

    res.send({ ok: true, medicamentos_suministrados: result.rows })
  })
}

export {
  getMedicamentos
}