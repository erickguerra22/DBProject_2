import React, { useEffect, useState } from 'react'
import './Report.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Loading from '../../components/Loading/Loading'
import Alert from '../../components/Alert/Alert'
import Profile from '../../components/Profile/Profile'
import Tabla from '../../components/Tabla/Tabla'
import server from '../../services/server'
import CardButton from '../../components/CardButton/CardButton'

const Report = () => {
  const randomColor = localStorage.getItem('random-color')
  const [busqueda, setBusqueda] = useState('')
  const userData = JSON.parse(localStorage.getItem('user-data'))
  // eslint-disable-next-line no-nested-ternary
  document.getElementById('title').innerHTML = 'Reportes'
  const [list, setList] = useState([])

  const fetchAssignment = async () => {
    setList([])
    const response = await fetch(`${server}/assignment/${busqueda}`)
    const json = await response.json()
    setList(json.result)
  }

  const handleSearch = () => {
    setBusqueda(document.getElementById('searchInput').value)
  }

  useEffect(() => {
    fetchAssignment()
  }, [busqueda])

  if (userData.rol_id !== 1) {
    return (
      <div>
        <NavBar />
        <Alert title="Permiso denegado" text="Solo los usuarios adiministradores pueden acceder a esta página." />
      </div>
    )
  }

  if (list.length === 0) return (<Loading />)

  return (
    <div style={{ height: '100%' }}>
      <NavBar />
      <div className="home">
        <div className="topPage">
          <Profile randomColor={randomColor} />
          <div className="searchBar">
            <p className="welcome">{`¡Hola de nuevo! ${userData.nombre}.`}</p>
          </div>
        </div>
        <div className="cardContainer">
          <CardButton reportId={0} text="Enfermedades más mortales" alone={false} color="#64A556" />
          <CardButton reportId={1} text="Médicos que más pacientes han atendido" alone={false} color="#216641" />
          <CardButton reportId={2} text="Pacientes con más asistencias" alone={false} color="#216641" />
          <CardButton reportId={3} text="Suministros a punto de terminar" alone={false} color="#64A556" />
          <CardButton reportId={4} text="Instituciones con mas pacientes" alone={true} color="#69B73D" />
        </div>
      </div>
    </div>
  )
}

export default Report
