import React, { useEffect, useState } from 'react'
import './Home.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Loading from '../../components/Loading/Loading'

import Profile from '../../components/Profile/Profile'
import Tabla from '../../components/Tabla/Tabla'
import server from '../../services/server'

const Home = () => {
  const [busqueda, setBusqueda] = useState('')
  const userData = JSON.parse(localStorage.getItem('user-data'))
  // eslint-disable-next-line no-nested-ternary
  const param = userData.rol_id === 1 ? 'user' : userData.rol_id === 2 ? 'record' : 'store'
  const randomColor = `rgb(${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))})`
  document.getElementById('title').innerHTML = 'Página principal'
  const [list, setList] = useState([])

  const fetchUser = async () => {
    setList([])
    const response = await fetch(`${server}/${param}/${busqueda}`)
    const json = await response.json()
    setList(json.result)
  }

  const handleSearch = () => {
    setBusqueda(document.getElementById('searchInput').value)
  }

  useEffect(() => {
    fetchUser()
  }, [busqueda])

  if (list.length === 0) return (<Loading />)

  return (
    <div style={{ height: '100%' }}>
      <NavBar />
      <div className="home">
        <div className="topPage">
          <Profile randomColor={randomColor} />
          <div className="searchBar">
            <p className="welcome">{`¡Hola de nuevo! ${userData.nombre}.`}</p>
            <input placeholder="Buscar" id="searchInput" className="searchInput" defaultValue="" />
            <button className="searchButton" onClick={() => handleSearch()}>S</button>
          </div>
        </div>
        <Tabla arr={list} />
      </div>
    </div>
  )
}

export default Home
