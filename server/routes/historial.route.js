import express from 'express'
import { getHistorial, searchHistorialByDate, searchHistorialByInstitution, searchHistorialByMunicipio, searchHistorialByDepartamento, searchHistorialByMedico, searchHistorialByEspMedico } from '../controllers/Historial.js'

const router = express.Router();

router.get("/dpi/:dpi", getHistorial)
router.get("/dates/:dpi", searchHistorialByDate)
router.get("/institution/:dpi/:institution", searchHistorialByInstitution)
router.get("/municipio/:dpi/:municipio", searchHistorialByMunicipio)
router.get("/departamento/:dpi/:departamento", searchHistorialByDepartamento)
router.get("/medico/:dpi/:medico", searchHistorialByMedico)
router.get("/espmedico/:dpi/:espmedico", searchHistorialByEspMedico)


export default router