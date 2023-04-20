import React from 'react'
import './UsuarioDetalle.css'
// eslint-disable-next-line import/no-cycle


const UsuarioDetalle = () => (
    <div>
        
        <div className='Usuario'>
            <div className='Titulo'>Detalles de Usuario</div>
            <div className='Campo'>
            Nombre:
            <input></input>
            </div>
            <div className='Campo'>
            Rol:
            <input></input>
            </div>
            <div className='Campo'>
            Institucion:
            <input></input>
            </div>
            <button className='edit'>Editar</button>
        </div>
    </div>
  )
export default UsuarioDetalle
