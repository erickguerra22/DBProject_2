import React, { useEffect, useState } from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import server from '../../services/server'

const Profile = ({ randomColor }) => {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const fechaEntrada = new Date(userData.fecha_entrada)
  const [profileActive, setProfileActive] = useState(false)
  const [especialities, setEspecialities] = useState([])

  const fetchEspecialities = async () => {
    const response = await fetch(`${server}/especiality`)
    const json = await response.json()
    setEspecialities(json.especialidades)
  }

  useEffect(() => {
    fetchEspecialities()
  }, [])

  const handleSelect = () => {
    document.getElementById('especiality').style.color = 'black'
  }

  const cancel = () => {
    document.getElementById('nombre').disabled = true
    document.getElementById('phone').disabled = true
    document.getElementById('email').disabled = true
    document.getElementById('nombre').value = document.getElementById('nombre').placeholder
    document.getElementById('phone').value = document.getElementById('phone').placeholder
    if (userData.rol_id === 2) {
      document.getElementById('address').disabled = true
      document.getElementById('especiality').disabled = true
      document.getElementById('address').value = document.getElementById('address').placeholder
      //document.getElementById('especiality')
      document.querySelector('select').selectedIndex = 0
    }
    document.getElementById('editar').style.display = 'inline'
    document.getElementById('cancelar').style.display = 'none'
    document.getElementById('guardar').style.display = 'none'
  }

  const update = async () => {
    document.getElementById('nombre').disabled = true
    document.getElementById('phone').disabled = true
    if (userData.rol_id === 2) {
      document.getElementById('address').disabled = true
      document.getElementById('especiality').disabled = true
    }
    document.getElementById('email').disabled = true
    document.getElementById('editar').style.display = 'inline'
    document.getElementById('cancelar').style.display = 'none'
    document.getElementById('guardar').style.display = 'none'

    const body = {
      email: document.getElementById('email').value,
      pass: userData.pass,
      nombre: document.getElementById('nombre').value,
      telefono: document.getElementById('phone').value,
      rol: userData.rol_id,
      direccion: document.getElementById('address').value,
      especialidad: document.getElementById('especiality').value,
    }

    const response = await fetch(`${server}/user/update/${userData.username}`, {
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
    userData.nombre = responseJSON.userData.nombre
    userData.email = responseJSON.userData.email
    userData.telefono = responseJSON.userData.telefono
    userData.direccion = responseJSON.userData.direccion
    userData.especialidad = document.getElementById(`${document.getElementById('especiality').value}`).innerHTML
    localStorage.setItem('user-data', JSON.stringify(userData))
  }

  const edit = () => {
    document.getElementById('result').innerHTML = ''
    document.getElementById('nombre').disabled = false
    document.getElementById('phone').disabled = false
    document.getElementById('email').disabled = false
    document.getElementById('nombre').placeholder = document.getElementById('nombre').defaultValue
    document.getElementById('phone').placeholder = document.getElementById('phone').defaultValue
    document.getElementById('email').placeholder = document.getElementById('email').defaultValue
    if (userData.rol_id === 2) {
      document.getElementById('address').disabled = false
      document.getElementById('especiality').disabled = false
      document.getElementById('address').placeholder = document.getElementById('address').defaultValue
    }
    document.getElementById('editar').style.display = 'none'
    document.getElementById('cancelar').style.display = 'inline'
    document.getElementById('guardar').style.display = 'inline'
  }

  return (
    <div className="profile">
      <button onClick={(() => setProfileActive((old) => !old))} className="profileBTN" style={{ background: randomColor }}>{userData.nombre[0].toUpperCase()}</button>
      <div className={`profileContent ${profileActive ? 'active' : ''}`}>
        <button className="close" onClick={(() => setProfileActive((old) => !old))} style={{ background: 'none', color: 'black' }}>X</button>
        <div className="profileLogo" style={{ background: `${randomColor}` }}>
          <p>{userData.nombre[0].toUpperCase()}</p>
        </div>
        <p style={{ marginTop: '10px' }}>{userData.rol_id === 2 ? `No. colegiado: ${userData.no_colegiado}` : ''}</p>
        <div className="info">
          <label htmlFor="nombre">
            <input name="nombre" id="nombre" required disabled defaultValue={`${userData.nombre}`} />
            Nombre
          </label>
          <label htmlFor="phone">
            <input name="phone" minLength="8" id="phone" required disabled defaultValue={`${userData.telefono}`} type="number" />
            Número de teléfono
          </label>
          <label htmlFor="email">
            <input name="email" id="email" required disabled defaultValue={`${userData.email}`} type="email" />
            Correo electrónico
          </label>
          {
            userData.rol_id === 2
            && (
              <label htmlFor="address">
                <input name="address" id="address" required disabled defaultValue={`${userData.direccion}`} />
                Direccion
              </label>
            )
          }
          {
            userData.rol_id === 2
            && (
              <label htmlFor="especiality">
                <select name="especiality" id="especiality" disabled defaultValue="" title="Selecciona una especialidad" onChange={handleSelect} required>
                  <option value="" disabled hidden>{userData.especialidad}</option>
                  {// eslint-disable-next-line camelcase
                    especialities.map(({ especialidad_id, nombre }) => <option key={especialidad_id} id={especialidad_id} value={especialidad_id}>{nombre}</option>)
                  }
                </select>
                Especialidad
              </label>

            )
          }
          <label htmlFor="role">
            <input name="role" id="role" disabled value={`${userData.rol}`} />
            Rol
          </label>
          <label htmlFor="institution">
            <input name="institution" id="institution" disabled value={`${userData.institucion}`} />
            Institucion
          </label>
          <label htmlFor="since">
            <input name="since" id="since" disabled value={`${fechaEntrada.getDate()}/${fechaEntrada.getMonth() + 1}/${fechaEntrada.getFullYear()}`} />
            Fecha de inicio
          </label>
        </div>
        <p id="result" />
        <div className="actions">
          <button type="button" onClick={edit} id="editar">Editar</button>
          <button type="button" onClick={cancel} id="cancelar" style={{ display: 'none' }}>Cancelar</button>
          <button type="submit" style={{ display: 'none' }} id="guardar" onClick={update}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  randomColor: PropTypes.string.isRequired,
}

export default Profile
