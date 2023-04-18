import db from '../services/DBConnection.js'

const getEnfermedades = ({ params }, res) => {
  const { historial } = params
  const query = `select enfermedad.nombre enfermedad
  from enfermedad_padecida
  NATURAL JOIN enfermedad where historial_id = $1`
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

    res.send({ ok: true, enfermedades_padecidas: result.rows })
  })
}

export {
  getEnfermedades
}