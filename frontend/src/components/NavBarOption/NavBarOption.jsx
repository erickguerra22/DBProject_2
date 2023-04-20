import React from 'react'
import PropTypes from 'prop-types'
import './NavBarOption.css'
import { Link } from 'react-router-dom'

const NavBarOption = ({ nombre, link }) => (
  <Link to={link} className="option">{(nombre.charAt(0).toUpperCase() + nombre.slice(1))}</Link>
)

NavBarOption.propTypes = {
  nombre: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default NavBarOption
