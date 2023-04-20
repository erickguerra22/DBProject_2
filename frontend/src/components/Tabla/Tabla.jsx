import React from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-cycle
import { navigate } from '../../pages/index'
import './Tabla.css'

const Tabla = ({ arr, detail }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState(arr)
  const keys = Object.keys(state[0])
  const userData = JSON.parse(localStorage.getItem('user-data'))

  const handleClick = (row) => {
    navigate('user-detail')
    localStorage.setItem('selected_item', Object.values(state[row])[0])
  }

  return (
    <table className="list">
      <tbody className="listBody">
        <tr key="header" className="header">
          {keys.map((key) => (<th key={key}>{key}</th>))}
          {
            detail
            && <th>Detalle</th>
          }
        </tr>
        {
          state.map((item, index) => {
            // eslint-disable-next-line react/jsx-no-useless-fragment
            if (Object.values(item)[0] === userData.username) return (<></>)
            return (
              <tr className={`${(Object.values(item).indexOf('No asignado') > -1) ? 'noAsignado' : ''}`} key={item.username}>
                {
                  Object.values(item).map((value, eIndex) => {
                    // eslint-disable-next-line no-param-reassign
                    if (keys[eIndex].toLowerCase().includes('fecha') && value) {
                      const date = new Date(value)
                      // eslint-disable-next-line no-param-reassign
                      value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                      if (keys[eIndex].toLowerCase().includes('hora')) {
                        // eslint-disable-next-line no-param-reassign
                        value += ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                      }
                    }
                    return (
                      <td key={keys[index]}>
                        {(value === null && value !== 0) ? 'N/A' : value}
                      </td>
                    )
                  })
                }
                {
                  detail
                  && (
                    <td>
                      <button onClick={() => handleClick(index)} className="tableBTN">n</button>
                    </td>
                  )
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

Tabla.defaultProps = {
  detail: true,
}

Tabla.propTypes = {
  arr: PropTypes.arrayOf(String).isRequired,
  detail: PropTypes.bool,
}

export default Tabla
