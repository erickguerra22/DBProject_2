import React from 'react'
import PropTypes from 'prop-types'
import './ListItem.css'
import { Link } from 'react-router-dom'

const ListItem = ({ nombre, link }) => (
  <div>Hola</div>
)

ListItem.propTypes = {
  nombre: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default ListItem
