import db from '../services/DBConnection.js'
import sha256 from 'sha256'
import generateSessionToken from '../services/jwt.js'

const getUsers = (req, res) => {
  db.query('SELECT * FROM "user"', (err, result) => {
    if (err) throw err
    res.send({ usuarios: result.rows })
  })
}

const signUp = ({ body }, res) => {
  const { username, email, password, role, institution } = body

  const passwordEncripted = sha256(password.trim())
  const query = 'INSERT INTO "user" VALUES(DEFAULT,$1,$2,$3,$4,$5) RETURNING id,username,email,role,institution'
  db.query(query, [username.trim(), email.trim(), passwordEncripted, role, institution], (err, result) => {
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
    const token = generateSessionToken(insertedUser.id)
    res.json({ ok: true, token, userData: insertedUser })
    return
  })
}

const logIn = ({ body }, res) => {
  const { user, password } = body

  const passwordEncripted = sha256(password.trim())
  const query = 'SELECT * FROM "user" WHERE (username=$1 OR email=$1) AND "password" = $2;'

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
    const token = generateSessionToken(userFound.id)

    res.send({
      ok: true,
      token,
      userFound
    })
    return
  })
}

export {
  getUsers,
  signUp,
  logIn
}