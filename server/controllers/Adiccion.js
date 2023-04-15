import db from '../services/DBConnection.js'

const getAdicciones = (req, res) => {
  db.query('SELECT * FROM adiccion', (err, result) => {
    if (err) throw err
    res.send({ adicciones: result.rows })
  })
}

export {
  getAdicciones
}