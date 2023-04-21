import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './UsuarioDetalle.css'
import server from '../../../services/server'

const UsuarioDetalle = ({ username, onClose }) => {
  const [user, setUser] = useState([])
  console.log(user)
  const [institutions, setInstitutions] = useState([])
  const [roles, setRoles] = useState([])

  const assignInstitucion = async () => {
    const body = {
      institucion: document.getElementById('dInstitution').value,
    }

    const response = await fetch(`${server}/user/institucion/${username}`, {
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
    }
    window.location.reload()
  }

  const cancel = () => {
    document.getElementById('dRole').disabled = true
    document.getElementById('dInstitution').disabled = true
    document.getElementById('dRole').selectedIndex = user.rol_id
    document.getElementById('dInstitution').selectedIndex = user.institucion_id

    document.getElementById('edit').style.display = 'inline'
    document.getElementById('accept').style.display = 'inline'
    document.getElementById('cancel').style.display = 'none'
    document.getElementById('save').style.display = 'none'
  }

  const update = async (event) => {
    event.preventDefault()
    document.getElementById('dRole').disabled = true
    document.getElementById('dInstitution').disabled = true
    document.getElementById('edit').style.display = 'inline'
    document.getElementById('accept').style.display = 'inline'
    document.getElementById('cancel').style.display = 'none'
    document.getElementById('save').style.display = 'none'

    const body = {
      email: user.Email,
      nombre: user.Nombre,
      telefono: user.Telefono,
      rol: document.getElementById('dRole').value,
    }

    const response = await fetch(`${server}/user/update/${username}`, {
      method: 'PUT',
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
    if (user.institucion_id !== document.getElementById('institution').value) assignInstitucion()
  }

  const edit = () => {
    document.getElementById('dRole').disabled = false
    document.getElementById('dInstitution').disabled = false
    document.getElementById('edit').style.display = 'none'
    document.getElementById('accept').style.display = 'none'
    document.getElementById('cancel').style.display = 'inline'
    document.getElementById('save').style.display = 'inline'
  }

  const fetchUser = async () => {
    const response = await fetch(`${server}/user/usuario/${username}`)
    const json = await response.json()
    setUser(json.result[0])
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
    fetchUser()
    fetchRoles()
    fetchInstitutions()
  }, [username])

  if (user === undefined || user.length === 0) return (<div />)

  return (
    <div className="usuario">
      <h1 className="titulo">Detalles de Usuario</h1>
      <form className="info" onSubmit={update}>
        <label htmlFor="username">
          <input name="username" id="dUsername" required disabled defaultValue={`${username}`} />
          Nombre de usuario
        </label>
        <label htmlFor="nombre">
          <input name="nombre" id="dNombre" required disabled defaultValue={`${user.Nombre}`} />
          Nombre
        </label>
        <label htmlFor="phone">
          <input name="phone" minLength="8" id="dPhone" required disabled defaultValue={`${user.Telefono}`} type="number" />
          Número de teléfono
        </label>
        <label htmlFor="email">
          <input name="email" id="dEmail" required disabled defaultValue={`${user.Email}`} type="email" />
          Correo electrónico
        </label>
        <label htmlFor="role">
          <select name="role" id="dRole" disabled defaultValue={`${user.rol_id}`} title="Selecciona un rol" onChange={handleSelect} required>
            <option value={`${user.rol_id}`} disabled hidden>{user.Rol}</option>
            {// eslint-disable-next-line camelcase
              roles.map(({ rol_id, nombre }) => <option key={rol_id} id={rol_id} value={rol_id}>{nombre}</option>)
            }
          </select>
          Rol
        </label>
        <label htmlFor="institution">
          <select name="institution" id="dInstitution" disabled defaultValue={`${user.institucion_id}`} title="Selecciona una institucion" onChange={handleSelect} required>
            <option value={`${user.institucion_id}`} disabled hidden>{user.Institucion}</option>
            {// eslint-disable-next-line camelcase
              institutions.map(({ institucion_id, institucion }) => <option key={institucion_id} id={institucion_id} value={institucion_id}>{institucion}</option>)
            }
          </select>
          Institución
        </label>
        <p id="result" />
        <div className="actions">
          <button type="button" onClick={edit} id="edit">Asignar</button>
          <button type="button" onClick={() => onClose()} className="edit" id="accept">Aceptar</button>
          <button type="button" onClick={cancel} id="cancel" style={{ display: 'none' }}>Cancelar</button>
          <button type="submit" style={{ display: 'none' }} id="save">Guardar</button>
        </div>
      </form>
    </div>
  )
}

UsuarioDetalle.propTypes = {
  username: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default UsuarioDetalle
