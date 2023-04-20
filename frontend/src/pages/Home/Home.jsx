import React, { useState } from 'react'
import './Home.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'

import Profile from '../../components/Profile/Profile'
import Tabla from '../../components/Tabla/Tabla'


const Home = () => {
  const [list, setList] = useState([])
  const randomColor = `rgb(${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))},${(Math.floor(Math.random() * 200))})`
  document.getElementById('title').innerHTML = 'Página principal'
  const initState = [
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard", names: "water", quantitiys: 10, locations: "fridge" },
    { id: 2,name: "milk", quantitiy: 20, location: "" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard", names: "water", quantitiys: 10, locations: "fridge" },
    { id: 2,name: "milk", quantitiy: 20, location: "" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },{ id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard", names: "water", quantitiys: 10, locations: "fridge" },
    { id: 2,name: "milk", quantitiy: 20, location: "" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },{ id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard", names: "water", quantitiys: 10, locations: "fridge" },
    { id: 2,name: "milk", quantitiy: 20, location: "" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },{ id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard", names: "water", quantitiys: 10, locations: "fridge" },
    { id: 2,name: "milk", quantitiy: 20, location: "" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
  ];
  return (
    <div style={{ height: '100%' }}>
      <NavBar />
      <div className="home">
        <Profile randomColor={randomColor} />
        <Tabla arr={initState} />
      </div>
    </div>
  )
}

export default Home
