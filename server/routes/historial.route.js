import express from 'express'
import { getHistorial, searchHistorialByDate, searchHistorialByInstitution, searchHistorialByMunicipio, searchHistorialByDepartamento, searchHistorialByMedico, searchHistorialByEspMedico, newHistorial, getDiseases, getAdictions, newAddiction, newDisease } from '../controllers/Historial.js'

const router = express.Router();

router.get("/dpi/:dpi", getHistorial)
router.get("/dates/:dpi", searchHistorialByDate)
router.get("/institution/:dpi/:institution", searchHistorialByInstitution)
router.get("/municipio/:dpi/:municipio", searchHistorialByMunicipio)
router.get("/departamento/:dpi/:departamento", searchHistorialByDepartamento)
router.get("/medico/:dpi/:medico", searchHistorialByMedico)
router.get("/espmedico/:dpi/:espmedico", searchHistorialByEspMedico)
router.post("/new/:dpi", newHistorial)
router.get("/diseases/:historial/:search", getDiseases)
router.get("/diseases/:historial", getDiseases)
router.get("/adictions/:historial/:search", getAdictions)
router.get("/adictions/:historial", getAdictions)
router.post("/addiction/new/:historial", newAddiction)
router.post("/disease/new/:historial", newDisease)


export default router