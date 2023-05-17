import React from 'react'
import PropTypes from 'prop-types'
import './NuevoExpediente.css'
import server from '../../../services/server'

const NuevoExpediente = ({ onClose }) => {
  const save = async (event) => {
    event.preventDefault()
    const {
      newDpi, newNombre, newPhone, newAddress,
    } = event.target

    const body = {
      dpi: newDpi.value,
      nombre: newNombre.value,
      telefono: newPhone.value,
      direccion: newAddress.value,
    }

    const response = await fetch(`${server}/record/new`, {
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
    <div className="expediente">
      <h1 className="titulo">Abrir Nuevo Expediente</h1>
      <form className="info" onSubmit={save}>
        <label htmlFor="newDpi">
          <input name="newDpi" id="newDpi" required />
          Número de DPI o pasaporte
        </label>
        <label htmlFor="newNombre">
          <input name="newNombre" id="newNombre" required />
          Nombre del paciente
        </label>
        <label htmlFor="newPhone">
          <input name="newPhone" id="newPhone" required />
          Número de Teléfono
        </label>
        <label htmlFor="newAddress">
          <input name="newAddress" id="newAddress" required />
          Dirección
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

NuevoExpediente.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NuevoExpediente
