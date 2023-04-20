import db from '../services/DBConnection.js'

const getTratamientos = ({ params }, res) => {
  const { historial } = params
  const query = `select tratamiento_id, descripcion, e.nombre enfermedad_tratada, u.nombre medico_tratante
	from tratamiento tr
	inner join enfermedad e on tr.enfermedad_tratada = e.enfermedad_id
	inner join medico med on tr.medico_tratante = med.no_colegiado
	inner join usuario u on med.usuario = u.username
	where historial_id = $1`
  db.query(query, [historial], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, tratamientos: result.rows })
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
  getTratamientos
}