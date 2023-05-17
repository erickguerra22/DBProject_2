import React from 'react'
import './ReportDetail.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Alert from '../../components/Alert/Alert'
import Profile from '../../components/Profile/Profile'
import ReportContent from '../../components/ReportContent/ReportContent'

const ReportDetail = () => {
  const randomColor = localStorage.getItem('random-color')
  const userData = JSON.parse(localStorage.getItem('user-data'))
  // eslint-disable-next-line no-nested-ternary
  document.getElementById('title').innerHTML = 'Detalle de reporte'

  if (userData.rol_id !== 1) {
    return (
      <div>
        <NavBar id="navBar" />
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
        </div>
        <ReportContent />
      </div>
    </div>
  )
}

export default ReportDetail
