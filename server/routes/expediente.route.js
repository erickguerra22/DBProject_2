import express from 'express'
import { getExpedientes, newExpediente, removeExpediente, searchExpedienteByDPI, searchExpedienteByName, searchExpedienteByState, updateExpediente } from '../controllers/Expediente.js';

const router = express.Router();

router.post("/new", newExpediente)
router.put("/update/:dpi", updateExpediente)
router.delete("/delete/:dpi", removeExpediente)
router.get("/dpi/:dpi", searchExpedienteByDPI)
router.get("/name/:text", searchExpedienteByName)
router.get("/state/:text", searchExpedienteByState)
router.get("/", getExpedientes)

export default router