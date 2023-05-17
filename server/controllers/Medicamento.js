import db from '../services/DBConnection.js'

const getMedicamentos = ({ params }, res) => {
  const { tratamiento } = params
  const query = `select medicamento.nombre medicamento, cantidad
  from medicamento_suministrado
  NATURAL JOIN medicamento where tratamiento_id = $1;`
  db.query(query, [tratamiento], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok: true, medicamentos_suministrados: result.rows })
  })
}

const getAlertas = ({ params }, res) => {
  const { institucion } = params

  const query = `with alerts as (
    select * from bodega where institucion_id = $1 and (fecha_vencimiento>=now() and fecha_vencimiento <= (now() + interval '1 month'))
    union all
    select * from bodega where institucion_id = 1 and cantidad <= (
      select sum(cantidad)*0.15 from bodega where institucion_id = $1
    )	
  )
  select distinct * from (
    select mat.nombre, cantidad, fecha_vencimiento from alerts al
    inner join suministro s ON al.suministro_id = s.suministro_id
    inner join material mat on s.material_id = mat.material_id
  union all
    select med.nombre, cantidad, fecha_vencimiento from alerts al
    inner join suministro s ON al.suministro_id = s.suministro_id
    inner join medicamento med on s.medicamento_id = med.medicamento_id
  ) q;`

  db.query(query, [institucion], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}
export {
  getMedicamentos,
  getAlertas
}