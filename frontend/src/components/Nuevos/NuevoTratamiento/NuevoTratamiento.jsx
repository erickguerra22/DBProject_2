import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './NuevoTratamiento.css'
import server from '../../../services/server'

const NuevoTratamiento = ({ onClose }) => {
  const [enfermedades, setEnfermedades] = useState([])
  const [adicciones, setAdicciones] = useState([])
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const selectedRecord = localStorage.getItem('selected_item')
  const [slide, setSlide] = useState(1)

  const addSlide = (quantity) => {
    // eslint-disable-next-line no-nested-ternary
    const validate = (slide === 3 && quantity === 1) ? -2 : (slide === 1 && quantity === -1) ? 2 : quantity
    setSlide((old) => old + validate)
  }

  const fetchEnfermedades = async () => {
    const response = await fetch(`${server}/disease`)
    const json = await response.json()
    setEnfermedades(json.result)
  }

  const fetchAdicciones = async () => {
    const response = await fetch(`${server}/addiction`)
    const json = await response.json()
    setAdicciones(json.result)
  }

  useEffect(() => {
    fetchEnfermedades()
    fetchAdicciones()
  }, [])

  const handleSelect = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.style.color = 'black'
  }

  const saveDisease = async (event) => {
    event.preventDefault()
    const { disease } = event.target
    const body = {
      enfermedad: disease.value,
    }

    const response = await fetch(`${server}/history/disease/new/${selectedRecord}`, {
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

  const saveAdiction = async (event) => {
    event.preventDefault()
    const { addiction } = event.target
    const body = {
      sustancia: addiction.value,
    }

    const response = await fetch(`${server}/history/addiction/new/${selectedRecord}`, {
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

  const saveTreatment = async (event) => {
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
    <div className="slideContainer">
      <div className="controllers">
        <button onClick={() => addSlide(-1)} className="slideChanger" id="back">{'<'}</button>
        <button onClick={() => addSlide(+1)} className="slideChanger" id="forward">{'>'}</button>
      </div>

      <div className="slideCard" style={{ display: `${slide === 1 ? 'block' : 'none'}` }}>
        <h1 className="titulo">Nuevo tratamiento</h1>
        <form className="info" onSubmit={saveTreatment}>
          <label htmlFor="descripcion" style={{ width: '100%' }}>
            <textarea name="descripcion" id="descripcion" required style={{ width: '100%' }} />
            Descripción general del tratamiento realizado
          </label>
          <label htmlFor="enfermedad" style={{ width: '100%' }}>
            <select name="enfermedad" id="enfermedad" defaultValue="" title="Selecciona una enfermedad" onChange={handleSelect} required>
              <option value="" disabled hidden>Selecciona una enfermedad</option>
              {// eslint-disable-next-line camelcase
                enfermedades.map(({ enfermedad_id, nombre }) => <option key={enfermedad_id} id={enfermedad_id} value={enfermedad_id}>{nombre}</option>)
              }
            </select>
            Enfermedad que se tratará
          </label>
          <p id="newResult" style={{ textAlign: 'center', fontSize: '13px' }} />
          <div className="actions">
            <button type="button" onClick={() => onClose()} className="edit" id="abort">Cancelar</button>
            <button type="submit" id="saveNew">Guardar</button>
          </div>
        </form>
      </div>
      <div className="slideCard" style={{ display: `${slide === 2 ? 'block' : 'none'}` }}>
        <h1 className="titulo">Añadir enfermedad padecida</h1>
        <form className="info" onSubmit={saveDisease}>
          <label htmlFor="disease" style={{ width: '100%' }}>
            <select name="disease" id="disease" defaultValue="" title="Selecciona una enfermedad" onChange={handleSelect} required>
              <option value="" disabled hidden>Selecciona una enfermedad</option>
              {// eslint-disable-next-line camelcase
                enfermedades.map(({ enfermedad_id, nombre }) => <option key={enfermedad_id} id={enfermedad_id} value={enfermedad_id}>{nombre}</option>)
              }
            </select>
            Enfermedad del paciente
          </label>
          <p id="newResult" style={{ textAlign: 'center', fontSize: '13px' }} />
          <div className="actions">
            <button type="button" onClick={() => onClose()} className="edit" id="abort">Cancelar</button>
            <button type="submit" id="saveNew">Guardar</button>
          </div>
        </form>
      </div>
      <div className="slideCard" style={{ display: `${slide === 3 ? 'block' : 'none'}` }}>
        <h1 className="titulo">Añadir adicción padecida</h1>
        <form className="info" onSubmit={saveAdiction}>
          <label htmlFor="addiction" style={{ width: '100%' }}>
            <select name="addiction" id="addiction" defaultValue="" title="Selecciona una sustancia" onChange={handleSelect} required>
              <option value="" disabled hidden>Selecciona una adiccion</option>
              {// eslint-disable-next-line camelcase
                adicciones.map(({ adiccion_id, sustancia }) => <option key={adiccion_id} id={adiccion_id} value={adiccion_id}>{sustancia}</option>)
              }
            </select>
            Adicción del paciente
          </label>
          <p id="newResult" style={{ textAlign: 'center', fontSize: '13px' }} />
          <div className="actions">
            <button type="button" onClick={() => onClose()} className="edit" id="abort">Cancelar</button>
            <button type="submit" id="saveNew">Guardar</button>
          </div>
        </form>
      </div>
    </div>

  )
}

NuevoTratamiento.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NuevoTratamiento
