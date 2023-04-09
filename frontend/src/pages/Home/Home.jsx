import React from 'react'
import './Home.css'
// eslint-disable-next-line import/no-cycle
import { navigate } from '..'
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {
  document.getElementById('title').innerHTML = 'Página principal'
  const logout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('user-data')
  }
  return (
    <div>
      <NavBar />
      <button onClick={() => {
        logout()
        navigate('')
      }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Home
