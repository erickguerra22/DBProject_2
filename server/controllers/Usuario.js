import db from '../services/DBConnection.js'
import sha256 from 'sha256'
import generateSessionToken from '../services/jwt.js'

const getUsuarios = (req, res) => {
  db.query('SELECT * FROM "usuario"', (err, result) => {
    if (err) throw err
    res.send({ usuarios: result.rows })
  })
}

const signUp = ({ body }, res) => {
  const { username, email, pass, institucion_id, rol_id } = body

  const passwordEncripted = sha256(pass.trim())
  const query = 'INSERT INTO usuario VALUES(DEFAULT, $1,$2,$3,$4,$5) RETURNING usuario_id,username,email,institucion_id,rol_id'
  db.query(query, [username.trim(), email.trim(), passwordEncripted, institucion_id, rol_id], (err, result) => {
    if (err) {
      if (err.code === '23505') {
        const field = (err.detail.includes('username') ? 'username' : 'email')
        res.status(400).send({ ok: false, error: `El ${field} ingresado ya se encuentra registrado.` })
        return
      }
      console.log(err)
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const insertedUser = result.rows[0]
    const token = generateSessionToken(insertedUser.usuario_id)
    res.json({ ok: true, token, userData: insertedUser })
    return
  })
}

const logIn = ({ body }, res) => {
  const { user, password } = body

  const passwordEncripted = sha256(password.trim())
  const query = 'SELECT * FROM usuario WHERE (username=$1 OR email=$1) AND pass = $2;'

  db.query(query, [user.trim(), passwordEncripted], (err, result) => {
    if (err || result.rows.length === 0) {
      if (result.rows.length === 0) {
        res.status(404).send({ ok: false, error: "No se han encontrado usuarios con las credenciales indicadas" })
        return
      }
      res.status(500).send({ ok: false, error: `Error del servidor: ${err}` })
      return
    }

    const userFound = result.rows[0]
    const token = generateSessionToken(userFound.usuario_id)

    res.send({
      ok: true,
      token,
      userFound
    })
    return
  })
}

export {
  getUsuarios as getUsers,
  signUp,
  logIn
}