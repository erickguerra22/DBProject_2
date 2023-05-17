import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './PacienteDetalle.css'
import server from '../../../services/server'
import Tabla from '../../Tabla/Tabla'
// eslint-disable-next-line import/no-cycle
import { navigate } from '../../../pages'
import NuevoHistorial from '../../Nuevos/NuevoHistorial/NuevoHistorial'

const PacienteDetalle = ({ patient, onClose }) => {
  const [newItem, setNewItem] = useState(false)
  const [paciente, setPaciente] = useState([])
  const [historiales, setHistoriales] = useState([])

  const createNewItem = () => {
    setNewItem((old) => !old)
  }

  const fetchPatient = async () => {
    const response = await fetch(`${server}/record/dpi/${patient}`)
    const json = await response.json()
    setPaciente(json.result[0])
  }

  const fetchHistories = async () => {
    const response = await fetch(`${server}/history/dpi/${patient}`)
    const json = await response.json()
    setHistoriales(json.historiales)
  }

  const deleteRecord = async () => {
    const response = await fetch(`${server}/record/delete/${patient}`, {
      method: 'DELETE',
    })
    const responseJSON = await response.json()

    if (responseJSON.ok === false) {
      document.getElementById('newResult').style.color = 'red'
      document.getElementById('result').innerHTML = responseJSON.error
      return
    }
    window.location.reload()
  }

  const cancel = () => {
    document.getElementById('pNombre').disabled = true
    document.getElementById('pPhone').disabled = true
    document.getElementById('pAddress').disabled = true
    document.getElementById('status').disabled = true
    document.getElementById('delete').style.display = 'inline'
    document.getElementById('edit').style.display = 'inline'
    document.getElementById('accept').style.display = 'inline'
    document.getElementById('cancel').style.display = 'none'
    document.getElementById('save').style.display = 'none'
  }

  const update = async (event) => {
    event.preventDefault()
    const { pNombre, pPhone, pAddress } = event.target

    const body = {
      nombre: pNombre.value,
      telefono: pPhone.value,
      direccion: pAddress.value,
    }

    const response = await fetch(`${server}/record/update/${patient}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJSON = await response.json()

    if (responseJSON.ok === false) {
      document.getElementById('newResult').style.color = 'red'
      document.getElementById('result').innerHTML = responseJSON.error
      return
    }
    window.location.reload()
  }

  const edit = () => {
    document.getElementById('pNombre').disabled = false
    document.getElementById('pPhone').disabled = false
    document.getElementById('pAddress').disabled = false
    document.getElementById('status').disabled = false
    document.getElementById('edit').style.display = 'none'
    document.getElementById('delete').style.display = 'none'
    document.getElementById('accept').style.display = 'none'
    document.getElementById('cancel').style.display = 'inline'
    document.getElementById('save').style.display = 'inline'
  }

  const goToHistory = () => {
    localStorage.setItem('history-id', localStorage.getItem('selected_item'))
    navigate(`history/${patient}`)
  }

  useEffect(() => {
    fetchHistories()
    fetchPatient()
  }, [patient])

  if (paciente === undefined || paciente.length === 0) return (<div />)

  return (
    <div className="paciente">
      <h1 className="titulo">Expediente e historiales registrados</h1>
      <form className="info" onSubmit={update}>
        <label htmlFor="dpi">
          <input name="dpi" id="dpi" required disabled defaultValue={`${patient}`} />
          DPI
        </label>
        <label htmlFor="pNombre">
          <input name="pNombre" id="pNombre" required disabled defaultValue={`${paciente.nombre}`} />
          Nombre
        </label>
        <label htmlFor="pPhone">
          <input name="pPhone" minLength="8" id="pPhone" required disabled defaultValue={`${paciente.telefono}`} type="number" />
          Número de teléfono
        </label>
        <label htmlFor="pAddress">
          <input name="pAddress" id="pAddress" required disabled defaultValue={`${paciente.direccion}`} />
          Dirección
        </label>
        <label htmlFor="status">
          <input name="status" id="status" required disabled defaultValue={`${paciente.estado}`} />
          Estado
        </label>
        <p id="result" />
        <div className="actions">
          <button type="button" onClick={edit} id="edit">Editar</button>
          <button type="button" onClick={() => onClose()} className="edit" id="accept">Aceptar</button>
          <button type="button" onClick={deleteRecord} className="delete" id="delete">Eliminar</button>
          <button type="button" onClick={cancel} id="cancel" style={{ display: 'none' }}>Cancelar</button>
          <button type="submit" style={{ display: 'none' }} id="save">Guardar</button>
        </div>
      </form>
      {
        historiales.length !== 0
        && <Tabla arr={historiales} action={goToHistory} />
      }
      <div className="detailContainer" style={{ display: `${newItem ? 'flex' : 'none'}` }}>
        <NuevoHistorial onClose={createNewItem} />
      </div>
      <button onClick={createNewItem} className="floatButton">+</button>
    </div>
  )
}

PacienteDetalle.propTypes = {
  patient: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default PacienteDetalle
