import React from 'react'
import './Home.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {
  document.getElementById('title').innerHTML = 'Página principal'
  return (
    <div>
      <NavBar />
    </div>
  )
}

export default Home
