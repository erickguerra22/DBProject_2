import db from '../services/DBConnection.js'

const getRegistros = (req, res) => {
  db.query('SELECT bitacora_id "Id", fechahora "Fecha y hora", usuario "Usuario", tabla "Tabla", accion "Acción", descripcion "Descripción" FROM bitacora order by fechahora', (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ result: result.rows })
  })
}

const searchRegistros = ({params}, res) => {
  const {search} = params
  const query = `SELECT bitacora_id "Id", fechahora "Fecha y hora", usuario "Usuario", tabla "Tabla", accion "Acción", descripcion "Descripción"
  FROM bitacora where 
  usuario ilike '%${search}%' or tabla ilike '%${search}%' or accion ilike '%${search}%' or descripcion ilike '%${search}%'
  order by fechahora;`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ result: result.rows })
  })
}

export {
  getRegistros,
  searchRegistros
}