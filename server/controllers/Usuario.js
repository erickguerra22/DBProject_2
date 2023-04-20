import db from '../services/DBConnection.js'
import sha256 from 'sha256'
import generateSessionToken from '../services/jwt.js'

const getUsuarios = (req, res) => {
  const query = `select username, email, u.nombre nombre, u.telefono telefono, i.nombre institucion, fecha_entrada, r.nombre rol
	from asignacion asig
	RIGHT JOIN usuario u ON u.username = asig.usuario
	left JOIN institucion i ON asig.institucion = i.institucion_id
	left JOIN rol r ON u.rol_id = r.rol_id;`

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

    res.send({ ok: true, usuarios: result.rows })
  })
}

const signUp = ({ body }, res) => {
  const { username, email, pass, rol_id, nombre, telefono, institucion_id } = body

  const passwordEncripted = sha256(pass.trim())
  const query = 'INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6) RETURNING username,email,rol_id, nombre, telefono;'
  db.query(query, [username.trim(), email.trim(), passwordEncripted, rol_id, nombre.trim(), telefono.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        const field = (err.detail.includes('username') ? 'username' : err.detail.includes('telefono') ? 'telefono' : 'email')
        res.status(400).send({ ok: false, error: `El ${field} ingresado ya se encuentra registrado.` })
        return
      }
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    db.query('INSERT INTO asignacion VALUES($1, $2, DEFAULT, DEFAULT);', [username, institucion_id], (err, resultAsig) => {
      if (err) {
        console.log(err)
        res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
        return
      }
      const insertedUser = result.rows[0]
      const token = generateSessionToken(insertedUser.usuario_id)
      res.json({ ok: true, token, userData: insertedUser })
      return
    })
  })
}

const logIn = ({ body }, res) => {
  const { user, password } = body

  const passwordEncripted = sha256(password.trim())
  const query = `SELECT username, email, usuario.nombre nombre, telefono, rol.nombre rol, institucion.nombre institucion,
	rol.rol_id, institucion.institucion_id, fecha_entrada, direccion, no_colegiado, especialidad.nombre especialidad
	FROM usuario
	INNER JOIN rol ON rol.rol_id = usuario.rol_id
	INNER JOIN asignacion ON asignacion.usuario = usuario.username
	INNER JOIN institucion ON asignacion.institucion = institucion.institucion_id
	LEFT JOIN medico ON usuario.username = medico.usuario
	LEFT JOIN especialidad ON especialidad.especialidad_id = medico.especialidad_id
	WHERE (username=$1 OR email=$1)
	AND pass = $2;`

  db.query(query, [user.trim(), passwordEncripted], (err, result) => {
    if (err || result.rows.length === 0) {
      if (result.rows.length === 0) {
        res.status(404).send({ ok: false, error: "No se han encontrado usuarios con las credenciales indicadas" })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    db.query('SET myvar.app_user = $1', [user.trim()], (err, result2) => {
      if (result) {
        const userFound = result.rows[0]
        const token = generateSessionToken(userFound.username)

        res.send({
          ok: true,
          token,
          userFound
        })
        return
      }
    })
  })
}

const updateUsuario = ({ body, params }, res) => {
  const { email, nombre, telefono, rol, direccion, especialidad } = body
  const { username } = params
  const fields = [email.trim(), nombre.trim(), telefono.trim(), rol, username.trim()]

  const query = `UPDATE usuario SET email = $1, nombre = $2, telefono = $3, rol_id = $4
  WHERE username = $5 RETURNING username,email,rol_id, nombre, telefono;`

  db.query(query, fields, (err, result) => {
    if (err) {
      if (err.code === '23505') {
        const field = (err.detail.includes('telefono') ? 'telefono' : 'email')
        res.status(400).send({ ok: false, error: `El ${field} ingresado ya se encuentra registrado.` })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }
    const updatedUser = result.rows[0]

    if (direccion !== undefined || especialidad !== undefined) {
      const newQuery = 'UPDATE medico SET direccion = $1, especialidad_id = $2 WHERE usuario = $3 RETURNING direccion;'

      db.query(newQuery, [direccion.trim(), especialidad, username.trim()], (err, newResult) => {
        if (err) {
          res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
          return
        }
        if (newResult.rows[0] !== undefined)
          updatedUser.direccion = newResult.rows[0].direccion
        if (updatedUser === undefined) {
          res.status(404).send({ ok: false, error: 'El username indicado no existe.' })
          return
        }
        res.json({ ok: true, userData: updatedUser })
        return
      })
    }
    if (direccion !== undefined) return
    if (updatedUser === undefined) {
      res.status(404).send({ ok: false, error: 'El username indicado no existe.' })
      return
    }
    res.json({ ok: true, userData: updatedUser })
    return
  })
}

const createUser = ({ body }, res) => {
  const { username, email, pass, rol_id, nombre, telefono } = body

  const passwordEncripted = sha256(pass.trim())
  const query = 'INSERT INTO usuario VALUES($1,$2,$3,$4,$5,$6) RETURNING username,email,rol_id,nombre,telefono;'
  db.query(query, [username.trim(), email.trim(), passwordEncripted, rol_id.trim(), nombre.trim(), telefono.trim()], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        const field = (err.detail.includes('username') ? 'username' : err.detail.includes('telefono') ? 'telefono' : 'email')
        res.status(400).send({ ok: false, error: `El ${field} ingresado ya se encuentra registrado.` })
        return
      }
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const insertedUser = result.rows[0]
    res.json({ ok: true, userData: insertedUser })
    return
  })
}

const searchUser = ({ params }, res) => {
  const { search } = params
  const query = `select username, email, u.nombre nombre, u.telefono telefono, i.nombre institucion, fecha_entrada, r.nombre rol from asignacion asig
	natural join usuario u
	INNER JOIN institucion i ON asig.institucion = i.institucion_id
	INNER JOIN rol r ON u.rol_id = r.rol_id
	where u.nombre ilike '%${search.trim()}%' or i.nombre ilike '%${search.trim()}%'
  or u.username ilike '%${search.trim()}%' or r.nombre ilike '%${search.trim()}%';`

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

    res.json({ ok: true, usuarios: result.rows })
    return
  })
}

const assignInstitucion = ({ body, params }, res) => {
  const { institucion } = body
  const { username } = params
  const query = 'INSERT INTO asignacion VALUES($2,$1,DEFAULT,DEFAULT) RETURNING usuario, institucion, fecha_entrada, fecha_salida;'

  db.query(query, [institucion.trim(), username.trim()], (err, result) => {
    if (err) {
      if (err.code === '23503') {
        const field = (err.detail.includes('usuario') ? 'usuario' : 'institucion')
        res.status(400).send({ ok: false, error: `El valor de ${field} ingresado no existe en la base de datos.` })
        return
      }
      if (err.code === '23505') {
        res.status(400).send({ ok: false, error: `El usuario ${username} ya a sido asignado a la institución indicada el día de hoy.` })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const inserted = result.rows[0]
    res.json({ ok: true, result: inserted })
    return
  })
}

export {
  getUsuarios,
  signUp,
  logIn,
  updateUsuario,
  createUser,
  searchUser,
  assignInstitucion
}