import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './CardButton.css'

const CardButton = ({ reportId, text, alone, color }) => {
  const [visible, setVisible] = useState(true)
  return (
    <div className="card" style={{ backgroundColor: `${color}`, gridColumn: `${alone ? 'span 2' : 'span 1'}` }}>
      {
        reportId === 0
        && <img src="/public/death.svg" />
      }
      {
        reportId === 1
        && <img src="/public/doctor.svg" />
      }
      {
        reportId === 2
        && <img src="/public/patient.svg" />
      }
      {
        reportId === 3
        && <img src="/public/medicine.svg" />
      }
      {
        reportId === 4
        && <img src="/public/institution.svg" />
      }
      <p>{text}</p>
    </div>
  )
}

CardButton.propTypes = {
  text: PropTypes.string.isRequired,
  reportId: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  alone: PropTypes.bool.isRequired,
}

export default CardButton
