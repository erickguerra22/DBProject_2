import React, { useEffect, useState } from 'react'
import './NavBar.css'
// eslint-disable-next-line import/no-cycle
import { navigate } from '../../pages/index'
import NavBarOption from '../NavBarOption/NavBarOption'
import DropdownMenu from '../DropdownMenu/DropdonMenu'

const NavBar = () => {
  const [dropDownHidden, setDDHidden] = useState(false)
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const [visibleOptions, setVisibleOptions] = useState(true)
  const options = []
  const [moreActive, setMoreActive] = useState(false)

  switch (userData.rol_id) {
    case 1:
      options.push({ nombre: 'Usuarios', link: '/' })
      options.push({ nombre: 'Bitácora', link: '/binnacle' })
      options.push({ nombre: 'Asignaciones', link: '/assignments' })
      options.push({ nombre: 'Reportes', link: '/report' })
      break
    case 2:
      options.push({ nombre: 'Expedientes', link: '/' })
      break
    case 3:
      options.push({ nombre: 'Bodega', link: '/' })
      break
    default:
      useEffect(() => {
        setVisibleOptions(false)
      }, [])
      break
  }

  const logout = () => {
    localStorage.clear()
  }
  return (
    <header className="navBar">
      <div className="logo">
        <img src="/favicon.svg" alt="logo" />
        <h1>MediGate</h1>
      </div>
      <div className="navBarContent">
        <nav>
          {
            userData.rol_id === 3
            && (<button id="notification" onClick={() => setDDHidden((old) => !old)}>H</button>)
          }
          {
            userData.rol_id === 3
            && (<DropdownMenu hidden={dropDownHidden} />)
          }
          <button onClick={() => {
            logout()
            navigate('')
          }}
          >
            d
          </button>
        </nav>
        <nav className={`options${moreActive ? ' active' : ''}`} style={{ contentVisibility: `${visibleOptions ? 'visible' : 'hidden'}` }}>
          {options.map(({ nombre, link }) => <NavBarOption key={nombre} nombre={nombre} link={link} />)}
        </nav>
        <button onClick={(() => setMoreActive((old) => !old))} className="more" style={{ zIndex: '1000' }}>⇶</button>
      </div>
      <div className={`menuBackground${moreActive ? ' active' : ''}`} />
    </header>
  )
}

export default NavBar
