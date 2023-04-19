import React from 'react'
import PropTypes from 'prop-types'
import './List.css'
import { Link } from 'react-router-dom'
import ListItem from '../ListItem/ListItem'

const List = ({ nombre, link }) => (
  <div className="list">
    <ListItem />
  </div>
)

List.propTypes = {
  nombre: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default List
