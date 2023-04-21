import express from 'express'
import { getEnfermedadesMortales, getMedicosMasPacientes, getPacientesMayorAsistencia, getReporteSuministros, getInstitucionesMayorAsistencia } from '../controllers/Reportes.js'

const router = express.Router();

router.get("/rep1", getEnfermedadesMortales)
router.get("/rep2", getMedicosMasPacientes)
router.get("/rep3", getPacientesMayorAsistencia)
router.get("/rep4/:idinsti/:min_medicamentos/:min_materiales", getReporteSuministros)
router.get("/rep5", getInstitucionesMayorAsistencia)

export default router