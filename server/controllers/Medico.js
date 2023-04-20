import db from '../services/DBConnection.js'
import { updateUsuario } from './Usuario.js'

const getMedicos = (req,res) =>{

  const query = `select no_colegiado, u.nombre, email, telefono, direccion, e.nombre especialidad
	from medico med
	inner join usuario u on med.usuario = u.username
	inner join especialidad e ON med.especialidad_id = e.especialidad_id;`

  db.query(query, (err,result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    if (result.rows.length === 0) {
      res.status(404).send({ ok: false, error: 'No se han encontrado resultados.' })
      return
    }

    res.send({ ok:true, usuarios: result.rows })
  })
}

const newMedico = ({body}, res) => {
  const {no_colegiado, direccion, especialidad, usuario} = body
  const query = 'INSERT INTO medico VALUES($1, $2, $3, $4) RETURNING no_colegiado, direccion, especialidad_id, usuario;'

  db.query(query, [no_colegiado, direccion, especialidad, usuario], (err, result) => {
    if (err) {

      if (err.code === '23503') {
        const field = (err.detail.includes('especialidad') ? 'especialidad' : 'usuario')
        res.status(400).send({ ok: false, error: `El valor ingresado para ${field} no existe en la base de datos.` })
        return
      }
      if (err.code === '23505'){
        const field = (err.detail.includes('usuario') ? 'usuario' : 'no_colegiado')
        res.status(400).send({ ok: false, error: `El ${field} ingresado ya se encuentra registrado.` })
        return
      }

      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const inserted = result.rows[0]
    res.json({ ok: true, medico: inserted })
    return
  })
}

const updateMedico = ({ body, params }, res) => {
  const { direccion, especialidad, usuario } = body
  const { no_colegiado } = params

  const query = `UPDATE medico SET direccion = $1, especialidad_id = $2, usuario = $3
  WHERE no_colegiado = $4 RETURNING no_colegiado,direccion,especialidad_id, usuario;`

  db.query(query, [direccion.trim(), especialidad.trim(), usuario.trim(), no_colegiado.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        res.status(400).send({ ok: false, error: 'El usuario ingresado ya se encuentra registrado.' })
        return
      }

      if (err.code === '23503') {
        res.status(400).send({ ok: false, error: 'La especialidad seleccionada no existe.' })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const updated = result.rows[0]
    if (updated === undefined) {
      res.status(404).send({ ok: false, error: 'El numero de colegiado indicado no existe.' })
      return
    }
    res.json({ ok: true, updated })
    return
  })
}

export {
  newMedico,
  getMedicos,
  updateMedico
}