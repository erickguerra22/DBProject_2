import React from 'react'
import './Home.css'
// eslint-disable-next-line import/no-cycle
import NavBar from '../../components/NavBar/NavBar'
import Tabla from '../../components/Tabla/Tabla'

const Home = () => {
  document.getElementById('title').innerHTML = 'Página principal'
  const initState = [
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard", names: "water", quantitiys: 10, locations: "fridge" },
    { id: 2,name: "milk", quantitiy: 20, location: "" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 1, name: "Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español.Mándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en españolMándame un mensaje en español. Text me in Spanish. I want to learn. Envíame un mensaje en español", quantitiy: 50, location: "cupboard" },
    { id: 2, name: "milk", quantitiy: 20, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
    { id: 3, name: "water", quantitiy: 10, location: "fridge" },
  ];
  return (
    <div>
      <NavBar />
      <Tabla arr={initState} />
    </div>
  )
}

export default Home
