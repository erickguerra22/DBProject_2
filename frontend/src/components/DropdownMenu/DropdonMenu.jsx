import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './DropdownMenu.css'
import ListElement from '../ListElement/ListElement'
import server from '../../services/server'

const DropdownMenu = ({ hidden }) => {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const [avisos, setAvisos] = useState([])
  const fetchavisos = async () => {
    const response = await fetch(`${server}/medicine/alertas/${userData.institucion_id}`)
    const json = await response.json()
    setAvisos(json.result)
  }

  useEffect(() => {
    fetchavisos()
  }, [])
  return (
    <ul
      className="menu"
      style={{
        contentVisibility: `${hidden ? 'hidden' : 'visible'}`,
        opacity: `${hidden ? 0 : 1}`,
      }}
    >
      {// eslint-disable-next-line camelcase
        avisos.map(({ nombre, cantidad, fecha_vencimiento }) => {
          const date = new Date(fecha_vencimiento)
          return <ListElement text={`¡Aviso! Revisar el suministro de ${nombre}. Quedan ${cantidad} disponibles y vence el ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} />
        })
      }
    </ul>
  )
}

DropdownMenu.propTypes = { hidden: PropTypes.bool.isRequired }

export default DropdownMenu
