import db from '../services/DBConnection.js'

const getAdicciones = ({ params }, res) => {
  const { historial } = params
  const query = `select sustancia
  from adiccion_padecida
  NATURAL JOIN adiccion where historial_id = $1`
  db.query(query, [historial], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, adicciones_padecidas: result.rows })
  })
}

export {
  getAdicciones
}