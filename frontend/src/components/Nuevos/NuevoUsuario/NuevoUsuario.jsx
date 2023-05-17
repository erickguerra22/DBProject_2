import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './NuevoUsuario.css'
import server from '../../../services/server'

const NuevoUsuario = ({ onClose }) => {
  const [institutions, setInstitutions] = useState([])
  const [roles, setRoles] = useState([])

  const validatePassword = () => {
    const password = document.getElementById('newPass')
    const confirmPassword = document.getElementById('confNewPass')

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Las contraseñas no coinciden')
      return
    }
    confirmPassword.setCustomValidity('')
  }

  const save = async (event) => {
    event.preventDefault()
    const {
      newUser, newNombre, newPass, newPhone, newEmail, newRole, newInstitution,
    } = event.target

    const body = {
      username: newUser.value,
      email: newEmail.value,
      pass: newPass.value,
      rol_id: newRole.value,
      nombre: newNombre.value,
      telefono: newPhone.value,
      institucion_id: newInstitution.value,
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
      document.getElementById('newResult').innerHTML = responseJSON.error
      document.getElementById('newResult').style.color = 'red'
      return
    }
    window.location.reload()
  }

  const fetchRoles = async () => {
    const response = await fetch(`${server}/role`)
    const json = await response.json()
    setRoles(json.roles)
  }

  const fetchInstitutions = async () => {
    const response = await fetch(`${server}/institution`)
    const json = await response.json()
    setInstitutions(json.instituciones)
  }

  const handleSelect = () => {
    document.getElementById('role').style.color = 'black'
  }

  useEffect(() => {
    fetchRoles()
    fetchInstitutions()
  }, [])

  return (
    <div className="usuario">
      <h1 className="titulo">Nuevo Usuario</h1>
      <form className="info" onSubmit={save}>
        <label htmlFor="username">
          <input name="username" id="newUser" required />
          Nombre de usuario
        </label>
        <label htmlFor="nombre">
          <input name="nombre" id="newNombre" required />
          Nombre
        </label>
        <label htmlFor="pass">
          <input name="pass" id="newPass" required type="password" />
          Contraseña
        </label>
        <label htmlFor="confPass">
          <input name="confPass" id="confNewPass" required type="password" onChange={validatePassword} />
          Confirmar contraseña
        </label>
        <label htmlFor="phone">
          <input name="phone" minLength="8" id="newPhone" required type="number" />
          Número de teléfono
        </label>
        <label htmlFor="email">
          <input name="email" id="newEmail" required type="email" />
          Correo electrónico
        </label>
        <label htmlFor="role">
          <select name="role" id="newRole" defaultValue="" title="Selecciona un rol" onChange={handleSelect} required>
            <option value="" disabled hidden>Selecciona un rol</option>
            {// eslint-disable-next-line camelcase
              roles.map(({ rol_id, nombre }) => <option key={rol_id} id={rol_id} value={rol_id}>{nombre}</option>)
            }
          </select>
          Rol
        </label>
        <label htmlFor="institution">
          <select name="institution" id="newInstitution" defaultValue="" title="Selecciona una institucion" onChange={handleSelect} required>
            <option value="" disabled hidden>Institucion a la que pertenece</option>
            {// eslint-disable-next-line camelcase
              institutions.map(({ institucion_id, institucion }) => <option key={institucion_id} id={institucion_id} value={institucion_id}>{institucion}</option>)
            }
          </select>
          Institución
        </label>
        <p id="newResult" style={{ textAlign: 'center', fontSize: '13px' }} />
        <div className="actions">
          <button type="button" onClick={() => onClose()} className="edit" id="abort">Cancelar</button>
          <button type="submit" id="saveNew">Guardar</button>
        </div>
      </form>
    </div>
  )
}

NuevoUsuario.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NuevoUsuario
