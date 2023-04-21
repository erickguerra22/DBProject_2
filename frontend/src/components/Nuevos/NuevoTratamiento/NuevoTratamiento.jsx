import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './NuevoTratamiento.css'
import server from '../../../services/server'

const NuevoTratamiento = ({ onClose }) => {
  const [enfermedades, setEnfermedades] = useState([])
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const selectedRecord = localStorage.getItem('selected_item')

  const fetchEnfermedades = async () => {
    const response = await fetch(`${server}/disease`)
    const json = await response.json()
    setEnfermedades(json.result)
  }

  useEffect(() => {
    fetchEnfermedades()
  }, [])

  const handleSelect = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.style.color = 'black'
  }

  const save = async (event) => {
    event.preventDefault()
    const {
      descripcion, enfermedad,
    } = event.target

    const body = {
      descripcion: descripcion.value,
      enfermedad: enfermedad.value,
      medico: userData.no_colegiado,
    }

    const response = await fetch(`${server}/treatment/new/${selectedRecord}`, {
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

  return (
    <div className="tratamiento">
      <h1 className="titulo">Nuevo tratamiento</h1>
      <form className="info" onSubmit={save}>
        <label htmlFor="descripcion" style={{ width: '100%' }}>
          <textarea name="descripcion" id="descripcion" required style={{ width: '100%' }} />
          Descripción general del tratamiento realizado
        </label>
        <label htmlFor="enfermedad">
          <select name="enfermedad" id="enfermedad" defaultValue="" title="Selecciona una enfermedad" onChange={handleSelect} required>
            <option value="" disabled hidden>Selecciona una enfermedad</option>
            {// eslint-disable-next-line camelcase
              enfermedades.map(({ enfermedad_id, nombre }) => <option key={enfermedad_id} id={enfermedad_id} value={enfermedad_id}>{nombre}</option>)
            }
          </select>
          Rol
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

NuevoTratamiento.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NuevoTratamiento
