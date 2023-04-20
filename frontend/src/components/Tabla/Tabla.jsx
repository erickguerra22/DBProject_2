import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-cycle
import { navigate } from '../../pages/index'
import './Tabla.css'

const Tabla = ({ arr }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState(arr)
  const keys = Object.keys(state[0])

  const handleClick = (row) => {
    navigate('user-detail')
    localStorage.setItem('selected_item', Object.values(state[row])[0])
  }

  return (
    <table className="list">
      <tbody className="listBody">
        <tr key="header" className="header">
          {keys.map((key) => (<th key={key}>{key}</th>))}
          <th>Detalle</th>
        </tr>
        {
          state.map((item, index) => (
            <tr className={`${(Object.values(item).indexOf('No asignado') > -1 || Object.values(item).indexOf(null) > -1) ? 'noAsignado' : ''}`} key={item.username}>
              {
                Object.values(item).map((value, eIndex) => {
                  // eslint-disable-next-line no-param-reassign
                  if (keys[eIndex] === 'Fecha de entrada' && !value) value = 'N/A'
                  if (keys[eIndex] === 'Fecha de entrada' && value !== 'N/A') {
                    const date = new Date(value)
                    // eslint-disable-next-line no-param-reassign
                    value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                  }
                  return (
                    <td key={keys[index]}>
                      {value || 'No asignado'}
                    </td>
                  )
                })
              }
              <td>
                <button onClick={() => handleClick(index)} className="tableBTN">I</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

Tabla.propTypes = {
  arr: PropTypes.arrayOf(String).isRequired,
}

export default Tabla
