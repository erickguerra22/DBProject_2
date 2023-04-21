import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './TratamientoDetalle.css'
import server from '../../../services/server'
import Tabla from '../../Tabla/Tabla'

const TratamientoDetalle = ({ treatment, onClose }) => {
  const [tratamiento, setTratamiento] = useState([])
  const [procedimientos, setProcedimientos] = useState([])
  const [medicamentos, setMedicamentos] = useState([])

  const fetchTreatment = async () => {
    if (treatment.trim() === '') return
    const response = await fetch(`${server}/treatment/detail/${treatment}`)
    const json = await response.json()
    setTratamiento(json.result[0])
  }

  const fetchProcedures = async () => {
    if (treatment.trim() === '') return
    const response = await fetch(`${server}/treatment/procedures/${treatment}`)
    const json = await response.json()
    setProcedimientos(json.result)
  }

  const fetchMedicines = async () => {
    if (treatment.trim() === '') return
    if (treatment === undefined) return
    const response = await fetch(`${server}/treatment/medicines/${treatment}`)
    const json = await response.json()
    setMedicamentos(json.result)
  }

  useEffect(() => {
    fetchMedicines()
    fetchProcedures()
    fetchTreatment()
  }, [treatment])

  if (tratamiento === undefined || tratamiento.length === 0) return (<div />)

  return (
    <div className="tratamiento">
      <h1 className="titulo">Detalles de Tratamiento realizado</h1>
      <form className="info">
        <label htmlFor="descripcion">
          <textarea name="descripcion" id="descripcion" required disabled defaultValue={`${tratamiento.descripcion}`} />
          Descripcion
        </label>
        <label htmlFor="enfermedad">
          <input name="enfermedad" id="enfermedad" required disabled defaultValue={`${tratamiento.enfermedad}`} />
          Enfermedad Tratada
        </label>
      </form>
      {
        medicamentos.length !== 0
        && <Tabla arr={medicamentos} detail={false} />
      }
      {
        procedimientos.length !== 0
        && <Tabla arr={procedimientos} detail={false} />
      }
      <div className="actions">
        <button type="button" onClick={() => onClose()} className="edit" id="accept">Aceptar</button>
      </div>
    </div>
  )
}

TratamientoDetalle.propTypes = {
  treatment: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default TratamientoDetalle
