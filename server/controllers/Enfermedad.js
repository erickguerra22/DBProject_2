import db from '../services/DBConnection.js'

const getEnfermedadesOnHistory = ({ params }, res) => {
  const { id } = params
  const query = `select * from enfermedades_historialid(${id});`
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

    res.send({ ok: true, enfermedades_padecidas: result.rows })
  })
}

const getEnfermedades = (req, res) => {
  db.query('SELECT * FROM enfermedad', (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

export {
  getEnfermedadesOnHistory,
  getEnfermedades
}