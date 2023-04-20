import React from 'react'
import PropTypes from 'prop-types'
import './Tabla.css'


const Tabla = ({ arr }) => {
    const [state, setState] = React.useState(arr)

    return (
        <table>
      <tr key={"header"}>
        {Object.keys(state[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {state.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td className={`${!val ? 'ifnull' : ''  }`}>{`${!val ? 'no asignado' : val  }`}</td>) )}
        </tr>
      ))}
    </table>
    )
}

Tabla.propTypes = {
  arr: PropTypes.array.isRequired,
}

export default Tabla