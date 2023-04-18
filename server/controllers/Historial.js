import db from '../services/DBConnection.js'

const getHistorial = ({ params }, res) => {
  const { dpi } = params
  const query = `select dpi, fechahora_atencion, altura, peso, imc, precedentes, nombre as institucion, resultado, evolucion from historial
	NATURAL JOIN institucion
	where dpi = $1;`
  db.query(query, [dpi], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, historiales: result.rows })
  })
}

const searchHistorial = ({ params }, res) => {
  console.log(params)
  const { dpi, search } = params
  const query = `select dpi, fechahora_atencion, altura, peso, imc, precedentes, nombre as institucion, resultado, evolucion from historial
	natural join institucion
	where dpi = $1 and (institucion.nombre ilike '%${search}%'
	or resultado ilike '%${search}%' or evolucion ilike '%${search}%');`

  db.query(query, [dpi], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.json({ ok: true, historiales: result.rows })
    return
  })
}

export {
  getHistorial,
  searchHistorial
}