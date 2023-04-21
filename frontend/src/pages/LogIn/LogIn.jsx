import React from 'react'
import './LogIn.css'
// eslint-disable-next-line import/no-cycle
import { navigate } from '../index'
import { useAuth } from '../../services/Auth'
import server from '../../services/server'

const LogIn = () => {
  const randomColor = `rgb(${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))})`
  localStorage.setItem('random-color', randomColor)
  document.getElementById('title').innerHTML = 'Iniciar sesión'
  const { setAuthToken } = useAuth()

  const login = async (event) => {
    event.preventDefault()
    document.getElementById('result').innerHTML = ''

    const body = {
      user: event.target[0].value,
      password: event.target[1].value,
    }

    const response = await fetch(`${server}/user/logIn`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJSON = await response.json()

    if (responseJSON.ok === false) {
      document.getElementById('result').innerHTML = responseJSON.error
      document.getElementById('result').style.color = 'red'
      return
    }
    setAuthToken(responseJSON.token)
    localStorage.setItem('user-data', JSON.stringify(responseJSON.userFound))
  }

  return (
    <div className="logIn-background">
      <form className="logIn" onSubmit={login}>
        <div className="logo">
          <img src="/favicon.svg" alt="logo" />
          <h2>Iniciar Sesión</h2>
        </div>
        <label htmlFor="user">
          <input name="user" id="user" required />
          Nombre de usuario o correo
        </label>
        <label htmlFor="password">
          <input name="password" id="password" type="password" required />
          Contraseña
        </label>
        <p id="result" />
        {/* <Link to="/">¿Has olvidado tu contraseña?</Link>} */}
        <div className="submit">
          <button type="submit">Acceder</button>
          <button onClick={() => navigate('sign-up')} type="button">Registrarse</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn
