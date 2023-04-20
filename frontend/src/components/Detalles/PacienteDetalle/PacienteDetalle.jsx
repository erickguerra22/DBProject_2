import React from 'react'
import Tabla from '../../Tabla/Tabla';
import './PacienteDetalle.css'
// eslint-disable-next-line import/no-cycle


const PacienteDetalle = () => {
    const initState = [
        { id: 1, name: "bread", quantitiy: 50 },
        { id: 2, name: "milk", quantitiy: 20 },
        { id: 3, name: "water", quantitiy: 10 }
      ];
    return (
    <div>
        <div className='Paciente'>
            <div className='Titulo'>Detalles de Paciente</div>
            <div className='Campo'>
            DPI:
            <input></input>
            </div>
            <div className='Campo'>
            Nombre:
            <input></input>
            </div>
            <div className='Campo'>
            Institucion:
            <input></input>
            </div>
            <div className='Campo'>
                <div className='Mediciones'>
                    Mediciones:
                    <div className='Campo'>
                    Altura:
                    <input className='med'></input>
                    </div>
                    <div className='Campo'>
                    Peso:
                    <input className='med'></input>
                    </div>
                    <div className='Campo'>
                    IMC:
                    <input className='med'></input>
                    </div>
                </div>
                <div className='Campo'>
                    Historial:
                    <Tabla arr={initState}/>
                    </div>
            </div>
            <button className='edit'>Editar</button>
        </div>
    </div>
  )}
export default PacienteDetalle
