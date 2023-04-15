import db from '../services/DBConnection.js'

const getExpedientes = (req, res) => {
  db.query('SELECT * FROM expediente', (err, result) => {
    if (err) throw err
    res.send({ expedientes: result.rows })
  })
}

export {
  getExpedientes
}