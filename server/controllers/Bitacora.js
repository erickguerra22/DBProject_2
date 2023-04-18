import db from '../services/DBConnection.js'

const getRegistros = (req, res) => {
  db.query('SELECT * FROM bitacora', (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ registros: result.rows })
  })
}

export {
  getRegistros
}