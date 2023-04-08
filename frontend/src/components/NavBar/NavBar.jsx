import React from 'react'
import { navigate } from '../../pages'
import './NavBar.css'

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('user-data')
  }
  return (
    <button onClick={() => {
      logout()
      navigate('')
    }}
    >
      Cerrar sesión
    </button>
  )
}

export default NavBar
