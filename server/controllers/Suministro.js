import db from '../services/DBConnection.js'

const getSuministros = (req, res) => {
  const query = `select suministro_id, nombre from (
    select * from suministro s inner join medicamento med ON s.medicamento_id = med.medicamento_id
    union all
    select * from suministro s inner join material mat ON s.material_id = mat.material_id
  ) q`
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    res.send({ ok: true, result: result.rows })
  })
}

export {
  getSuministros
}