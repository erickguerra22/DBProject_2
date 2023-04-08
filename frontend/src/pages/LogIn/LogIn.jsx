import React from 'react'
import './LogIn.css'
// eslint-disable-next-line import/no-cycle
import { navigate } from '../index'
import { useAuth } from '../../services/Auth'

const LogIn = () => {
  document.getElementById('title').innerHTML = 'Iniciar sesión'
  const { setAuthToken } = useAuth()

  const login = async (event) => {
    event.preventDefault()
    document.getElementById('result').innerHTML = ''

    const body = {
      user: event.target[0].value,
      password: event.target[1].value,
    }

    const response = await fetch('http://127.0.0.1:2800/user/logIn', {
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
        <input id="user" required />
        <p>Nombre de usuario o correo</p>
        <input id="password" type="password" required />
        <p>Contraseña</p>
        <p id="result" />
        <a href="/">¿Has olvidado tu contraseña?</a>
        <div className="submit">
          <button type="submit">Acceder</button>
          <button onClick={() => navigate('sign-up')} type="button">Registrarse</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn
