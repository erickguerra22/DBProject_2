import React from 'react'
import '../HistorialDetalle.css'
// eslint-disable-next-line import/no-cycle


const SustanciaDetalle = () => {
    return (
    <div>
        <div className='Historial'>
        <div className='Titulo'>Detalles de Addiccion</div>
            <div className='Campo'>
            Sustancia utilizada:
            <input></input>
            </div>
        </div>
        <button className='edit'>Editar</button>
    </div>
  )}
export default SustanciaDetalle
