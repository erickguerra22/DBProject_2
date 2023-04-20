import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Alert.css'

const Alert = ({ title, text }) => {
  const [visible, setVisible] = useState(true)
  return (
    <div className="alertaBackground" style={{ display: `${visible ? 'flex' : 'none'}` }}>
      <div className="alerta">
        <h1>{title}</h1>
        <p>{text}</p>
        <button onClick={() => setVisible((old) => !old)}>Aceptar</button>
      </div>
    </div>
  )
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Alert
