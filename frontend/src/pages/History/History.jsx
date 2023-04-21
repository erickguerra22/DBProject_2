import React, { useEffect, useState } from 'react'
import './History.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Loading from '../../components/Loading/Loading'
import Alert from '../../components/Alert/Alert'
import Profile from '../../components/Profile/Profile'
import Tabla from '../../components/Tabla/Tabla'
import server from '../../services/server'
import TratamientoDetalle from '../../components/Detalles/TratamientoDetalle/TratamientoDetalle'
import NuevoTratamiento from '../../components/Nuevos/NuevoTratamiento/NuevoTratamiento'

const History = () => {
  const randomColor = localStorage.getItem('random-color')
  const [selectedItem, setSelectedItem] = useState('')
  const [newItem, setNewItem] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const userData = JSON.parse(localStorage.getItem('user-data'))
  // eslint-disable-next-line no-nested-ternary
  document.getElementById('title').innerHTML = 'Tratamientos realizados'
  const historyId = localStorage.getItem('history-id')
  const historyDate = new Date(localStorage.getItem('historyDate'))
  const today = new Date()
  const [treatment, setTreatment] = useState([])
  const [diseases, setDiseases] = useState([])
  const [adictions, setAdictions] = useState([])
  const [fetchState, setFetchState] = useState(true)

  const createNewItem = () => {
    setNewItem((old) => !old)
  }

  const fetchTreatment = async () => {
    setTreatment([])
    const response = await fetch(`${server}/treatment/${historyId}/${busqueda}`)
    const json = await response.json()
    setFetchState(json.ok)
    setTreatment(json.result)
  }

  const fetchDiseases = async () => {
    setDiseases([])
    const response = await fetch(`${server}/history/diseases/${historyId}/${busqueda}`)
    const json = await response.json()
    setDiseases(json.result)
  }

  const fetchAdictions = async () => {
    setAdictions([])
    const response = await fetch(`${server}/history/adictions/${historyId}/${busqueda}`)
    const json = await response.json()
    setAdictions(json.result)
  }

  const getSelectedItem = () => {
    setSelectedItem(localStorage.getItem('selected_item'))
  }

  const clearSelectedItem = () => {
    localStorage.removeItem('selected_item')
    setSelectedItem('')
  }

  const handleSearch = () => {
    setBusqueda(document.getElementById('searchInput').value)
  }

  useEffect(() => {
    fetchTreatment()
    fetchDiseases()
    fetchAdictions()
  }, [busqueda])

  if (userData.rol_id !== 2) {
    return (
      <div>
        <NavBar />
        <Alert title="Permiso denegado" text="Solo los usuarios médicos pueden acceder a esta página." />
      </div>
    )
  }

  if ((treatment === undefined || treatment.length === 0) && fetchState === true) return (<Loading />)

  return (
    <div style={{ height: '100%' }}>
      <NavBar />
      <div className="historyDetail">
        <div className="topPage">
          <Profile randomColor={randomColor} />
          <div className="searchBar">
            <p className="welcome">{`¡Hola de nuevo! ${userData.nombre}.`}</p>
            <input placeholder="Buscar" id="searchInput" className="searchInput" defaultValue="" />
            <button className="searchButton" onClick={() => handleSearch()}>S</button>
          </div>
        </div>
        <h2>Tratamientos</h2>
        {
          fetchState === false
          && (
            <div>
              <Alert title="Sin tratamientos" text="No se han encontrado tratamientos realizados en este historial." />
            </div>
          )
        }
        {
          fetchState === true
          && (<Tabla arr={treatment} action={getSelectedItem} />
          )
        }
        <h2>Enfermedades y adicciones padecidas</h2>
        <div style={{ display: 'flex' }}>
          {
            diseases.length > 0
            && (<Tabla arr={diseases} detail={false} action={getSelectedItem} />
            )
          }
          {
            adictions.length > 0
            && (<Tabla arr={adictions} detail={false} action={getSelectedItem} />
            )
          }
        </div>
        {
          fetchState === true
          && (
            <div className="detailContainer" style={{ display: `${selectedItem !== '' ? 'flex' : 'none'}` }}>
              <TratamientoDetalle treatment={selectedItem} onClose={clearSelectedItem} />
            </div>
          )
        }
        <div className="detailContainer" style={{ display: `${newItem ? 'flex' : 'none'}` }}>
          <NuevoTratamiento onClose={createNewItem} />
        </div>
        {
          `${today.getDate()}/${today.getMonth}/${today.getFullYear}` === `${historyDate.getDate()}/${historyDate.getMonth}/${historyDate.getFullYear}`
          && <button onClick={createNewItem} className="floatButton">+</button>
        }
      </div>
    </div>
  )
}

export default History
