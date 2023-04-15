import db from '../services/DBConnection.js'

const getInstituciones = (req, res) => {
  db.query('SELECT * FROM institucion', (err, result) => {
    if (err) throw err
    res.send({ instituciones: result.rows })
  })
}

export {
  getInstituciones as getInstitutions
}