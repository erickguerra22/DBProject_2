import React from 'react'
import PropTypes from 'prop-types'
import './NuevoHistorial.css'
import server from '../../../services/server'

const NuevoHistorial = ({ onClose }) => {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const selectedRecord = localStorage.getItem('selected_item')

  const checkThis = (event) => {
    const boxes = document.getElementsByClassName('checkbox')
    // eslint-disable-next-line no-return-assign, no-param-reassign
    Array.prototype.forEach.call(boxes, (box) => box.checked = false)
    // eslint-disable-next-line no-param-reassign
    event.target.checked = true
  }

  const handleSelect = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.style.color = 'black'
  }

  const save = async (event) => {
    event.preventDefault()
    const {
      altura, peso, precedentes, resultado, evolucion,
    } = event.target

    const body = {
      altura: altura.value,
      peso: peso.value,
      precedentes: precedentes.checked,
      resultado: resultado.value,
      evolucion: evolucion.value,
      institucion: userData.institucion_id,
    }

    const response = await fetch(`${server}/history/new/${selectedRecord}`, {
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
    <div className="historial">
      <h1 className="titulo">Nuevo historial médico</h1>
      <form className="info" onSubmit={save}>
        <label htmlFor="altura">
          <input name="altura" id="altura" required type="number" step=".01" />
          Altura del paciente
        </label>
        <label htmlFor="peso">
          <input name="peso" id="peso" required type="number" step=".01" />
          Peso
        </label>
        <label htmlFor="precedentes" style={{ marginTop: '20px' }}>
          ¿Cuenta con precedentes de alguna enfermedad?
          <br />
          <input className="checkbox" name="precedentes" id="precedentes" type="checkbox" onClick={checkThis} />
          Si
          <input className="checkbox" name="precedentes" defaultChecked type="checkbox" onClick={checkThis} />
          No
        </label>
        <label htmlFor="resultado">
          <select name="resultado" id="resultado" defaultValue="" title="" onChange={handleSelect} required>
            <option value="Selecciona el resultado del paciente" disabled hidden>Curado</option>
            <option value="Curado">Curado</option>
            <option value="Enfermo">Enfermo</option>
            <option value="Muerto">Muerto</option>
          </select>
          Resultado del paciente posterior a la visita
        </label>
        <label htmlFor="evolucion" style={{ width: '100%' }}>
          <textarea name="evolucion" id="evolucion" required style={{ width: '100%' }} />
          Evolución observada en el paciente
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

NuevoHistorial.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NuevoHistorial
