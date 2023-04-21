import express from 'express'
import { getMedicamentosSuministrados, getProcedimientosRealizados, getTratamiento, getTratamientos, newTratamiento, searchTratamiento } from '../controllers/Tratamiento.js'

const router = express.Router();

router.get("/:id", getTratamientos)
router.get("/detail/:tratamiento_id", getTratamiento)
router.get("/procedures/:tratamiento_id", getProcedimientosRealizados)
router.get("/medicines/:tratamiento_id", getMedicamentosSuministrados)
router.get("/:id/:search", searchTratamiento)
router.post("/new/:historial", newTratamiento)

export default router