import React from 'react'
import './Report.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Alert from '../../components/Alert/Alert'
import CardButton from '../../components/CardButton/CardButton'
import Profile from '../../components/Profile/Profile'

const Report = () => {
  const randomColor = localStorage.getItem('random-color')
  const userData = JSON.parse(localStorage.getItem('user-data'))
  document.getElementById('title').innerHTML = 'Reportes'

  if (userData.rol_id !== 1) {
    return (
      <div>
        <NavBar />
        <Alert title="Permiso denegado" text="Solo los usuarios adiministradores pueden acceder a esta página." />
      </div>
    )
  }

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
          <CardButton reportId={1} icon="death" text="Enfermedades más mortales" alone={false} color="#64A556" />
          <CardButton reportId={2} icon="doctor" text="Médicos que más pacientes han atendido" alone={false} color="#216641" />
          <CardButton reportId={3} icon="patient" text="Pacientes con más asistencias" alone={false} color="#216641" />
          <CardButton reportId={4} icon="medicine" text="Suministros a punto de terminar" alone={false} color="#64A556" />
          <CardButton reportId={5} icon="institution" text="Instituciones con mas pacientes" color="#69B73D" />
        </div>
      </div>
    </div>
  )
}

export default Report
