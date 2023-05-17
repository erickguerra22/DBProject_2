import React from 'react'
import PropTypes from 'prop-types'
import './CardButton.css'
import { Link } from 'react-router-dom'

const CardButton = ({
  icon, text, alone, color, reportId,
}) => {
  const handleClick = () => {
    localStorage.setItem('report', reportId)
    localStorage.setItem('reportTitle', text)
  }
  return (
    <Link to={`report/${reportId}`} onClick={handleClick} className="card" style={{ backgroundColor: `${color}`, gridColumn: `${alone ? 'span 2' : 'span 1'}` }}>
      <img alt={icon} src={`/${icon}.svg`} />
      <p>{text}</p>
    </Link>
  )
}

CardButton.defaultProps = {
  alone: true,
}

CardButton.propTypes = {
  icon: PropTypes.string.isRequired,
  reportId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  alone: PropTypes.bool,
}

export default CardButton
