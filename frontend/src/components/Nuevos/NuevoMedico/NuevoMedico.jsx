import React, { useEffect, useState } from 'react'
import './NuevoMedico.css'
import server from '../../../services/server'

const NuevoMedico = () => {
  const [especialidades, setEspecialidades] = useState([])

  const save = async (event) => {
    const userData = JSON.parse(localStorage.getItem('user-data'))
    event.preventDefault()
    const {
      colegiado, direccion, especialidad,
    } = event.target

    const body = {
      no_colegiado: colegiado.value,
      direccion: direccion.value,
      especialidad: especialidad.value,
      usuario: userData.username,
    }

    const response = await fetch(`${server}/doctor/new`, {
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
    userData.direccion = responseJSON.medico.direccion
    userData.no_colegiado = responseJSON.medico.no_colegiado
    userData.especialidad = document.getElementById(especialidad.value).innerHTML
    userData.especialidad_id = responseJSON.medico.especialidad_id
    localStorage.setItem('user-data', JSON.stringify(userData))
    window.location.reload()
  }

  const fetchEspecialidades = async () => {
    const response = await fetch(`${server}/especiality`)
    const json = await response.json()
    setEspecialidades(json.especialidades)
  }

  const handleSelect = () => {
    document.getElementById('role').style.color = 'black'
  }

  useEffect(() => {
    fetchEspecialidades()
  }, [])

  return (
    <div className="medico">
      <h1 className="titulo">Actualizar información</h1>
      <form className="info" onSubmit={save}>
        <label htmlFor="colegiado">
          <input name="colegiado" id="colegiado" required type="number" />
          Número de colegiado
        </label>
        <label htmlFor="direccion">
          <input name="direccion" id="direccion" required />
          Dirección
        </label>
        <label htmlFor="especialidad">
          <select name="especialidad" id="especialidad" defaultValue="" title="Selecciona una especialidad" onChange={handleSelect} required>
            <option value="" disabled hidden>Selecciona una especialidad</option>
            {// eslint-disable-next-line camelcase
              especialidades.map(({ especialidad_id, nombre }) => <option key={especialidad_id} id={especialidad_id} value={especialidad_id}>{nombre}</option>)
            }
          </select>
          Especialidad
        </label>
        <p id="newResult" style={{ textAlign: 'center', fontSize: '13px' }} />
        <div className="actions">
          <button type="submit" id="saveNew">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default NuevoMedico
