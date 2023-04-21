import express from 'express'
import { getExpedientes, newExpediente, removeExpediente, searchExpediente, searchExpedienteByDPI, searchExpedienteByName, updateExpediente } from '../controllers/Expediente.js';

const router = express.Router();

router.post("/new", newExpediente)
router.get("/:search", searchExpediente)
router.put("/update/:dpi", updateExpediente)
router.delete("/delete/:dpi", removeExpediente)
router.get("/dpi/:dpi", searchExpedienteByDPI)
router.get("/name/:text", searchExpedienteByName)
router.get("/", getExpedientes)

export default router