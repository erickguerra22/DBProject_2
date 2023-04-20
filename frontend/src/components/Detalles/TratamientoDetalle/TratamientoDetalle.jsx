import React from 'react'
import '../HistorialDetalle.css'
// eslint-disable-next-line import/no-cycle


const TratamientoDetalle = () => {
    return (
    <div>
        <div className='Historial'>
        <   div className='Titulo'>Detalles de Tratamiento</div>
            <div className='Campo'>
            Tratamiento:
            <input></input>
            <div className='Campo'>
            Enfermedad tratada:
            <input></input>
            </div>
            <div className='Campo'>
            Medico tratante:
            <input></input>
            </div>
            </div>
            <div className='Campo'>
            Descripcion:
            <input></input>
            </div>
            <button className='edit'>Editar</button>
        </div>
    </div>
  )}
export default TratamientoDetalle
