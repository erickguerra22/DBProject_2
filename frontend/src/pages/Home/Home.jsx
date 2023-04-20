import React from 'react'
import './Home.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Profile from '../../components/Profile/Profile'

const Home = () => {
  const randomColor = `rgb(${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))})`
  document.getElementById('title').innerHTML = 'Página principal'
  return (
    <div style={{ height: '100%' }}>
      <NavBar />
      <div className="home">
        <Profile randomColor={randomColor} />
        {
        }
      </div>
    </div>
  )
}

export default Home
