import React from 'react'
import PropTypes from 'prop-types'
import './ListElement.css'

const ListElement = ({
  text,
}) => (
  <li className="element">
    {text}
  </li>
)

ListElement.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ListElement
