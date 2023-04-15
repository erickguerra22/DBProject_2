import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { useAuth } from '../../services/Auth'
import server from '../../services/server'

const SignUp = () => {
  document.getElementById('title').innerHTML = 'Regístrate'
  const [institutions, setInstitutions] = useState([])
  const { setAuthToken } = useAuth()

  const fetchInstitutions = async () => {
    const response = await fetch(`${server}/institution`)
    const json = await response.json()
    setInstitutions(json.instituciones)
  }

  useEffect(() => {
    fetchInstitutions()
  }, [])

  const validatePassword = () => {
    const password = document.getElementById('password')
    const confirmPassword = document.getElementById('confirmPassword')

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Las contraseñas no coinciden')
      return
    }
    confirmPassword.setCustomValidity('')
  }

  const handleSelect = () => {
    document.getElementById('institution').style.color = 'black'
  }

  const signUp = async (event) => {
    event.preventDefault()
    document.getElementById('result').innerHTML = ''

    const {
      username,
      email,
      password,
      institution,
    } = event.target

    const body = {
      username: username.value,
      email: email.value,
      pass: password.value,
      rol_id: 0, // Todos los usuarios registrados tienen rol de "manager"
      institucion_id: institution.value,
    }

    const response = await fetch(`${server}/user/signUp`, {
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
    localStorage.setItem('user-data', JSON.stringify(responseJSON.userData))
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
          <input id="confirmPassword" type="password" placeholder="Confirma tu contraseña" title="" onChange={validatePassword} required />
          <select id="institution" defaultValue="" title="Selecciona una institución" onChange={handleSelect} required>
            <option value="" disabled hidden>Institución a la que pertenece</option>
            {// eslint-disable-next-line camelcase
              institutions.map(({ institucion_id, nombre }) => <option key={institucion_id} value={institucion_id}>{nombre}</option>)
            }
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
