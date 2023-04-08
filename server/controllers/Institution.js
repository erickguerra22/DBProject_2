import db from '../services/DBConnection.js'

const getInstitutions = (req, res) => {
  db.query('SELECT * FROM institution', (err, result) => {
    if (err) throw err
    res.send({ instituciones: result.rows })
  })
}

export {
  getInstitutions
}