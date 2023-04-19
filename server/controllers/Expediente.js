import db from '../services/DBConnection.js'

const getExpedientes = (req, res) => {
  db.query('SELECT * FROM expediente', (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ expedientes: result.rows })
  })
}

const newExpediente = ({ body }, res) => {
  const { dpi, nombre, telefono, direccion } = body

  const query = 'INSERT INTO expediente VALUES($1,$2,$3,$4,DEFAULT) RETURNING dpi,nombre,telefono,direccion,estado;'
  db.query(query, [dpi.trim(), nombre.trim(), telefono.trim(), direccion.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        const field = (err.detail.includes('dpi') ? 'dpi' : 'telefono')
        res.status(400).send({ ok: false, error: `El ${field} ingresado ya se encuentra registrado.` })
        return
      }
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const inserted = result.rows[0]
    res.json({ ok: true, inserted })
    return
  })
}

const updateExpediente = ({ body, params }, res) => {
  const { nombre, telefono, direccion } = body
  const { dpi } = params

  const query = `UPDATE expediente SET nombre = $1, telefono = $2, direccion = $3
  WHERE dpi = $4 RETURNING dpi,nombre,telefono, direccion, estado;`

  db.query(query, [nombre.trim(), telefono.trim(), direccion.trim(), dpi.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        res.status(400).send({ ok: false, error: 'El telefono ingresado ya se encuentra registrado.' })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const updated = result.rows[0]
    if (updated === undefined) {
      res.status(404).send({ ok: false, error: 'El dpi indicado no existe.' })
      return
    }
    res.json({ ok: true, updated })
    return
  })
}

const searchExpediente = ({ params }, res) => {
  const { search } = params
  const query = `select * from expediente
  where nombre ilike '%${search}%' or dpi ilike '%${search}%' or estado ilike '%${search}%'`

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

    res.json({ ok: true, registros: result.rows })
    return
  })
}

const removeExpediente = ({ params }, res) => {
  const { dpi } = params
  const query = 'delete from expediente where dpi = $1 RETURNING dpi, nombre, telefono, direccion, estado'

  db.query(query, [dpi], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const deleted = result.rows[0]
    if (deleted === undefined) {
      res.status(404).send({ ok: false, error: 'El dpi indicado no existe.' })
      return
    }
    res.json({ ok: true, deleted })
    return    
  })
}

export {
  getExpedientes,
  newExpediente,
  updateExpediente,
  searchExpediente,
  removeExpediente
}