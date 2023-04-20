import db from '../services/DBConnection.js'

const getMunicipios = ({ params }, res) => {
  const { departamento } = params

  db.query('SELECT * FROM municipio where departamento_id = $1', [departamento], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ municipios: result.rows })
  })
}

export {
  getMunicipios
}