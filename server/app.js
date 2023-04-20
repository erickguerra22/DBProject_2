'use strict'

import express, { json, urlencoded } from 'express'
import cors from 'cors'
const PORT = 2800

import db from './services/DBConnection.js'
import UserRoute from './routes/user.route.js'
import InstitutionRoute from './routes/institution.route.js'
import AddictionRoute from './routes/adiccion.route.js'
import RecordRoute from './routes/expediente.route.js'
import BinnacleRoute from './routes/binnacle.route.js'
import HistoryRoute from './routes/historial.route.js'
import CellarRoute from './routes/bodega.route.js'
import RoleRoute from './routes/rol.route.js'
import DepartmentRoute from './routes/departamento.route.js'
import MunicipalityRoute from './routes/municipio.route.js'
import DoctorRoute from './routes/medico.route.js'
import TreatmentRoute from './routes/tratamiento.route.js'
import DiseaseRoute from './routes/enfermedad.route.js'
import MedicineRoute from './routes/medicamento.route.js'
import ProcedureRoute from './routes/procedimiento.route.js'
import EspecialityRoute from './routes/especiality.route.js'
import AssignmentRoute from './routes/assignment.route.js'
import StoreRoute from './routes/bodega.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.connect()
    .then(() => {
        console.log("Conexión exitosa a la base de datos.")
        app.listen(PORT, () => {
            console.log('Servidor corriendo en el puerto ', PORT)
        })
    })
    .catch(err => {
        console.log("Error de conexión a la base de datos.\n", err)
    })

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' })
})

app.use('/user', UserRoute)
app.use('/binnacle', BinnacleRoute)
//app.use('/report', ReportRoute)
app.use('/record', RecordRoute)
app.use('/history', HistoryRoute)
app.use('/cellar', CellarRoute)
app.use('/institution', InstitutionRoute)
app.use('/addiction', AddictionRoute)
app.use('/role', RoleRoute)
app.use('/department', DepartmentRoute)
app.use('/municipality', MunicipalityRoute)
app.use('/doctor', DoctorRoute)
app.use('/treatment', TreatmentRoute)
app.use('/disease', DiseaseRoute)
app.use('/medicine', MedicineRoute)
app.use('/procedure', ProcedureRoute)
app.use('/especiality', EspecialityRoute)
app.use('/assignment', AssignmentRoute)
app.use('/store', StoreRoute)