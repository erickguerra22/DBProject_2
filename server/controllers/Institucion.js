import db from '../services/DBConnection.js'

const getInstituciones = (req, res) => {
  const query = `select institucion_id, i.nombre institucion, mun.nombre municipio, d.nombre departamento
	from institucion i
	INNER JOIN municipio mun ON i.municipio_id = mun.municipio_id
	INNER JOIN departamento d ON mun.departamento_id = d.departamento_id;`
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

    res.send({ instituciones: result.rows })
  })
}

const createInstitution = ({ body }, res) => {
  const { nombre, municipio } = body

  const query = 'INSERT INTO institucion VALUES(DEFAULT,$1,$2) RETURNING institucion_id,nombre,municipio_id;'
  db.query(query, [nombre.trim(), municipio.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        res.status(400).send({ ok: false, error: 'El nombre ingresado ya se encuentra registrado.' })
        return
      }
      if (err.code === '23503') {
        res.status(400).send({ ok: false, error: 'El municipio seleccionado no existe.' })
        return
      }
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const inserted = result.rows[0]
    res.json({ ok: true, newInstitution: inserted })
    return
  })
}

const updateInstitucion = ({ body, params }, res) => {
  const { nombre, municipio } = body
  const { institucion } = params
  const query = `UPDATE institucion SET nombre = $1, municipio_id = $2
  WHERE institucion_id = $3 RETURNING institucion_id, nombre, municipio_id;`

  db.query(query, [nombre.trim(), municipio.trim(), institucion.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        res.status(400).send({ ok: false, error: 'El nombre ingresado ya se encuentra registrado.' })
        return
      }
      if (err.code === '23503') {
        res.status(400).send({ ok: false, error: 'El municipio seleccionado no existe.' })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const updated = result.rows[0]
    if (updated === undefined) {
      res.status(404).send({ ok: false, error: 'La institucion indicada no existe.' })
      return
    }
    res.json({ ok: true, updated })
    return
  })
}

export {
  getInstituciones,
  createInstitution,
  updateInstitucion
}