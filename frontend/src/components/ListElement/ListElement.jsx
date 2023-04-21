import React from 'react'
import PropTypes from 'prop-types'
import './ListElement.css'

const ListElement = ({
  text, iconName, imgSize, link,
}) => {
  return (
    <li className="element">
      {text}
    </li>
  )
}

ListElement.propTypes = {
  iconName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgSize: PropTypes.string.isRequired,
  link: PropTypes.string,
}

ListElement.defaultProps = { link: undefined }

export default ListElement
