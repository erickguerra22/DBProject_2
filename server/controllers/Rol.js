import db from '../services/DBConnection.js'

const getRoles = (req, res) => {
  db.query('SELECT * FROM rol;', (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ roles: result.rows })
  })
}

const createRole = ({ body }, res) => {
  const { rol } = body

  db.query('INSERT INTO rol VALUES(DEFAULT, $1);', [rol], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const inserted = result.rows[0]
    res.json({ ok: true, newRol: inserted })
    return
  })
}

export {
  getRoles,
  createRole
}