/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './NuevoSuministro.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import server from '../../../services/server'

const NuevoSuministro = ({ onClose }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [suministros, setSuministros] = useState([])
  const userData = JSON.parse(localStorage.getItem('user-data'))

  const save = async (event) => {
    event.preventDefault()
    const {
      suministro, cantidad,
    } = event.target

    const body = {
      suministro: suministro.value,
      cantidad: cantidad.value,
      expiracion: startDate,
    }

    const response = await fetch(`${server}/cellar/new/${userData.institucion_id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJSON = await response.json()

    console.log(responseJSON)

    if (responseJSON.ok === false) {
      document.getElementById('newResult').innerHTML = responseJSON.error
      document.getElementById('newResult').style.color = 'red'
      return
    }
    window.location.reload()
  }

  const fetchSuministros = async () => {
    const response = await fetch(`${server}/supply`)
    const json = await response.json()
    setSuministros(json.result)
  }

  const handleSelect = () => {
    document.getElementById('role').style.color = 'black'
  }

  useEffect(() => {
    fetchSuministros()
  }, [])

  return (
    <div className="suministro">
      <h1 className="titulo">Nuevo Suministro</h1>
      <form className="info" onSubmit={save}>
        <label htmlFor="suministro">
          <select name="suministro" id="suministro" defaultValue="" title="Selecciona un suministro" onChange={handleSelect} required>
            <option value="" disabled hidden>Selecciona un suministro</option>
            {// eslint-disable-next-line camelcase
              suministros.map(({ suministro_id, nombre }) => <option key={suministro_id} id={suministro_id} value={suministro_id}>{nombre}</option>)
            }
          </select>
          Suministro
        </label>
        <label htmlFor="cantidad">
          <input name="cantidad" minLength="8" id="cantidad" required type="number" />
          Cantidad
        </label>
        <label htmlFor="expiracion">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          Fecha de vencimiento
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

NuevoSuministro.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NuevoSuministro
