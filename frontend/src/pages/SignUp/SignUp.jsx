import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { useAuth } from '../../services/Auth'

const SignUp = () => {
  document.getElementById('title').innerHTML = 'Regístrate'
  const [institutions, setInstitutions] = useState([])
  const { setAuthToken } = useAuth()

  const fetchInstitutions = async () => {
    const response = await fetch('http://127.0.0.1:2800/institution')
    const json = await response.json()
    setInstitutions(json.instituciones)
  }

  useEffect(() => {
    fetchInstitutions()
  }, [])

  const signUp = async (event) => {
    event.preventDefault()
    document.getElementById('result').innerHTML = ''
    const {
      username,
      email,
      password,
      confirmPassword,
      institution,
    } = event.target

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Las contraseñas no coinciden')
      confirmPassword.reportValidity()
      return
    }

    confirmPassword.setCustomValidity('')

    const body = {
      username: username.value,
      email: email.value,
      password: password.value,
      role: 0, // Todos los usuarios registrados tienen rol de "manager"
      institution: institution.value,
    }

    const response = await fetch('http://127.0.0.1:2800/user/signUp', {
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
    <div className="signUp-background">
      <div className="signUp-container">
        <form className="signUp" onSubmit={signUp}>
          <div className="logo">
            <img src="/favicon.svg" alt="logo" />
            <h2>Nuevo Usuario</h2>
          </div>
          <input id="username" placeholder="Nombre de usuario" title="" required />
          <input id="email" placeholder="Correo electrónico" type="email" title="" required />
          <input id="password" type="password" placeholder="Contraseña" title="" required />
          <input id="confirmPassword" type="password" placeholder="Repite tu contraseña" title="" required />
          <select id="institution" defaultValue="" title="Selecciona una institución" required>
            <option value="" disabled hidden>Institución a la que pertenece</option>
            {institutions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
          </select>
          <p id="result" />
          <p>
            ¿Ya tienes una cuenta?
            <a href="/log-in"> ¡Inicia sesión aquí!</a>
          </p>
          <div className="submit">
            <button type="submit">Crear usuario</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
